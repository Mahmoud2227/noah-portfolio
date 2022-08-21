import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta
					name='description'
					content="Noah is a Latino artist from Wisconsin who loves to rap and sing! He'll drop the occasional bop to dance to, but he tends to be more in depth with his music. His lyrics always tell a story, and paint a vivid picture for the listener to imagine. He touches on topics from love, life, depression, positive vibes and so much more. His story of how he got to where he is now is one of the most respectable. From humble beginnings, becoming a dad 11 days after turning 15 years old, parents from two different worlds, and growing up in 'the bad' part of the city... but through it all, he remains loyal, humble, and hungry for more! As real as they come, Noah is known for giving back to the commuinty, and keeping it 100 always. The dream is there, the talent is on point, now he's taking his shot! Don't sleep too long on him though, his name is growing, and fast!"
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Lobster&family=Roboto+Serif:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&family=Varela+Round&display=swap'
					rel='stylesheet'></link>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
