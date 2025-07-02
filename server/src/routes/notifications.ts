import express from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Notifications System
 * Author: BillyBobz
 * Real-time notifications for travel updates, weather alerts, and trip reminders
 */

const router = express.Router();

interface Notification {
  id: string;
  userId: string;
  type: 'weather' | 'booking' | 'reminder' | 'social' | 'ai' | 'system';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  expiresAt?: string;
  metadata?: any;
  author: string;
}

// In-memory storage (replace with database in production)
let notifications: Notification[] = [
  {
    id: uuidv4(),
    userId: 'user1',
    type: 'weather',
    title: 'Weather Alert for Paris',
    message: 'Rain expected during your visit. Pack an umbrella!',
    priority: 'medium',
    read: false,
    createdAt: new Date().toISOString(),
    author: 'BillyBobz Weather System'
  },
  {
    id: uuidv4(),
    userId: 'user1',
    type: 'ai',
    title: 'AI Trip Optimization Available',
    message: 'I found ways to save $200 on your Tokyo trip. Want to see?',
    priority: 'high',
    read: false,
    actionUrl: '/ai-assistant',
    createdAt: new Date().toISOString(),
    author: 'BillyBobz AI Assistant'
  }
];

// Get all notifications for a user - by BillyBobz
router.get('/user/:userId', (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;
    const userNotifications = notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      success: true,
      notifications: userNotifications,
      unreadCount: userNotifications.filter(n => !n.read).length,
      createdBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notifications'
    });
  }
});

// Mark notification as read - by BillyBobz
router.patch('/:notificationId/read', (req: express.Request, res: express.Response) => {
  try {
    const { notificationId } = req.params;
    const notification = notifications.find(n => n.id === notificationId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }

    notification.read = true;

    res.json({
      success: true,
      notification,
      updatedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update notification'
    });
  }
});

// Create new notification - by BillyBobz
router.post('/', (req: express.Request, res: express.Response) => {
  try {
    const { userId, type, title, message, priority = 'medium', actionUrl, metadata } = req.body;

    const notification: Notification = {
      id: uuidv4(),
      userId,
      type,
      title,
      message,
      priority,
      read: false,
      actionUrl,
      createdAt: new Date().toISOString(),
      metadata,
      author: 'BillyBobz Notification System'
    };

    notifications.push(notification);

    res.json({
      success: true,
      notification,
      createdBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create notification'
    });
  }
});

// Delete notification - by BillyBobz
router.delete('/:notificationId', (req: express.Request, res: express.Response) => {
  try {
    const { notificationId } = req.params;
    const index = notifications.findIndex(n => n.id === notificationId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }

    notifications.splice(index, 1);

    res.json({
      success: true,
      message: 'Notification deleted successfully',
      deletedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete notification'
    });
  }
});

// Mark all notifications as read - by BillyBobz
router.patch('/user/:userId/read-all', (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;
    
    notifications
      .filter(n => n.userId === userId && !n.read)
      .forEach(n => n.read = true);

    res.json({
      success: true,
      message: 'All notifications marked as read',
      updatedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to mark notifications as read'
    });
  }
});

// Get notification statistics - by BillyBobz
router.get('/user/:userId/stats', (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;
    const userNotifications = notifications.filter(n => n.userId === userId);

    const stats = {
      total: userNotifications.length,
      unread: userNotifications.filter(n => !n.read).length,
      byType: userNotifications.reduce((acc, n) => {
        acc[n.type] = (acc[n.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byPriority: userNotifications.reduce((acc, n) => {
        acc[n.priority] = (acc[n.priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      recentActivity: userNotifications
        .filter(n => new Date(n.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000)
        .length,
      generatedBy: 'BillyBobz Analytics'
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notification statistics'
    });
  }
});

export default router;