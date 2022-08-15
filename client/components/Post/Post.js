import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import ImageUrlFor from "../../utils/imageUrlFor";
import {FcCalendar, FcClock} from "react-icons/fc";
import getTimeDiff from "../../utils/getTimeDiff";

import classes from "./post.module.scss";

const Post = ({post}) => {
	const PublishedDate = getTimeDiff(new Date(post._createdAt));

	return (
		<article className={classes.body}>
			<Link href={`/blog/${post.slug.current}`}>
				<a className={classes["cover-container"]} title={post.title}>
					<Image src={ImageUrlFor(post.coverImage).url()} layout='fill' objectFit='cover' />
				</a>
			</Link>
			<div className={classes.content}>
				<Link href={`/blog/${post.slug.current}`}>
					<a title={post.title}>
						<h2>{post.title}</h2>
					</a>
				</Link>
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
				</div>
				<PortableText value={post.body[0]} />
			</div>
		</article>
	);
};

export default Post;
