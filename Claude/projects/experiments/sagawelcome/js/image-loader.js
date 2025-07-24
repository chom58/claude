// 画像読み込みヘルパー
const ImageLoader = {
    // 利用可能な拡張子
    extensions: ['.png', '.jpg', '.jpeg', '.gif'],
    
    // 現在のPlayer1画像番号を保存
    currentPlayer1Number: null,
    
    // 画像を読み込む（複数の拡張子を試す）
    loadImageWithFallback(basePath, extensions, callback) {
        let currentIndex = 0;
        const img = new Image();
        
        console.log(`=== 画像読み込み開始: ${basePath} ===`);
        
        const tryNextExtension = () => {
            if (currentIndex >= extensions.length) {
                console.error(`❌ 画像が見つかりません: ${basePath} (全ての拡張子を確認済み)`);
                if (callback) callback(null);
                return;
            }
            
            const currentPath = basePath + extensions[currentIndex];
            console.log(`🔍 画像読み込み試行 [${currentIndex + 1}/${extensions.length}]: ${currentPath}`);
            
            img.onerror = (e) => {
                console.warn(`❌ 読み込み失敗: ${currentPath}`, e);
                currentIndex++;
                tryNextExtension();
            };
            
            img.onload = () => {
                console.log(`✅ 画像読み込み成功: ${currentPath}`);
                console.log(`   サイズ: ${img.width}x${img.height}`);
                if (callback) callback(img);
            };
            
            img.src = currentPath;
        };
        
        tryNextExtension();
    },
    
    // Player1用のランダム画像を読み込む
    loadRandomPlayer1Image(elementId, useCurrentNumber = false) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`要素が見つかりません: ${elementId}`);
            return;
        }
        
        console.log(`\n🎮 Player1画像読み込み: ${elementId}`);
        
        // 既存の番号を使うか、新しくランダムに選択
        let randomNumber;
        if (useCurrentNumber && this.currentPlayer1Number) {
            randomNumber = this.currentPlayer1Number;
            console.log(`既存の番号を使用: saga${randomNumber}`);
        } else {
            // saga2〜saga10からランダムに選択
            randomNumber = Math.floor(Math.random() * 9) + 2;
            this.currentPlayer1Number = randomNumber;
            console.log(`新しい番号を生成: saga${randomNumber}`);
        }
        
        const basePath = `SAGA/saga${randomNumber}`;
        
        this.loadImageWithFallback(basePath, this.extensions, (img) => {
            if (img) {
                element.innerHTML = '';
                element.appendChild(img);
                console.log(`✅ Player1画像を設定完了: ${elementId}`);
            } else {
                console.warn(`⚠️ Player1の画像が見つかりません。絵文字のままにします: ${elementId}`);
            }
        });
    },
    
    // Player2(SAGA)用の固定画像を読み込む
    loadSagaImage(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`要素が見つかりません: ${elementId}`);
            return;
        }
        
        console.log(`\n🎮 SAGA画像読み込み: ${elementId}`);
        
        const basePath = 'SAGA/saga1';
        
        this.loadImageWithFallback(basePath, this.extensions, (img) => {
            if (img) {
                element.innerHTML = '';
                element.appendChild(img);
                console.log(`✅ SAGA画像を設定完了: ${elementId}`);
            } else {
                console.warn(`⚠️ saga1の画像が見つかりません。絵文字のままにします: ${elementId}`);
            }
        });
    }
};