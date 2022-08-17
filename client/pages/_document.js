import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta name='description' content='Noah Portfolio' />
				<link
					href='https://fonts.googleapis.com/css2?family=Lobster&family=Roboto+Serif:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&family=Varela+Round&display=swap'
					rel='stylesheet'></link>
			</Head>
			<body>
				<Main />
				<div id='canvas'></div>
				<NextScript />
			</body>
		</Html>
	);
}
