import Button from "../UI/Button/Button";

import classes from "./subscription.module.scss";

const Subscription = () => {
	return (
		<div className={ "section__padding"}>
			<div className={classes.container}>
				<h1>SUBSCRIBE</h1>
				<form>
					<input type='email' placeholder='Your Email' />
					<Button>SUBSCRIBE</Button>
				</form>
			</div>
		</div>
	);
};

export default Subscription;
