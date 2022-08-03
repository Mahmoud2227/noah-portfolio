import Button from "../UI/Button/Button";

import classes from "./contact.module.scss";

const Contact = () => {
	return (
		<div className={classes.body + " section__padding"}>
			<h1 className='gradient-text'>Contact Noah</h1>
			<form>
				Hi Noah! My Name is
				<input type='text' placeholder="What's your name?" className={classes['name-field']} />.
        I absolutely love your voice! You can reach me by email at
				<input type='email' placeholder="What's your email?" className={classes['email-field']} />
        or give me a call at
				<input type='tel' placeholder="Phone number" className={classes['phone-field']} />.
				I can’t wait to talk with you! Thank you!
				<p>P.S. Here are some additional details...</p>
        <textarea placeholder="message" />
        <Button type='submit'>Send</Button>
			</form>
		</div>
	);
};

export default Contact;
