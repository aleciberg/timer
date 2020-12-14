class Timer {
    constructor (durationInput, startButton, pauseButton, resetButton, callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.resetButton = resetButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
        this.resetButton.addEventListener('click', this.reset)
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 50);
    }

    pause = () => {
        clearInterval(this.interval);
    }

    reset = () => {
        this.timeRemaining = 3;
        this.onStart(this.timeRemaining);
        this.onTick(this.timeRemaining);
    }

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause()
            if (this.onComplete) { this.onComplete() };
        }
        else {
            this.timeRemaining = this.timeRemaining - .05;
            if (this.onTick) { this.onTick(this.timeRemaining) };
        };
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}