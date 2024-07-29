import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const NotificationDataSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  deadlineDate: {
    type: Date, 
    required: true,
  },
  forWhom: {
    type: String,
    enum: ['faculty', 'student', 'Both'], 
    required: true,
  }
}, { timestamps: true });

const NotificationData = models.NotificationData || model('NotificationData', NotificationDataSchema);

export default NotificationData;
