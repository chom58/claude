const { broadcast, sendToUser } = require('../server');

let updateInterval;

function startPeriodicUpdates() {
  // 定期的な更新を無効化
  // updateInterval = setInterval(() => {
  //   sendLiveUpdate();
  // }, 30000);
  
  console.log('定期的なライブアップデートは無効化されています');
}

function stopPeriodicUpdates() {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
    console.log('定期的なライブアップデートが停止されました');
  }
}

function sendLiveUpdate() {
  const update = {
    type: 'live_update',
    timestamp: new Date(),
    data: {
      activeUsers: Math.floor(Math.random() * 100),
      newPosts: Math.floor(Math.random() * 10),
      newEvents: Math.floor(Math.random() * 5)
    }
  };
  
  broadcast(update);
}

function notifyNewPost(post) {
  const notification = {
    type: 'new_post',
    timestamp: new Date(),
    data: {
      postId: post.id,
      title: post.title,
      author: post.author,
      category: post.category
    }
  };
  
  broadcast(notification);
}

function notifyNewEvent(event) {
  const notification = {
    type: 'new_event',
    timestamp: new Date(),
    data: {
      eventId: event.id,
      name: event.name,
      date: event.date,
      location: event.location
    }
  };
  
  broadcast(notification);
}

function notifyUserAction(userId, action) {
  const notification = {
    type: 'user_action',
    timestamp: new Date(),
    data: {
      userId,
      action,
      message: `ユーザー${userId}が${action}を実行しました`
    }
  };
  
  // 特定のユーザーに通知
  sendToUser(userId, notification);
}

function notifyCollaborationUpdate(collaborationId, update) {
  const notification = {
    type: 'collaboration_update',
    timestamp: new Date(),
    data: {
      collaborationId,
      update,
      message: `コラボレーション${collaborationId}が更新されました`
    }
  };
  
  broadcast(notification);
}

module.exports = {
  startPeriodicUpdates,
  stopPeriodicUpdates,
  notifyNewPost,
  notifyNewEvent,
  notifyUserAction,
  notifyCollaborationUpdate
};