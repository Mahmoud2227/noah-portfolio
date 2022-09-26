import ListItem from "./ListItem/ListItem";
import classes from "./SongsList.module.scss";

import {useSelector, useDispatch} from "react-redux";
import {setActiveSong} from "../../redux/features/playerSlice";

const SongsList = ({album}) => {
	const dispatch = useDispatch();
	const {currentIndex, meta} = useSelector((state) => state.player);
	const activeTrack = meta?.id === album.id ? currentIndex : null;

	const handleClick = (song, i) => {
		const meta = {
			id: album.id,
			title: album.title,
			cover: album.cover,
		};
		dispatch(setActiveSong({song, i, playlist: album.songs, meta}));
	};

	return (
		<ul className={classes.body}>
			{album?.songs.map((song, index) => (
				<ListItem
					key={song._key}
					track={song}
					active={activeTrack === index}
					onClick={() => handleClick(song, index)}
				/>
			))}
		</ul>
	);
};

export default SongsList;
