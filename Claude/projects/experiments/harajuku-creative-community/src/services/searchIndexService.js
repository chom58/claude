class SearchIndexService {
  constructor() {
    this.searchIndex = new Map();
    this.initialized = false;
  }

  async initialize() {
    try {
      // 検索インデックスの初期化
      this.searchIndex.clear();
      this.initialized = true;
      console.log('検索インデックスサービスの初期化が完了しました');
    } catch (error) {
      console.error('検索インデックスサービスの初期化エラー:', error);
      throw error;
    }
  }

  async indexItem(type, id, data) {
    try {
      const key = `${type}:${id}`;
      const indexData = {
        type,
        id,
        data,
        indexedAt: new Date()
      };
      this.searchIndex.set(key, indexData);
      return true;
    } catch (error) {
      console.error('インデックス追加エラー:', error);
      throw error;
    }
  }

  async removeFromIndex(type, id) {
    try {
      const key = `${type}:${id}`;
      return this.searchIndex.delete(key);
    } catch (error) {
      console.error('インデックス削除エラー:', error);
      throw error;
    }
  }

  async search(query, options = {}) {
    try {
      const results = [];
      const lowerQuery = query.toLowerCase();
      
      // 簡易的な検索実装
      for (const [key, value] of this.searchIndex) {
        const searchableText = JSON.stringify(value.data).toLowerCase();
        if (searchableText.includes(lowerQuery)) {
          results.push(value);
        }
      }

      // タイプによるフィルタリング
      if (options.type) {
        return results.filter(item => item.type === options.type);
      }

      return results;
    } catch (error) {
      console.error('検索エラー:', error);
      throw error;
    }
  }

  async rebuildIndex() {
    try {
      console.log('検索インデックスの再構築を開始します');
      this.searchIndex.clear();
      // TODO: データベースから全データを取得して再インデックス
      console.log('検索インデックスの再構築が完了しました');
    } catch (error) {
      console.error('インデックス再構築エラー:', error);
      throw error;
    }
  }
}

module.exports = new SearchIndexService();