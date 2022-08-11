import ListItem from "./ListItem/ListItem";
import classes from "./SongsList.module.scss";

const SongsList = ({songs}) => {
	return <ul className={classes.body}>
    {songs.map((song) => (<ListItem key={song._key} title={song.title} duration={song.duration} />))}
  </ul>;
};

export default SongsList;
