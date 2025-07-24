// シンプルな画像ローダー
function loadSagaImage(elementId, imageNumber) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`要素が見つかりません: ${elementId}`);
        return;
    }
    
    const img = new Image();
    
    // まずPNGを試す
    img.src = `SAGA/saga${imageNumber}.png`;
    
    img.onload = () => {
        console.log(`✅ 画像読み込み成功: saga${imageNumber}.png -> ${elementId}`);
        element.innerHTML = '';
        element.appendChild(img);
    };
    
    img.onerror = () => {
        // PNGが失敗したらJPGを試す
        console.log(`PNGが見つからないのでJPGを試します: saga${imageNumber}.jpg`);
        const img2 = new Image();
        img2.src = `SAGA/saga${imageNumber}.jpg`;
        
        img2.onload = () => {
            console.log(`✅ 画像読み込み成功: saga${imageNumber}.jpg -> ${elementId}`);
            element.innerHTML = '';
            element.appendChild(img2);
        };
        
        img2.onerror = () => {
            console.error(`❌ 画像が見つかりません: saga${imageNumber} (.png/.jpg両方試しました)`);
        };
    };
}

// バトル画面用の画像読み込み関数
function loadBattleImagesSimple() {
    console.log('===== シンプルローダーで画像読み込み開始 =====');
    
    // ランダムな番号を生成（2〜10）
    const randomNumber = Math.floor(Math.random() * 9) + 2;
    console.log(`Player1用のランダム番号: ${randomNumber}`);
    
    // Player1の画像を読み込み
    loadSagaImage('player1', randomNumber);
    loadSagaImage('round-player1', randomNumber);
    
    // Player2（SAGA）の画像を読み込み
    loadSagaImage('player2', 1);
    loadSagaImage('round-player2', 1);
}