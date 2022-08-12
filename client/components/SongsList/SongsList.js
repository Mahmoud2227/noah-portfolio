import ListItem from "./ListItem/ListItem";
import classes from "./SongsList.module.scss";

const SongsList = ({songs, activeTrack, setCurTrack}) => {
	return (
		<ul className={classes.body}>
			{songs.map((song, index) => (
				<ListItem
					key={song._key}
					track={song}
					active={activeTrack === index}
					setCurTrack={setCurTrack}
				/>
			))}
		</ul>
	);
};

export default SongsList;
