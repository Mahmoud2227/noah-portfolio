export default {
	name: "brand",
	title: "Brand",
	type: "document",
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
