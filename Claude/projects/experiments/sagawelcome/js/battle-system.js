// バトルシステムのコア機能
class BattleSystem {
    constructor() {
        // プレイヤーのステータス
        this.player1 = {
            name: 'YOU',
            health: 100,
            maxHealth: 100,
            energy: 100,
            defense: false,
            combo: 0,
            wins: 0
        };
        
        this.player2 = {
            name: 'SAGA',
            health: 100,
            maxHealth: 100,
            energy: 100,
            defense: false,
            combo: 0,
            wins: 0
        };
        
        // バトル状態
        this.currentRound = 1;
        this.isPlayerTurn = true;
        this.isAnimating = false;
        this.battleEnded = false;
        
        // 技リスト
        this.moves = {
            punch: { name: 'パンチ', damage: 10, energy: 0, sound: 'punch' },
            kick: { name: 'キック', damage: 15, energy: 10, sound: 'kick' },
            hadouken: { name: '波動拳', damage: 25, energy: 30, sound: 'hadouken' },
            special: { name: 'スペシャル', damage: 40, energy: 50, sound: 'special' }
        };
        
        // CPU AIの行動パターン
        this.cpuPatterns = [
            { move: 'punch', probability: 0.4 },
            { move: 'kick', probability: 0.3 },
            { move: 'hadouken', probability: 0.2 },
            { move: 'defend', probability: 0.1 }
        ];
    }
    
    // 初期化
    init() {
        this.updateUI();
        this.bindEvents();
        this.showMessage('ROUND ' + this.currentRound);
        
        setTimeout(() => {
            this.showMessage('FIGHT!');
            SoundManager.play('round');
            setTimeout(() => SoundManager.play('start'), 200);
        }, 1500);
    }
    
