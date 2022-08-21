import Head from "next/head";
import Image from "next/image";
import {PortableText} from "@portabletext/react";
import sanity from "../../lib/sanity";
import ImageUrlFor from "../../utils/imageUrlFor";
import getTimeDiff from "../../utils/getTimeDiff";
import {FcCalendar, FcClock, FcBusinessman} from "react-icons/fc";

import classes from "../../styles/BlogPost.module.scss";

const myPortableTextComponents = {
	types: {
		image: ({value}) => (
			<div className={classes["image-container"]}>
				<Image
					src={ImageUrlFor(value.asset).url()}
					width={850}
					height={600}
					objectFit='scale-down'
				/>
			</div>
		),
	},
};

const BlogPost = ({post}) => {
	const PublishedDate = getTimeDiff(new Date(post._createdAt));
	return (
		<>
			<Head>
				<title>{post.title} | Noah Estrada</title>
			</Head>
			<main className={classes.body + " section__padding"}>
				<h1>{post.title}</h1>
				<div className={classes.meta}>
					<div>
						<FcCalendar />
						{PublishedDate.year > 0
							? `${PublishedDate.year} years ago`
							: PublishedDate.month > 0
							? `${PublishedDate.month} months ago`
							: PublishedDate.days === 0
							? "Today"
							: `${PublishedDate.days} days ago`}
					</div>
					<div>
						<FcClock />
						{post.estimatedReadingTime + " min read"}
					</div>
					<div>
						<FcBusinessman /> By Noah
					</div>
				</div>
				<div className={classes["cover-container"]}>
					<Image
						src={ImageUrlFor(post.coverImage).url()}
						width={1100}
						height={500}
						objectFit='cover'
					/>
				</div>
				<div className={classes.content}>
					<PortableText value={post.body} components={myPortableTextComponents} />
				</div>
			</main>
		</>
	);
};
export default BlogPost;

export const getStaticPaths = async () => {
	const query = `*[_type == 'post']{slug}`;
	const result = await sanity.fetch(query);
	const paths = result.map((post) => ({
		params: {
			slug: post.slug.current,
		},
	}));
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async (context) => {
	const query = `*[_type == "post" && slug.current == "${context.params.slug}"][0]{
    ...,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  }`;
	const post = await sanity.fetch(query);
	return {
		props: {
			post,
		},
		revalidate: 1800,
	};
};
