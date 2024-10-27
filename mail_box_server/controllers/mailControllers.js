import { Mail } from "../models/Mail.js";
import { User } from "../models/User.js";

export const sendMail = async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    // Step 1: Validate input fields
    if (!to || !subject || !body) {
      return res
        .status(400)
        .json({ message: "All fields are required: to, subject, and body." });
    }

    // Step 2: Get the authenticated user (sender) from the token
    const sender = req.user; // Assuming `req.user` is set after token verification
    
    // Step 3: Find the recipient(s) in the database
    const recipients = await User.find({ email: { $in: to } });
    if (recipients.length === 0) {
        return res.status(404).json({ message: "Recipient(s) not found." });
    }
    
    // Step 4: Create and save the mail entry in the database
    const mail = new Mail({
      sender: sender._id,
      recipients: recipients.map((recipient) => recipient._id),
      subject,
      body,
      isRead: false,
      sentAt: new Date(),
    });

    await mail.save();

    // Step 5: Return a success response
    res.status(201).json({
      message: "Mail sent successfully!",
      mail: {
        id: mail._id,
        sender: sender.email,
        recipients: recipients.map((recipient) => recipient.email),
        subject,
        body,
        sentAt: mail.sentAt,
      },
    });
  } catch (error) {
    console.error("Error sending mail:", error);
    res
      .status(500)
      .json({ message: "An error occurred while sending the email.", error });
  }
};

export const getSentMails = async (req, res) => {
  try {
    console.log("object sent");
    //   const sentMails = await Mail.find({ sender: req.user._id }).populate('recipients', 'email');
    const sentMails = await Mail.find({ sender: req.user._id })
      .select("sentAt body.blocks isRead subject _id")
      .populate("recipients", "email");

    res.status(200).json(sentMails);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sent mails.", error });
  }
};

export const getSentMailById = async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.id)
      .populate("sender", "email")
      .populate("recipients", "email");

    if (!mail) {
      return res.status(404).json({ message: "Mail not found." });
    }

    // set isRead to true
    mail.isRead = true;
    await mail.save();

    res.status(200).json(mail);
  } catch (error) {
    console.error("Error retrieving mail:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the email.",
      error,
    });
  }
};

export const getReceivedMails = async (req, res) => {
  try {
    console.log("Getting");
    const receivedMails = await Mail.find({ recipients: req.user._id })
      .select("sentAt body.blocks isRead subject _id")
      .populate("sender", "email");

    res.status(200).json(receivedMails);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error retrieving received mails.", error });
  }
};

export const deleteSentMail = async (req, res) => {
  try {
    const mail = await Mail.findByIdAndDelete(req.params.id);

    if (!mail) {
      return res.status(404).json({ message: "Mail not found." });
    }

    res.status(200).json({ message: "Mail deleted successfully." });
  } catch (error) {
    console.error("Error deleting mail:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the email.", error });
  }
};