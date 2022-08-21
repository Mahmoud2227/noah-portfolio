import Testimonials from "../components/Testimonials/Testimonials";
import sanity from "../lib/sanity";

import classes from "../styles/About.module.scss";

const about = ({testimonials}) => {
	return (
		<div className={classes.body + " section__padding"}>
			<Testimonials testimonials={testimonials} />
		</div>
	);
};

export default about;

export const getStaticProps = async () => {
  const query = `*[_type == "testimonials"][0...5]`;
  const testimonials = await sanity.fetch(query);

  return {
    props: {
      testimonials,
    },
    revalidate: 3600,
  }
}