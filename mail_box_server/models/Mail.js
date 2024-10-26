// models/Mail.js
import mongoose from 'mongoose'
const { Schema } = mongoose;

const mailSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipients: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: Object, // Here store DraftJS content in raw JSON format
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export const Mail = mongoose.model('Mail', mailSchema);