    // イベントバインディング
    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating || this.battleEnded || !this.isPlayerTurn) return;
            
            switch(e.key.toLowerCase()) {
                case 'z':
                    this.playerAction('punch');
                    break;
                case 'x':
                    this.playerAction('kick');
                    break;
                case 'c':
                    this.playerAction('hadouken');
                    break;
                case 'v':
                    this.playerAction('special');
                    break;
                case 'd':
                    this.playerDefend();
                    break;
            }
        });
        
        // モバイル用ボタン
        this.addMobileControls();
    }
    
    // プレイヤーのアクション
    playerAction(moveType) {
        const move = this.moves[moveType];
        
        // エネルギーチェック
        if (this.player1.energy < move.energy) {
            this.showMessage('エネルギー不足！');
            SoundManager.play('select');
            return;
        }
        
        this.isAnimating = true;
        this.player1.defense = false;
        
        // アニメーション
        this.animateAttack('player1');
        
        // 必殺技の場合は充電音を再生
        if (moveType === 'hadouken' || moveType === 'special') {
            SoundManager.playChargeSound(moveType);
        } else {
            SoundManager.play(move.sound);
        }
        
        // ダメージ計算
        let damage = move.damage;
        if (this.player2.defense) {
            damage = Math.floor(damage * 0.3);
            this.showMessage('ガード！');
            SoundManager.play('block');
        }
        
        // コンボ処理
        this.player1.combo++;
        if (this.player1.combo > 1) {
            damage = Math.floor(damage * (1 + this.player1.combo * 0.1));
            this.showCombo(this.player1.combo);
            SoundManager.playComboSound(this.player1.combo);
        }
        
        // ダメージ適用
        this.dealDamage('player2', damage);
        this.player1.energy = Math.max(0, this.player1.energy - move.energy);
        
        // エフェクト表示
        this.showEffect(moveType, 'player2');
        
        setTimeout(() => {
            this.isAnimating = false;
            this.checkBattleEnd();
            
            if (!this.battleEnded) {
                this.isPlayerTurn = false;
                setTimeout(() => this.cpuTurn(), 1000);
            }
        }, 1000);
    }
    
    // 防御
    playerDefend() {
        this.isAnimating = true;
        this.player1.defense = true;
        this.player1.combo = 0;
        
        this.showMessage('防御！');
        SoundManager.play('block');
        setTimeout(() => SoundManager.play('energyCharge'), 100);
        
        // エネルギー回復
        this.player1.energy = Math.min(100, this.player1.energy + 20);
        
        setTimeout(() => {
            this.isAnimating = false;
            this.isPlayerTurn = false;
            setTimeout(() => this.cpuTurn(), 500);
        }, 500);
    }
    
    // CPUのターン
    cpuTurn() {
        if (this.battleEnded) return;
        
        this.player2.defense = false;
        
        // AIの行動決定
        const action = this.decideCpuAction();
        
        if (action === 'defend') {
            this.player2.defense = true;
            this.player2.combo = 0;
            this.showMessage('SAGA 防御！');
            this.player2.energy = Math.min(100, this.player2.energy + 20);
            
            setTimeout(() => {
                this.isPlayerTurn = true;
            }, 1000);
        } else {
            const move = this.moves[action];
            
            if (this.player2.energy >= move.energy) {
                this.animateAttack('player2');
                SoundManager.play(move.sound);
                
                let damage = move.damage;
                if (this.player1.defense) {
                    damage = Math.floor(damage * 0.3);
                    this.showMessage('ガード成功！');
                    SoundManager.play('parry');
                }
                
                this.player2.combo++;
                if (this.player2.combo > 1) {
                    damage = Math.floor(damage * (1 + this.player2.combo * 0.1));
                }
                
                this.dealDamage('player1', damage);
                this.player2.energy = Math.max(0, this.player2.energy - move.energy);
                
                this.showEffect(action, 'player1');
                
                setTimeout(() => {
                    this.checkBattleEnd();
                    this.isPlayerTurn = true;
                }, 1000);
            } else {
                // エネルギー不足なら通常攻撃
                this.cpuTurn();
            }
        }
    }
    
    // CPUの行動決定
    decideCpuAction() {
        // 体力が少ない時は防御確率を上げる
        let patterns = [...this.cpuPatterns];
        if (this.player2.health < 30) {
            patterns.find(p => p.move === 'defend').probability = 0.3;
        }
        
        // ランダム選択
        const random = Math.random();
        let sum = 0;
        
        for (const pattern of patterns) {
            sum += pattern.probability;
            if (random < sum) {
                return pattern.move;
            }
        }
        
        return 'punch';
    }
    
    // ダメージ処理
    dealDamage(target, damage) {
        const player = target === 'player1' ? this.player1 : this.player2;
        player.health = Math.max(0, player.health - damage);
        
        this.updateHealthBar(target, player.health);
        this.showDamageNumber(target, damage);
        AnimationManager.screenShake(200, 5);
        
        // ダメージ音を再生
        SoundManager.playDamageSound(damage);
        
        // 体力が少ない時の警告音
        if (player.health < 30 && player.health > 0) {
            setTimeout(() => SoundManager.play('lowHealth'), 300);
        }
        
        const element = document.getElementById(target);
        element.classList.add('damage-effect');
        setTimeout(() => element.classList.remove('damage-effect'), 200);
    }
    
    // UI更新
    updateUI() {
        this.updateHealthBar('player1', this.player1.health);
        this.updateHealthBar('player2', this.player2.health);
        this.updateEnergyBar('player1', this.player1.energy);
        this.updateEnergyBar('player2', this.player2.energy);
        document.querySelector('.round-text').textContent = `ROUND ${this.currentRound}`;
    }
    
    // 体力バー更新
    updateHealthBar(player, health) {
        const bar = document.getElementById(player + '-health');
        const percentage = (health / 100) * 100;
        bar.style.width = percentage + '%';
        
        if (health < 30) {
            bar.style.background = 'linear-gradient(90deg, #FF0000 0%, #8B0000 100%)';
        }
    }
    
    // エネルギーバー追加
    updateEnergyBar(player, energy) {
        // エネルギーバーのHTML要素が必要
        const bar = document.querySelector(`#${player}-energy`);
        if (bar) {
            bar.style.width = energy + '%';
        }
    }
    
    // メッセージ表示
    showMessage(text) {
        const actionText = document.getElementById('actionText');
        actionText.textContent = text;
        actionText.classList.add('show');
        
        setTimeout(() => {
            actionText.classList.remove('show');
        }, 1500);
    }
    
    // コンボ表示
    showCombo(count) {
        const counter = document.getElementById('comboCounter');
        counter.textContent = count + ' HIT COMBO!';
        counter.style.display = 'block';
        
        setTimeout(() => {
            counter.style.display = 'none';
        }, 1500);
    }
    
    // ダメージ数値表示
    showDamageNumber(target, damage) {
        const element = document.getElementById(target);
        const damageText = document.createElement('div');
        damageText.className = 'damage-number';
        damageText.textContent = damage;
        damageText.style.cssText = `
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            color: #FFD700;
            font-size: 24px;
            font-weight: bold;
            animation: damage-rise 1s ease-out forwards;
        `;
        
        element.appendChild(damageText);
        
        setTimeout(() => damageText.remove(), 1000);
    }
    
    // エフェクト表示
    showEffect(moveType, target) {
        if (moveType === 'hadouken') {
            const hadouken = document.createElement('div');
            hadouken.className = 'special-effect hadouken';
            hadouken.style.cssText = `
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                animation: hadouken-fly 0.8s ease-out forwards;
            `;
            
            if (target === 'player2') {
                hadouken.style.left = '150px';
            } else {
                hadouken.style.right = '150px';
                hadouken.style.animation = 'hadouken-fly-reverse 0.8s ease-out forwards';
            }
            
            document.querySelector('.battle-arena').appendChild(hadouken);
            setTimeout(() => hadouken.remove(), 800);
        }
    }
    
    // 攻撃アニメーション
    animateAttack(attacker) {
        const element = document.getElementById(attacker);
        element.style.animation = 'none';
        
        setTimeout(() => {
            element.style.animation = 'attack-move 0.5s ease-out';
        }, 10);
    }
    
    // バトル終了チェック
    checkBattleEnd() {
        if (this.player1.health <= 0) {
            this.battleEnded = true;
            this.showMessage('YOU LOSE...');
            SoundManager.play('ko');
            setTimeout(() => SoundManager.play('defeat'), 500);
            setTimeout(() => {
                this.nextRound(false);
            }, 2000);
        } else if (this.player2.health <= 0) {
            this.battleEnded = true;
            this.showMessage('K.O.!');
            SoundManager.play('ko');
            setTimeout(() => {
                if (this.player1.health === 100) {
                    this.showMessage('PERFECT!');
                    SoundManager.play('perfect');
                } else {
                    SoundManager.playVictoryFanfare();
                }
            }, 500);
            setTimeout(() => {
                this.nextRound(true);
            }, 2000);
        }
    }
    
    // 次のラウンド
    nextRound(playerWon) {
        if (playerWon) {
            this.player1.wins++;
        } else {
            this.player2.wins++;
        }
        
        // 2勝したら勝利
        if (this.player1.wins >= 2) {
            window.location.href = 'win.html';
        } else if (this.player2.wins >= 2) {
            this.showMessage('GAME OVER');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        } else {
            // 次のラウンドへ
            this.currentRound++;
            this.player1.health = 100;
            this.player2.health = 100;
            this.player1.energy = 100;
            this.player2.energy = 100;
            this.player1.combo = 0;
            this.player2.combo = 0;
            this.player1.defense = false;
            this.player2.defense = false;
            this.battleEnded = false;
            this.isPlayerTurn = true;
            
            this.updateUI();
            this.showMessage('ROUND ' + this.currentRound);
            
            setTimeout(() => {
                this.showMessage('FIGHT!');
                SoundManager.play('round');
                setTimeout(() => SoundManager.play('start'), 200);
            }, 1500);
        }
    }
    
    // モバイルコントロール追加
    addMobileControls() {
        // モバイル用のボタンを動的に追加
        const controls = document.querySelector('.battle-controls');
        if (controls && window.innerWidth <= 768) {
            controls.innerHTML = `
                <div class="mobile-buttons">
                    <button class="battle-btn" data-action="punch">パンチ(Z)</button>
                    <button class="battle-btn" data-action="kick">キック(X)</button>
                    <button class="battle-btn" data-action="hadouken">波動拳(C)</button>
                    <button class="battle-btn" data-action="defend">防御(D)</button>
                </div>
            `;
            
            document.querySelectorAll('.battle-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.dataset.action;
                    if (action === 'defend') {
                        this.playerDefend();
                    } else {
                        this.playerAction(action);
                    }
                });
            });
        }
    }
}

// CSSアニメーション追加
const battleStyles = document.createElement('style');
battleStyles.textContent = `
    @keyframes damage-rise {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-50px);
        }
    }
    
    @keyframes hadouken-fly-reverse {
        0% {
            opacity: 0;
            transform: translateY(-50%) translateX(0) scale(0.5);
        }
        20% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-50%) translateX(-400px) scale(1.5);
        }
    }
    
    .mobile-buttons {
        display: flex;
        gap: 10px;
        justify-content: center;
    }
    
    .battle-btn {
        padding: 10px 15px;
        background-color: #4B0082;
        color: #FFD700;
        border: 2px solid #FFD700;
        font-family: 'Press Start 2P', monospace;
        font-size: 10px;
        cursor: pointer;
        transition: all 0.1s;
    }
    
    .battle-btn:active {
        transform: scale(0.95);
        background-color: #FFD700;
        color: #4B0082;
    }
`;
document.head.appendChild(battleStyles);