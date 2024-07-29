import express from 'express';
import NotificationData from '../models/NotificationData.js';

const router = express.Router();

// Add a new notification
router.post('/add', async (req, res) => {
  try {
    const { subject,message, deadlineDate, forWhom } = req.body;
    const newNotification = new NotificationData({ subject ,message, deadlineDate, forWhom });
    await newNotification.save();
    res.status(201).json({ message: 'Notification added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await NotificationData.find();
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
