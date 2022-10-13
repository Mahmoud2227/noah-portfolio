import Vector2 from "../Vector2";

const {pow, cos, sin, random, PI, abs} = Math;

const rand = (number) => random() * number;

const fadeInOut = (t, m) => {
	let hm = 0.5 * m;
	return abs(((t + hm) % m) - hm) / hm;
};

class VectorArrayObject {
	constructor(count = 0, max = 0) {
		this.count = count || max;
		this.max = max || count;
		this.values = new Float32Array(max * 2);
	}
	get(i) {
		return {
			x: this.values[i * 2],
			y: this.values[i * 2 + 1],
		};
	}
	getX(i) {
		return this.values[i * 2];
	}
	getY(i) {
		return this.values[i * 2 + 1];
	}
	set(i, x, y) {
		this.values[i * 2] = x;
		this.values[i * 2 + 1] = y;
		return this;
	}
	setX(i, x) {
		this.values[i * 2] = x;
		return this;
	}
	setY(i, y) {
		this.values[i * 2 + 1] = y;
		return this;
	}
}

class VectorArrayObjectController {
	constructor(count = 0, max = 0) {
		this.count = count || max;
		this.max = max || count;
		this.life = new VectorArrayObject(this.count, this.max);
		this.vertices = new VectorArrayObject(this.count, this.max);
		this.velocities = new VectorArrayObject(this.count, this.max);
	}
	getLife(i) {
		return this.life.getX(i);
	}
	getTTL(i) {
		return this.life.getY(i);
	}
	setLife(i, life) {
		this.life.setX(i, life);
		return this;
	}
	setTTL(i, ttl) {
		this.life.setY(i, ttl);
		return this;
	}
	getVertex(i) {
		return this.vertices.get(i);
	}
	setVertex(i, x, y) {
		this.vertices.set(i, x, y);
		return this;
	}
	getVelocity(i) {
		return this.velocities.get(i);
	}
	setVelocity(i, x, y) {
		this.velocities.set(i, x, y);
		return this;
	}
}

class RenderObject {
	constructor(x = 0, y = 0) {
		this.life = 0;
		this.position = new Vector2(x, y);
		this.lastPosition = this.position.clone();
		this.velocity = new Vector2();
	}
	getPosition() {
		return this.position.clone();
	}
	setPosition(x, y) {
		this.position.x = x;
		this.position.y = y;
		return this;
	}
	setLastPosition() {
		this.lastPosition.x = this.position.x;
		this.lastPosition.y = this.position.y;
		return this;
	}
	getVelocity() {
		return this.velocity.clone();
	}
	setVelocity(x, y) {
		this.velocity.x = x;
		this.velocity.y = y;
		return this;
	}
	getLife() {
		return this.life;
	}
	setLife(n) {
		this.life = n;
		return this;
	}
	setTTL(n) {
		this.ttl = n;
		return this;
	}
}

class Particle extends RenderObject {
	constructor(x, y, bounds, controller) {
		super(x, y, bounds);
		this.parent = controller;
		this.reset = false;
		this.bounds = bounds;
		this.alpha = 0;
		this.hue = 0;
		this.frequency = 0;
		this.size = 0;
	}
	update(vX, vY) {
		this.setVelocity(vX, vY)
			.setLastPosition()
			.checkLife()
			.checkBounds()
			.setSize()
			.setHue()
			.setAlpha()
			.setColor();

		this.velocity.multiplyScalar(
			0.025 * pow(this.normalizedFrequency + this.normalizedAvgFrequency, 3) + 1
		);
		this.position.add(this.velocity);
		this.life++;

		return this;
	}
	setIndex(i) {
		this.index = i;
		return this;
	}
	checkLife() {
		this.reset = this.life >= this.ttl;
		return this;
	}
	checkBounds() {
		if (
			this.position.x > this.bounds.x + this.size ||
			this.position.x < -this.size ||
			this.position.y > this.bounds.y + this.size ||
			this.position.y < -this.size
		) {
			this.reset = true;
		}
		return this;
	}
	setSize() {
		this.size = pow(this.normalizedFrequency * 4, 3) + 2;
		return this;
	}
	setFrequency(currentFrequency, avgFrequency) {
		this.frequency = currentFrequency;
		this.normalizedFrequency = currentFrequency / 256;
		this.avgFrequency = avgFrequency;
		this.normalizedAvgFrequency = avgFrequency / 128;
		return this;
	}
	setHue() {
		this.hue = 1.5 * (this.index / this.parent.count - this.frequency + this.parent.delta);
		return this;
	}
	setAlpha() {
		this.alpha = fadeInOut(this.life, this.ttl) * this.normalizedFrequency;
		return this;
	}
	setColor() {
		this.color = `hsla(${this.hue}, 75%, 50%, ${this.alpha})`;
		return this;
	}
	draw(canvas) {
		canvas.buffer.save();
		canvas.arc(this.position.x, this.position.y, this.size, 0, PI * 2, this.color);
		canvas.buffer.restore();
		return this;
	}
}

