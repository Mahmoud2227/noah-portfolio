import classes from "./ListItem.module.scss";

const ListItem = ({track, active, onClick}) => {
	return (
		<li className={`${classes.body} ${active ? classes.active : ""}`} onClick={onClick}>
			<div className={classes.info}>
				<h4>{track.title}</h4>
				<p>Noah Estrada</p>
			</div>
			<span className={classes.duration}>{track.duration}</span>
		</li>
	);
};

export default ListItem;
