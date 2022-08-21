import Image from "next/image";
import imageUrlFor from "../utils/imageUrlFor";

import Testimonials from "../components/Testimonials/Testimonials";
import sanity from "../lib/sanity";

import classes from "../styles/About.module.scss";

const about = ({testimonials, aboutData}) => {
	return (
		<main className={classes.body + " section__padding"}>
			<h1>About Me</h1>
			<div className={classes.biography}>
				<div className={classes["image-container"]}>
					<div className={classes.image}>
						<Image
							src={imageUrlFor(aboutData.aboutImage).url()}
							width={300}
							height={450}
							objectFit='contain'
						/>
					</div>
				</div>
				<div className={classes.content}>
					<h2 className="gradient-text">Biography</h2>
					<p>{aboutData.biography}</p>
				</div>
			</div>
      <div className={classes.testimonials}>
        <h2 className="gradient-text">Testimonials</h2>
			<Testimonials testimonials={testimonials} />
      </div>
		</main>
	);
};

export default about;

export const getStaticProps = async () => {
	const query = `{
    "testimonials":*[_type == "testimonials"][0...5],
    "aboutData":*[_type == "siteSettings"][0]{aboutImage,biography}
  }`;
	const {testimonials, aboutData} = await sanity.fetch(query);

	return {
		props: {
			testimonials,
			aboutData,
		},
		revalidate: 3600,
	};
};
