import {createClient} from "next-sanity";

export default createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: "production",
	apiVersion: "2022-08-07",
	token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
	useCdn: true,
	ignoreBrowserTokenWarning: true,
});
