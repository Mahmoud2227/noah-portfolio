import classes from "./ListItem.module.scss";

const ListItem = ({title, duration}) => {
	return (
		<li className={classes.body}>
			<div className={classes.info}>
				<h4>{title}</h4>
				<p>Noah Estrada</p>
			</div>
			<span className={classes.duration}>{duration}</span>
		</li>
	);
};

export default ListItem;
