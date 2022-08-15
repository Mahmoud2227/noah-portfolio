import Contact from "../components/Contact/Contact";
import sanity from "../lib/sanity";
import imageUrlFor from "../utils/imageUrlFor";

import BrandLogo from "../components/UI/BrandLogo/BrandLogo";

import classes from "../styles/Contact.module.scss";

const ContactPage = ({brands}) => {
  return (
		<main className={classes.body + " section__padding"}>
			<div className={classes.info}>
				<h1>SEND ME A MESSAGE</h1>
				<p>
					Alienum phaedrum torquatos nec eu, vis detraxit ertssa periculiser ex, nihil lab etendis
					in mei. Meis an pericula es euripidis, hinces partem ei est eos ei nisl eu graecis, ixenss
					strud exercitation ullamco aperiri. Torquatos nec eu, vis detraxit ertssa periculiser ex,
					nihil lab etendis.
				</p>
				<div className={classes["brands-container"]}>
					{brands.map((brand) => (
						<BrandLogo
							key={brand._key}
							icon={imageUrlFor(brand.icon).url()}
							href={brand.url}
							size='35px'
							title={brand.title}
						/>
					))}
				</div>
			</div>
			<Contact />
		</main>
	);
}

export default ContactPage;

export const getStaticProps = async () => {
  const query = `*[_type == 'brand' && type == 'social']{title,url,icon,"id":_id}`;
  const brands = await sanity.fetch(query);
  return {
    props: {
      brands,
    },
    revalidate: 3600,
  };
}