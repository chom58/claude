const fs = require('fs').promises;
const path = require('path');

class StorageService {
  constructor() {
    this.uploadDir = path.join(process.cwd(), 'public', 'uploads');
    this.thumbnailDir = path.join(this.uploadDir, 'thumbnails');
  }

  async initialize() {
    try {
      // アップロードディレクトリの作成
      await fs.mkdir(this.uploadDir, { recursive: true });
      await fs.mkdir(this.thumbnailDir, { recursive: true });
      console.log('ストレージディレクトリの初期化が完了しました');
    } catch (error) {
      console.error('ストレージサービスの初期化エラー:', error);
      throw error;
    }
  }

  async saveFile(file, filename) {
    try {
      const filePath = path.join(this.uploadDir, filename);
      await fs.writeFile(filePath, file.buffer);
      return filePath;
    } catch (error) {
      console.error('ファイル保存エラー:', error);
      throw error;
    }
  }

  async deleteFile(filename) {
    try {
      const filePath = path.join(this.uploadDir, filename);
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      console.error('ファイル削除エラー:', error);
      throw error;
    }
  }

  async getFileInfo(filename) {
    try {
      const filePath = path.join(this.uploadDir, filename);
      const stats = await fs.stat(filePath);
      return {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      };
    } catch (error) {
      console.error('ファイル情報取得エラー:', error);
      throw error;
    }
  }
}

module.exports = new StorageService();