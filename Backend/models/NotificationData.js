import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const NotificationDataSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  deadlineDate: {
    type: String,
    required: true,
  },
  forWhom: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const NotificationData = models.NotificationData || model('NotificationData', NotificationDataSchema);

export default NotificationData;
