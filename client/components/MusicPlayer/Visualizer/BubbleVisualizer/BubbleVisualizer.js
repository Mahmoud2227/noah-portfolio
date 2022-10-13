import Vector2 from "../Vector2";

class Particle {
	constructor(index, parent) {
		this.index = index;
		this.parent = parent;
		this.minSize = 5;
		this.init();
	}
	init() {
		this.freqVal = this.parent.freqData[this.index] * 0.01;
		this.size =
			this.freqVal * ((this.parent.dimensions.x + this.parent.dimensions.y) * 0.5) * 0.0125 +
			this.minSize;
		this.position = new Vector2(
			Math.random() * this.parent.dimensions.x,
			this.parent.dimensions.y + this.size + Math.random() * 50
		);
		this.velocity = new Vector2(2 - Math.random() * 4, 0);
	}
	update() {
		this.freqVal = this.parent.freqData[this.index] * 0.01;

		this.size = this.freqVal * 20 + this.minSize;

		this.hue =
			(this.index / this.parent.analyser.frequencyBinCount) * 360 + 120 + this.parent.tick / 6;
		this.saturation = this.freqVal * 50;
		this.alpha = this.freqVal * 0.3;

		this.fill = `hsla(${this.hue}, ${this.saturation}%, 50%, ${this.alpha})`;
		this.lift = Math.pow(this.freqVal, 3);

		this.position.subY(this.lift + 0.5);
		this.position.add(this.velocity);

		this.checkBounds();
	}
	checkBounds() {
		if (
			this.position.y < -this.size ||
			this.position.x < -this.parent.dimensions.x * 0.15 ||
			this.position.x > this.parent.dimensions.x * 1.15
		) {
			this.init();
		}
	}
}

class BubbleVisualizer {
	constructor(canvas, glowLayer, analyser, options) {
		this.globalMovement = new Vector2();
		this.canvas = canvas;
		this.glowLayer = glowLayer;
		this.analyser = analyser;
		this.options = options;
		this.initCanvas();
		this.initAudio();
		this.populate();
		this.render();
		window.addEventListener("resize", this.resize.bind(this));
	}
	initCanvas() {
		this.tick = 0;
		this.wave = this.options.wave;
		this.ctx = this.canvas.getContext("2d");
		this.glowCtx = this.glowLayer.getContext("2d");
		this.dimensions = {};
		this.resize();
	}
	resize() {
		this.canvas.width = this.glowLayer.width = this.dimensions.x = window.innerWidth;
		this.canvas.height = this.glowLayer.height = this.dimensions.y = window.innerHeight;
	}
	initAudio() {
		this.analyser.smoothingTimeConstant = 0.92;
		this.analyser.fftSize = 2048;
		this.analyser.minDecibels = -125;
		this.analyser.maxDecibels = -10;

		this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
	}
	populate() {
		this.particles = [];
		for (let i = 0; i < 265; i++) {
			this.particles.push(new Particle(i, this));
		}
	}
	update() {
		this.ctx.clearRect(0, 0, this.dimensions.x, this.dimensions.y);
		this.ctx.save();
		this.ctx.globalCompositeOperation = "lighten";
		for (let i = this.particles.length - 1; i >= 0; i--) {
			let particle = this.particles[i];
			if (this.freqData[i] > 0) {
				particle.update();
				if (this.wave) particle.position.add(this.globalMovement);
				this.ctx.beginPath();
				this.ctx.fillStyle = particle.fill;
				this.ctx.beginPath();
				this.ctx.arc(particle.position.x, particle.position.y, particle.size, 0, 2 * Math.PI);
				this.ctx.fill();
				this.ctx.closePath();
			}
		}
		this.ctx.restore();
		this.glowCtx.clearRect(0, 0, this.dimensions.x, this.dimensions.y);
		this.glowCtx.filter = "blur(8px) saturate(150%) brightness(150%)";
		this.glowCtx.drawImage(this.canvas, 0, 0);
	}
	render() {
		this.tick++;
		if (this.wave) this.globalMovement.x = Math.sin(this.tick * 0.01) * 2;
		this.analyser.getByteFrequencyData(this.freqData);
		this.update();
		this.requestAnimationFrame = requestAnimationFrame(this.render.bind(this));
	}
	setOptions(options) {
		this.wave = options.wave;
	}
	cancelAnimation() {
		cancelAnimationFrame(this.requestAnimationFrame);
	}
}

export default BubbleVisualizer;
