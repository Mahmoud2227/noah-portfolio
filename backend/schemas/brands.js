import {IoShareSocial} from "react-icons/io5";

export default {
	name: "brand",
	title: "Brand",
	type: "document",
	icon:IoShareSocial,
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "icon",
			title: "Icon",
			type: "image",
		},
		{
			name: "url",
			title: "URL",
			type: "url",
		},
		{
			name: "type",
			title: "Type",
			type: "string",
			options: {
				list: ["music", "social"],
			},
		},
	],
};
