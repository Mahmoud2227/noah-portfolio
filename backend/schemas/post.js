export default {
	title: "Post",
	name: "post",
	type: "document",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "string",
		},
		{
			title: "Slug",
			name: "slug",
			type: "slug",
			options: {
				source: "title",
			},
		},
		{
			title: "Cover Image",
			name: "coverImage",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			title: "Body",
			name: "body",
			type: "array",
			of: [
				{
					type: "block",
					styles: [
						{title: "Paragraph", value: "normal"},
						{title: "Section header", value: "h2"},
						{title: "Section sub-header", value: "h3"},
						{title: "Quote", value: "blockquote"},
					],
				},
				{type: "image"},
			],
		},
	],
};
