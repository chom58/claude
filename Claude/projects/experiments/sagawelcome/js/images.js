// 画像管理システム
const ImageManager = {
    // SAGAフォルダ内の画像リスト（実際の画像ファイル名に合わせて更新してください）
    sagaImages: [],
    
    // 画像の初期化
    async init() {
        // SAGAフォルダ内の画像を動的に探す
        for (let i = 1; i <= 20; i++) {
            this.sagaImages.push(`saga${i}.jpg`);
            this.sagaImages.push(`saga${i}.png`);
            this.sagaImages.push(`saga${i}.jpeg`);
        }
    },
    
    // ランダムな佐賀の画像を取得
    getRandomSagaImage() {
        const validImages = [];
        
        // 利用可能な画像を確認
        this.sagaImages.forEach(imageName => {
            const img = new Image();
            img.onload = () => validImages.push(imageName);
            img.src = `SAGA/${imageName}`;
        });
        
        // ランダムに選択
        if (validImages.length > 0) {
            return `SAGA/${validImages[Math.floor(Math.random() * validImages.length)]}`;
        }
        
        // デフォルト画像パス
        return `SAGA/saga${Math.floor(Math.random() * 10) + 1}.jpg`;
    },
    
    // 画像をプリロード
    preloadImage(src, callback) {
        const img = new Image();
        img.onload = () => {
            if (callback) callback(img);
        };
        img.onerror = () => {
            console.log(`画像が見つかりません: ${src}`);
            if (callback) callback(null);
        };
        img.src = src;
    },
    
    // 要素に画像を設定
    setImageToElement(elementId, imageSrc) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        this.preloadImage(imageSrc, (img) => {
            if (img) {
                element.innerHTML = '';
                element.appendChild(img);
            }
        });
    },
    
    // レトロ風フィルター適用
    applyRetroFilter(img) {
        img.style.filter = 'contrast(1.2) saturate(0.8) sepia(0.2)';
        img.style.imageRendering = 'pixelated';
    }
};

// 使用例：
// ImageManager.init();
// const randomImage = ImageManager.getRandomSagaImage();
// ImageManager.setImageToElement('saga-sprite', randomImage);