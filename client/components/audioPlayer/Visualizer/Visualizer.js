import React, {useState, useEffect} from "react";

let audioCtx;
let audioSource;

const Visualizer = React.memo(({audio, curTrack, isPlaying}) => {
	useEffect(() => {
		const canvas = document.getElementById("visualizer");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const ctx = canvas.getContext("2d");
		if (audio != null && isPlaying) {
			audioCtx = audioCtx || new AudioContext();
			audioSource = audioSource || audioCtx.createMediaElementSource(audio);
			let analyser = audioCtx.createAnalyser();
			audioSource.connect(analyser);
			analyser.connect(audioCtx.destination);
			analyser.fftSize = 32;
			const bufferLength = analyser.frequencyBinCount;
			const dataArray = new Uint8Array(bufferLength);
			const barWidth = canvas.height / 2 / bufferLength;
			let barHeight;
			let x;

			function animate() {
				x = 0;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				analyser.getByteFrequencyData(dataArray);
				drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
				requestAnimationFrame(animate);
			}
			animate();

			function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray) {
				for (let i = 0; i < bufferLength; i++) {
					barHeight = dataArray[i] * 0.75;
					const hue = i * 5;
					ctx.fillStyle = `hsl(${hue},${barHeight / 2}%,50%)`;
					ctx.beginPath();
					ctx.arc(
						canvas.width - barHeight + 15,
						canvas.height / 2 - x,
						barWidth / 2,
						0,
						2 * Math.PI
					);
					ctx.fill();
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(barHeight - 15, canvas.height / 2 - x, barWidth / 2, 0, 2 * Math.PI);
					ctx.fill();
					ctx.stroke();
					// ctx.fillStyle = `hsl(${hue},${barHeight / 2}%,50%)`;
					// ctx.fillRect(canvas.width - barHeight, canvas.height / 2 - x * 2 - barWidth/2, barHeight, barWidth);
					x += barWidth * 2;
				}
				for (let i = 0; i < bufferLength; i++) {
					barHeight = dataArray[i] * 0.75;
					const hue = i * 5;
					ctx.fillStyle = `hsl(${hue},${barHeight / 2}%,50%)`;
					// ctx.fillRect(x,canvas.height-barHeight-20,barWidth,20)
					ctx.beginPath();
					ctx.arc(
						canvas.width - barHeight + 15,
						x - canvas.height / 2,
						barWidth / 2,
						0,
						2 * Math.PI
					);
					ctx.fill();
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(barHeight - 15, x - canvas.height / 2, barWidth / 2, 0, 2 * Math.PI);
					ctx.fill();
					ctx.stroke();
					ctx.fillStyle = `hsl(${hue},${barHeight / 2}%,50%)`;
					// ctx.fillRect(
					// 	canvas.width - barHeight,
					// 	x + canvas.height / 2 + barWidth / 2,
					// 	barHeight,
					// 	barWidth
					// );
					x += barWidth * 2;
				}
			}
		}
	}, [curTrack, isPlaying]);
	return <canvas id='visualizer'></canvas>;
});

export default Visualizer;
