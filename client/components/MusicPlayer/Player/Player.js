/* eslint-disable jsx-a11y/media-has-caption */
import React, {useEffect,forwardRef} from "react";

const Player = forwardRef(({
	activeSong,
	isPlaying,
	volume,
	seekTime,
	onEnded,
	onTimeUpdate,
	onLoadedData,
	repeat,
},
ref
) => {
	// const ref = useRef(null);

	if (ref.current) {
		if (isPlaying) {
			ref.current.play();
		} else {
			ref.current.pause();
		}
	}

	useEffect(() => {
		ref.current.volume = volume;
	}, [volume]);
	// updates audio element only on seekTime change (and not on each rerender):
	useEffect(() => {
		ref.current.currentTime = seekTime;
	}, [seekTime]);

	useEffect(() => {
		const loadAudio = async () => {
			const res = await fetch(activeSong.url, {
				method: "GET",
				headers: {
					"Content-Type": "audio/mpeg",
					"cache-control": "max-age=31536000",
				},
			});
			const blob = await res.blob();
			if (res.ok) {
				ref.current.src = URL.createObjectURL(blob);
			}
		}
		loadAudio();
	}, [activeSong]);

	return (
		<audio
			ref={ref}
			loop={repeat}
			onEnded={onEnded}
			onTimeUpdate={onTimeUpdate}
			onLoadedData={onLoadedData}
		/>
	);
});

export default Player;
