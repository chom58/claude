// サウンド管理
const SoundManager = {
    // サウンドの設定
    sounds: {
        // メニュー系
        start: { frequency: 440, duration: 200, type: 'square' },
        select: { frequency: 880, duration: 100, type: 'square' },
        confirm: { frequency: 660, duration: 150, type: 'sine' },
        
        // 攻撃系
        punch: { frequency: 150, duration: 80, type: 'triangle' },
        kick: { frequency: 120, duration: 120, type: 'sawtooth' },
        hit: { frequency: 150, duration: 100, type: 'triangle' },
        heavyHit: { frequency: 80, duration: 150, type: 'sawtooth' },
        critical: { frequency: 200, duration: 200, type: 'square' },
        
        // 必殺技系
        hadouken: { frequency: 200, duration: 500, type: 'sawtooth' },
        hadoukenCharge: { frequency: 100, duration: 300, type: 'sine' },
        special: { frequency: 300, duration: 600, type: 'square' },
        specialCharge: { frequency: 150, duration: 400, type: 'sine' },
        
        // 防御・回避系
        block: { frequency: 400, duration: 100, type: 'triangle' },
        parry: { frequency: 600, duration: 150, type: 'sine' },
        dodge: { frequency: 800, duration: 80, type: 'square' },
        
        // ダメージ系
        damage: { frequency: 100, duration: 150, type: 'noise' },
        heavyDamage: { frequency: 60, duration: 200, type: 'noise' },
        ko: { frequency: 50, duration: 500, type: 'sawtooth' },
        
        // システム系
        lowHealth: { frequency: 220, duration: 300, type: 'triangle' },
        energyCharge: { frequency: 550, duration: 200, type: 'sine' },
        round: { frequency: 523, duration: 400, type: 'square' },
        
        // 勝利・敗北
        victory: { frequency: 880, duration: 1000, type: 'sine' },
        defeat: { frequency: 110, duration: 800, type: 'sawtooth' },
        perfect: { frequency: 1047, duration: 600, type: 'square' },
        
        // その他
        coin: { frequency: 988, duration: 100, type: 'square' },
        powerup: { frequency: 440, duration: 300, type: 'sine' },
        combo: { frequency: 660, duration: 100, type: 'square' }
    },
    
    // AudioContext
    audioContext: null,
    
    // 初期化
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API is not supported in this browser');
        }
    },
    
    // サウンド再生
    play(soundName) {
        if (!this.audioContext || !this.sounds[soundName]) return;
        if (this.muted) return;
        
        const sound = this.sounds[soundName];
        
        if (sound.type === 'noise') {
            this.playNoise(sound);
        } else {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = sound.frequency;
            oscillator.type = sound.type;
            
            // エンベロープ設定
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + sound.duration / 1000);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + sound.duration / 1000);
        }
    },
    
    // ノイズ音の再生
    playNoise(sound) {
        const bufferSize = this.audioContext.sampleRate * sound.duration / 1000;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        noise.buffer = buffer;
        filter.type = 'lowpass';
        filter.frequency.value = sound.frequency * 10;
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + sound.duration / 1000);
        
        noise.start(this.audioContext.currentTime);
        noise.stop(this.audioContext.currentTime + sound.duration / 1000);
    },
    
    // メロディ再生
    playMelody(notes, tempo = 120) {
        if (!this.audioContext) return;
        
        const beatDuration = 60 / tempo;
        let currentTime = this.audioContext.currentTime;
        
        notes.forEach(note => {
            if (note.frequency > 0) {
                this.playNote(note.frequency, note.duration * beatDuration, currentTime);
            }
            currentTime += note.duration * beatDuration;
        });
    },
    
    // 単音再生
    playNote(frequency, duration, startTime) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.2, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    },
    
    // リュウのテーマ（簡易版）
    playRyuTheme() {
        const melody = [
            { frequency: 440, duration: 0.25 },  // A
            { frequency: 440, duration: 0.25 },  // A
            { frequency: 554, duration: 0.25 },  // C#
            { frequency: 440, duration: 0.25 },  // A
            { frequency: 659, duration: 0.5 },   // E
            { frequency: 554, duration: 0.5 },   // C#
            { frequency: 440, duration: 0.5 },   // A
            { frequency: 0, duration: 0.5 },     // Rest
            { frequency: 440, duration: 0.25 },  // A
            { frequency: 440, duration: 0.25 },  // A
            { frequency: 554, duration: 0.25 },  // C#
            { frequency: 440, duration: 0.25 },  // A
            { frequency: 784, duration: 0.5 },   // G
            { frequency: 659, duration: 0.5 },   // E
            { frequency: 554, duration: 0.5 },   // C#
        ];
        
        this.playMelody(melody, 140);
    },
    
    // 勝利ファンファーレ
    playVictoryFanfare() {
        const fanfare = [
            { frequency: 523, duration: 0.2 },  // C
            { frequency: 523, duration: 0.2 },  // C
            { frequency: 523, duration: 0.2 },  // C
            { frequency: 659, duration: 0.6 },  // E
            { frequency: 784, duration: 0.2 },  // G
            { frequency: 659, duration: 0.2 },  // E
            { frequency: 784, duration: 0.8 },  // G
        ];
        
        this.playMelody(fanfare, 180);
    },
    
    // コンボサウンド
    playComboSound(comboCount) {
        const baseFrequency = 440;
        const frequency = baseFrequency * (1 + comboCount * 0.1);
        
        this.playNote(frequency, 0.1, this.audioContext.currentTime);
        
        // コンボ数に応じて追加音
        if (comboCount >= 5) {
            setTimeout(() => this.play('combo'), 50);
        }
        if (comboCount >= 10) {
            setTimeout(() => this.play('perfect'), 100);
        }
    },
    
    // 連続効果音再生
    playSequence(sounds, interval = 100) {
        if (!this.audioContext) return;
        
        sounds.forEach((soundName, index) => {
            setTimeout(() => {
                this.play(soundName);
            }, index * interval);
        });
    },
    
    // ダメージ音（ダメージ量に応じて変化）
    playDamageSound(damage) {
        if (damage < 10) {
            this.play('hit');
        } else if (damage < 20) {
            this.play('heavyHit');
        } else if (damage < 30) {
            this.play('damage');
        } else {
            this.play('heavyDamage');
            setTimeout(() => this.play('critical'), 50);
        }
    },
    
    // 必殺技の充電音
    playChargeSound(type) {
        if (type === 'hadouken') {
            this.play('hadoukenCharge');
            setTimeout(() => this.play('hadouken'), 300);
        } else if (type === 'special') {
            this.play('specialCharge');
            setTimeout(() => this.play('special'), 400);
        }
    },
    
    // BGM制御
    bgmVolume: 0.3,
    
    setVolume(volume) {
        this.bgmVolume = Math.max(0, Math.min(1, volume));
    },
    
    // ミュート切り替え
    muted: false,
    
    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }
};

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    // ユーザーインタラクション後に初期化
    document.addEventListener('click', () => {
        if (!SoundManager.audioContext) {
            SoundManager.init();
        }
    }, { once: true });
    
    // キーボードショートカット
    document.addEventListener('keydown', (e) => {
        if (e.key === 'm' || e.key === 'M') {
            SoundManager.toggleMute();
        }
    });
});