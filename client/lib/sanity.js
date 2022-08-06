import sanityClient from "@sanity/client";

export default sanityClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: "production",
	apiVersion: "2022-08-7",
	token: process.env.SANITY_API_TOKEN,
});