class ParticleController extends VectorArrayObjectController {
	constructor(count, max, canvas) {
		super(count, max);
		this.delta = 0;
		this.canvas = canvas;
		this.bounds = canvas.dimensions;
		this.populate();
	}
	populate() {
		this.renderTarget = new Particle(0, 0, this.bounds, this);
		for (let i = 0; i < this.count; i++) {
			this.initRenderTarget(i);
		}
	}
	initRenderTarget(i) {
		let x, y, theta, rTheta, rDist, vX, vY, ttl;

		rTheta = rand(PI);
		rDist = rand(0.5 * this.bounds.y);

		x = 0.5 * this.bounds.x + rDist * cos(rTheta);
		y = this.bounds.y - rDist * sin(rTheta);

		this.renderTarget.setLife(0).setPosition(x, y).setLastPosition();

		theta = this.canvas.origin.angleTo(this.renderTarget.position);
		vX = cos(theta);
		vY = sin(theta);
		ttl = rand(100) + 100;

		this.renderTarget.setVelocity(vX, vY);

		this.setVertex(i, x, y).setLife(i, 0).setTTL(i, ttl).setVelocity(i, vX, vY);

		this.renderTarget.reset = false;

		return this;
	}
	drawRenderTarget(i, currentFrequency, avgFrequency) {
		this.renderTarget
			.setIndex(i)
			.setLife(this.getLife(i))
			.setTTL(this.getTTL(i))
			.setPosition(this.vertices.getX(i), this.vertices.getY(i))
			.setFrequency(currentFrequency, avgFrequency)
			.update(this.velocities.getX(i), this.velocities.getY(i))
			.draw(this.canvas);

		this.setVertex(i, this.renderTarget.position.x, this.renderTarget.position.y)
			.setVelocity(i, this.renderTarget.velocity.x, this.renderTarget.velocity.y)
			.setLife(i, this.renderTarget.getLife());

		this.renderTarget.reset && this.initRenderTarget(i);
	}
}

class AudioController {
	constructor(analyser) {
		this.analyser = analyser;
		this.initAudio();
	}

	initAudio() {
		this.analyser.smoothingTimeConstant = 0.88;
		this.analyser.minDecibels = -140;
		this.analyser.maxDecibels = -10;
		this.analyser.fftSize = 1024;

		this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
	}
	getFrequencyData() {
		this.analyser.getByteFrequencyData(this.freqData);
		return this.freqData;
	}
}

