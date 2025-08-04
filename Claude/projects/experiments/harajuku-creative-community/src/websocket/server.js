// WebSocketモジュールの動的インポート
let Server;
try {
  Server = require('ws').Server;
} catch (error) {
  console.warn('wsモジュールが見つかりません。WebSocket機能は無効化されます。');
}

let wss;
const clients = new Map();

async function initializeWebSocketServer(httpServer) {
  try {
    if (!Server) {
      console.log('WebSocketサーバーはスキップされました (wsモジュールなし)');
      return;
    }
    
    wss = new Server({ 
      server: httpServer,
      path: '/ws'
    });

    wss.on('connection', (ws, req) => {
      const clientId = generateClientId();
      clients.set(clientId, { ws, userId: null });

      console.log(`新しいWebSocket接続: ${clientId}`);

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          handleMessage(clientId, data);
        } catch (error) {
          console.error('WebSocketメッセージ処理エラー:', error);
        }
      });

      ws.on('close', () => {
        clients.delete(clientId);
        console.log(`WebSocket接続終了: ${clientId}`);
      });

      ws.on('error', (error) => {
        console.error(`WebSocketエラー (${clientId}):`, error);
      });

      // 接続確認メッセージ送信
      ws.send(JSON.stringify({
        type: 'connected',
        clientId,
        timestamp: new Date()
      }));
    });

    console.log('WebSocketサーバーが初期化されました');
  } catch (error) {
    console.error('WebSocketサーバー初期化エラー:', error);
    throw error;
  }
}

function handleMessage(clientId, data) {
  const client = clients.get(clientId);
  if (!client) return;

  switch (data.type) {
    case 'auth':
      client.userId = data.userId;
      client.ws.send(JSON.stringify({
        type: 'auth_success',
        userId: data.userId
      }));
      break;

    case 'ping':
      client.ws.send(JSON.stringify({
        type: 'pong',
        timestamp: new Date()
      }));
      break;

    default:
      console.log(`未処理のメッセージタイプ: ${data.type}`);
  }
}

function broadcast(message) {
  if (!Server) {
    console.log('WebSocket無効: メッセージをブロードキャストできません');
    return;
  }
  
  const messageStr = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.ws.readyState === 1) { // WebSocket.OPEN
      client.ws.send(messageStr);
    }
  });
}

function sendToUser(userId, message) {
  if (!Server) {
    console.log('WebSocket無効: ユーザーにメッセージを送信できません');
    return;
  }
  
  const messageStr = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.userId === userId && client.ws.readyState === 1) {
      client.ws.send(messageStr);
    }
  });
}

function generateClientId() {
  return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

module.exports = {
  initializeWebSocketServer,
  broadcast,
  sendToUser
};