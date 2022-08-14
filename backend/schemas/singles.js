export default {
	name: "single",
	title: "Single",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		},
		{
			name: "releaseDate",
			title: "Release Date",
			type: "date",
			options: {
				dateFormat: "MMMM Do, YYYY",
			},
		},
		{
			name: "cover",
			title: "Cover",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "musicBrands",
			title: "Music Brands",
			type: "array",
			of: [
				{
					type: "object",
					title: "Brand",
					fields: [
						{name: "title", title: "Title", type: "string"},
						{name: "url", title: "URL", type: "url"},
						{name: "icon", title: "Icon", type: "image"},
					],
				},
			],
		},
		{
			name: "audio",
			title: "Audio",
			type: "file",
			options: {
				accept: "audio/*",
			},
		},
	],
};
