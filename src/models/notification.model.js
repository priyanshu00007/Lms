const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Notification must belong to a user'],
    },
    type: {
      type: String,
      required: true,
      enum: [
        'order_status',
        'payment',
        'promotion',
        'system',
        'message',
        'review',
        'reminder',
        'alert',
        'newsletter',
      ],
    },
    title: {
      type: String,
      required: [true, 'Notification title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Notification message is required'],
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
    link: String,
    icon: String,
    image: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    isActioned: {
      type: Boolean,
      default: false,
    },
    actionedAt: Date,
    expiresAt: {
      type: Date,
      default: () => Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
    },
    channels: [
      {
        type: String,
        enum: ['in_app', 'email', 'push', 'sms'],
      },
    ],
    sentVia: [
      {
        channel: String,
        sentAt: Date,
        status: {
          type: String,
          enum: ['pending', 'sent', 'failed', 'delivered'],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ user: 1, type: 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Instance methods
notificationSchema.methods.markAsRead = function () {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

notificationSchema.methods.markAsActioned = function () {
  this.isActioned = true;
  this.actionedAt = new Date();
  return this.save();
};

notificationSchema.methods.addDeliveryStatus = function (channel, status) {
  this.sentVia.push({
    channel,
    sentAt: new Date(),
    status,
  });
  return this.save();
};

// Static methods
notificationSchema.statics.getUnreadCount = function (userId) {
  return this.countDocuments({ user: userId, isRead: false });
};

notificationSchema.statics.markAllAsRead = function (userId) {
  return this.updateMany(
    { user: userId, isRead: false },
    { 
      $set: { 
        isRead: true, 
        readAt: new Date() 
      } 
    }
  );
};

notificationSchema.statics.deleteOldNotifications = function (days = 30) {
  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return this.deleteMany({ createdAt: { $lt: cutoffDate } });
};

notificationSchema.statics.createNotification = async function (notificationData) {
  const notification = await this.create(notificationData);
  
  // Emit socket event if available
  if (global.io) {
    global.io.to(`user_${notification.user}`).emit('notification', notification);
  }
  
  return notification;
};

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;