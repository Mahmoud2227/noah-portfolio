import {useState} from "react";
import {useForm} from "react-hook-form";
import emailjs from "@emailjs/browser";
import {MdError} from "react-icons/md";

import Button from "../UI/Button/Button";

import classes from "./contact.module.scss";

const Contact = () => {
	const {register, handleSubmit, formState} = useForm({mode: "onSubmit", defaultValues: ""});
	const {errors, isValid} = formState;

	const [emailState, setEmailState] = useState({sent: null, error: false});

	const onSubmitHandler = async (data) => {
		if (!isValid) {
			return;
		}
		const templateId = data.message
			? process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID_WITHMESSAGE
			: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID_WITHOUTMESSAGE;
		try {
			setEmailState({sent: false, error: false});
			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
				templateId,
				data,
				process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
			);
			setEmailState({sent: true, error: false});
		} catch (error) {
			setEmailState({sent: false, error: true});
		}
	};

	return (
		<div className={classes.body + " section__padding"}>
			<h1 className='gradient-text'>Contact Noah</h1>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				Hi Noah! My Name is
				<input
					type='text'
					placeholder="What's your name?"
					className={`${classes["name-field"]} ${errors.from_name ? classes.error : ""}`}
					{...register("from_name", {
						required: true,
						pattern: /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/,
					})}
				/>
				. I absolutely love your voice! You can reach me by email at
				<input
					type='email'
					placeholder="What's your email?"
					className={`${classes["email-field"]} ${errors.email ? classes.error : ""}`}
					{...register("email", {
						required: true,
						pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i,
					})}
				/>
				or give me a call at
				<input
					type='tel'
					placeholder='Phone number'
					className={`${classes["phone-field"]} ${errors["phone_number"] ? classes.error : ""}`}
					{...register("phone_number", {
						required: true,
						pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
					})}
				/>
				. I can’t wait to talk with you! Thank you!
				<p>P.S. Here are some additional details...</p>
				<textarea placeholder='message' {...register("message")} />
				<Button type='submit' disabled={emailState.sent}>
					{emailState.sent === false && !emailState.error && <span className={classes.spinner} />}
					{!emailState.error &&
						(emailState.sent === true ? "Sent!" : emailState.sent === null ? "Send" : "")}
					{emailState.error && <MdError className={classes.errorIcon} style={{color:"red",fontSize:"40px"}} />}
				</Button>
			</form>
		</div>
	);
};

export default Contact;
