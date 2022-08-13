import {useState, useEffect} from "react";
import Button from "../../components/UI/Button/Button";

import Post from "../../components/Post/Post";
import sanity from "../../lib/sanity";

import classes from "../../styles/Blog.module.scss";

const index = ({posts, postsLength}) => {
	const [postsList, setPostsList] = useState(posts);
	const [pagination, setPagination] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getPosts = async (index) => {
			setLoading(true);
			const query = `*[_type == "post"] | order(_createdAt desc)[0...${index * 5}]{
        ...,
        "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      }`;
			const result = await sanity.fetch(query);
			setPostsList(result);
			setLoading(false);
		};

		getPosts(pagination);
	}, [pagination]);

	return (
		<div className={classes.body + " section__padding"}>
			<h1 className='gradient-text'>Blog</h1>
			<div className={classes.posts}>
				{postsList.map((post) => (
					<Post post={post} key={post._id} />
				))}
			</div>
			{pagination * 5 < postsLength && (
				<Button onClick={() => setPagination((prevState) => prevState + 1)}>
					{loading ? "Loading..." : "Load More"}
				</Button>
			)}
		</div>
	);
};

export default index;

export const getStaticProps = async () => {
	const query = `{
  "posts":*[_type == 'post'] | order(_createdAt desc)[0...5]{
      ...,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    },
    "postsLength": count(*[_type == 'post'])
  }`;
	const result = await sanity.fetch(query);
	return {
		props: {
			posts: result.posts,
			postsLength: result.postsLength,
		},
	};
};
