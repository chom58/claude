// アニメーション管理
const AnimationManager = {
    // アニメーション中のフラグ
    isAnimating: false,
    
    // タイトルアニメーション
    animateTitle() {
        const title = document.querySelector('.main-title');
        if (!title) return;
        
        // 文字を一つずつアニメーション
        const text = title.innerHTML;
        title.innerHTML = '';
        
        const chars = text.split('').map((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `char-appear 0.1s ease-out ${index * 0.05}s forwards`;
            return span;
        });
        
        chars.forEach(char => title.appendChild(char));
    },
    
    // VS画面アニメーション
    createVSAnimation() {
        const vsContainer = document.createElement('div');
        vsContainer.className = 'vs-container';
        vsContainer.innerHTML = `
            <div class="vs-left">YOU</div>
            <div class="vs-center">VS</div>
            <div class="vs-right">SAGA</div>
        `;
        
        document.querySelector('.screen').appendChild(vsContainer);
        
        setTimeout(() => {
            vsContainer.remove();
        }, 2000);
    },
    
    // ダメージアニメーション
    showDamage(element, damage) {
        const damageText = document.createElement('div');
        damageText.className = 'damage-number';
        damageText.textContent = damage;
        damageText.style.position = 'absolute';
        damageText.style.color = '#FFD700';
        damageText.style.fontSize = '24px';
        damageText.style.fontWeight = 'bold';
        
        element.appendChild(damageText);
        
        // アニメーション
        damageText.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-50px)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => damageText.remove();
    },
    
    // コンボカウンター
    showCombo(count) {
        const combo = document.createElement('div');
        combo.className = 'combo-counter';
        combo.innerHTML = `
            <div class="combo-number">${count}</div>
            <div class="combo-text">HIT COMBO!</div>
        `;
        
        document.querySelector('.screen').appendChild(combo);
        
        setTimeout(() => {
            combo.remove();
        }, 1500);
    },
    
    // 勝利演出
    showVictory() {
        const victory = document.createElement('div');
        victory.className = 'victory-screen';
        victory.innerHTML = `
            <div class="win-text">YOU WIN</div>
            <div class="perfect-text">PERFECT!</div>
            <div class="score-display">
                <p>SCORE: 100000</p>
                <p>TIME: 99</p>
            </div>
        `;
        
        document.querySelector('.screen').appendChild(victory);
        
        // 紙吹雪エフェクト
        this.createConfetti();
    },
    
    // 紙吹雪エフェクト
    createConfetti() {
        const colors = ['#FFD700', '#FF4500', '#00FF00', '#00BFFF', '#FF1493'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            document.querySelector('.screen').appendChild(confetti);
            
            // 落下アニメーション
            confetti.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'ease-in',
                delay: Math.random() * 1000
            }).onfinish = () => confetti.remove();
        }
    },
    
    // ローディングバー
    createLoadingBar(duration = 2000) {
        const loading = document.createElement('div');
        loading.className = 'loading-container';
        loading.innerHTML = `
            <div class="loading-text">NOW LOADING...</div>
            <div class="loading-bar">
                <div class="loading-fill"></div>
            </div>
        `;
        
        document.querySelector('.screen').appendChild(loading);
        
        const fill = loading.querySelector('.loading-fill');
        fill.style.animation = `loading-progress ${duration}ms linear forwards`;
        
        return new Promise((resolve) => {
            setTimeout(() => {
                loading.remove();
                resolve();
            }, duration);
        });
    },
    
    // キャラクター選択カーソル
    createSelectCursor(element) {
        const cursor = document.createElement('div');
        cursor.className = 'select-cursor';
        element.appendChild(cursor);
        
        return cursor;
    },
    
    // スクリーンシェイク
    screenShake(duration = 300, intensity = 10) {
        const screen = document.querySelector('.screen');
        const keyframes = [];
        const steps = 10;
        
        for (let i = 0; i < steps; i++) {
            keyframes.push({
                transform: `translate(${(Math.random() - 0.5) * intensity}px, ${(Math.random() - 0.5) * intensity}px)`
            });
        }
        
        keyframes.push({ transform: 'translate(0, 0)' });
        
        screen.animate(keyframes, {
            duration: duration,
            easing: 'ease-out'
        });
    }
};

// CSSアニメーション追加
const style = document.createElement('style');
style.textContent = `
    @keyframes char-appear {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes loading-progress {
        from {
            width: 0%;
        }
        to {
            width: 100%;
        }
    }
    
    .vs-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        font-size: 48px;
        color: #FFD700;
    }
    
    .vs-center {
        font-size: 72px;
        animation: vs-zoom 0.5s ease-out;
    }
    
    .combo-counter {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        z-index: 100;
    }
    
    .combo-number {
        font-size: 48px;
        color: #FF4500;
        text-shadow: 3px 3px 0px #8B0000;
    }
    
    .combo-text {
        font-size: 20px;
        color: #FFD700;
    }
    
    .victory-screen {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 1000;
    }
    
    .loading-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    
    .loading-text {
        margin-bottom: 20px;
        color: #FFD700;
        font-size: 16px;
    }
`;
document.head.appendChild(style);