class Canvas {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.frame = document.createElement("canvas");
		this.buffer = this.frame.getContext("2d");
		this.dimensions = new Vector2();
		this.origin = new Vector2();
		window.addEventListener("resize", this.resize.bind(this));
		this.resize();
	}
	resize() {
		this.dimensions.x = this.frame.width = this.canvas.width = window.innerWidth;
		this.dimensions.y = this.frame.height = this.canvas.height = window.innerHeight;
		this.origin.x = 0.5 * this.dimensions.x;
		this.origin.y = this.dimensions.y;
	}
	clear() {
		this.ctx.clearRect(0, 0, this.dimensions.x, this.dimensions.y);
		this.buffer.clearRect(0, 0, this.dimensions.x, this.dimensions.y);
	}
	line(x1, y1, x2, y2, w, c) {
		this.buffer.beginPath();
		this.buffer.strokeStyle = c;
		this.buffer.lineWidth = w;
		this.buffer.moveTo(x1, y1);
		this.buffer.lineTo(x2, y2);
		this.buffer.stroke();
		this.buffer.closePath();
	}
	fill(c) {
		this.buffer.fillStyle = c;
		this.buffer.fillRect(0, 0, this.dimensions.x, this.dimensions.y);
	}
	rect(x, y, w, h, c) {
		this.buffer.fillStyle = c;
		this.buffer.fillRect(x, y, w, h);
	}
	arc(x, y, r, s, e, c) {
		this.buffer.beginPath();
		this.buffer.fillStyle = c;
		this.buffer.arc(x, y, r, s, e);
		this.buffer.fill();
		this.buffer.closePath();
	}
	render() {
		this.ctx.drawImage(this.frame, 0, 0);
	}
	drawImage(image, x = 0, y = 0) {
		this.buffer.drawImage(image, x, y);
	}
}

class SpectrumVisualizer {
	constructor(canvas, analyser, options) {
		this.canvas = new Canvas(canvas);
		this.audio = new AudioController(analyser);
		this.particles = new ParticleController(
			this.audio.analyser.frequencyBinCount,
			this.audio.analyser.frequencyBinCount / 2,
			this.canvas
		);
		this.options = options;
		this.update();
		this.draw(this.audio.getFrequencyData());
	}
	draw(freqData) {
		const spectrumWidth = 0.5 * freqData.length;
		let x, y, width, norm, hue, scale, data;

		this.particles.delta += 0.15;
		this.avgFrequency = freqData.reduce((a, b) => a + b + 1) / freqData.length;
		this.canvas.clear();
		this.drawBacklight(freqData);
		for (let i = 0; i < this.particles.count; i++) {
			data = freqData[i];
			this.options.particles && this.particles.drawRenderTarget(i, data, this.avgFrequency);
			if (i < spectrumWidth) {
				x = (i / spectrumWidth) * this.canvas.origin.x;
				y = this.canvas.dimensions.y;
				width = (this.canvas.origin.x / spectrumWidth) * 0.5;
				norm = data / 256;
				hue = 110 * (1 - norm);
				scale = norm * (0.25 * this.canvas.dimensions.y);

				this.canvas.line(
					this.canvas.origin.x + x + width,
					y,
					this.canvas.origin.x + x + width,
					y - scale,
					width,
					`hsla(${hue}, 75%, 50%, 1)`
				);
				this.canvas.line(
					this.canvas.origin.x - x - width,
					y,
					this.canvas.origin.x - x - width,
					y - scale,
					width,
					`hsla(${hue}, 75%, 50%, 1)`
				);
			}
		}
		this.drawGlowLayer();
		this.canvas.render();
	}
	drawBacklight() {
		let hue, gradient;
		hue = ((128 - this.avgFrequency) / 128) * 100;
		gradient = this.canvas.buffer.createRadialGradient(
			this.canvas.origin.x,
			this.canvas.origin.y,
			0,
			this.canvas.origin.x,
			this.canvas.origin.y,
			0.65 * this.canvas.dimensions.y
		);
		gradient.addColorStop(0, `hsla(${hue}, 75%, 70%, ${pow(this.avgFrequency / 128, 2)})`);
		gradient.addColorStop(1, `hsla(${hue}, 75%, 40%, 0)`);
		this.canvas.rect(0, 0, this.canvas.dimensions.x, this.canvas.dimensions.y, gradient);
	}
	drawGlowLayer() {
		this.canvas.ctx.save();
		this.canvas.ctx.filter = "blur(5px) saturate(200%)";
		this.canvas.render();
		this.canvas.ctx.restore();
	}
	update() {
		this.draw(this.audio.getFrequencyData());
		this.requestAnimationFrame = requestAnimationFrame(this.update.bind(this));
	}
	setOptions(options) {
		this.options = options;
	}
	cancelAnimation() {
		cancelAnimationFrame(this.requestAnimationFrame);
	}
}

export default SpectrumVisualizer;
