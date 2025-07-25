// メインスクリプト
document.addEventListener('DOMContentLoaded', () => {
    // 要素の取得
    const titleScreen = document.getElementById('titleScreen');
    const startPrompt = document.querySelector('.start-prompt');
    const touchButton = document.getElementById('touchStart');
    
    // サウンドマネージャーの初期化
    if (typeof SoundManager !== 'undefined') {
        SoundManager.init();
    }
    
    // エンターキーでゲーム開始
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && titleScreen.classList.contains('active')) {
            startGame();
        }
    });
    
    // タッチボタンでゲーム開始
    if (touchButton) {
        touchButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startGame();
        });
        
        // タッチイベントも追加（より確実に動作させるため）
        touchButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startGame();
        });
    }
    
    // ゲーム開始処理
    function startGame() {
        // 効果音再生
        if (typeof SoundManager !== 'undefined') {
            SoundManager.play('start');
        }
        
        // 画面遷移
        createTransition(() => {
            window.location.href = 'stages.html';
        });
    }
    
    // 画面遷移エフェクト
    function createTransition(callback) {
        const transition = document.createElement('div');
        transition.className = 'screen-transition';
        document.querySelector('.screen').appendChild(transition);
        
        setTimeout(() => {
            if (callback) callback();
        }, 250);
        
        setTimeout(() => {
            transition.remove();
        }, 500);
    }
    
    // 波動拳エフェクトのランダム生成
    setInterval(() => {
        createHadoukenEffect();
    }, 5000);
    
    function createHadoukenEffect() {
        const hadouken = document.createElement('div');
        hadouken.className = 'hadouken-effect';
        hadouken.style.left = Math.random() * 50 + '%';
        hadouken.style.top = Math.random() * 50 + 25 + '%';
        document.querySelector('.title-bg').appendChild(hadouken);
        
        setTimeout(() => {
            hadouken.remove();
        }, 3000);
    }
    
    // パフォーマンス最適化
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        // アニメーション更新処理
        ticking = false;
    }
    
    // ローカルストレージでハイスコア管理
    const GameData = {
        getHighScore() {
            return localStorage.getItem('sagaWelcomeHighScore') || 0;
        },
        
        setHighScore(score) {
            localStorage.setItem('sagaWelcomeHighScore', score);
        },
        
        getVisitCount() {
            const count = parseInt(localStorage.getItem('sagaWelcomeVisits') || 0);
            localStorage.setItem('sagaWelcomeVisits', count + 1);
            return count + 1;
        }
    };
    
    // 訪問回数をコンソールに表示
    console.log(`Welcome Back! Visit #${GameData.getVisitCount()}`);
});