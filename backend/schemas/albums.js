export default {
	name: "album",
	title: "Album",
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
				dateFormat: "YYYY",
				altFormat: "YYYY",
				fromNow: true,
				toNow: true,
				display: "input",
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
			title: "Songs",
			name: "songs",
			type: "array",
			of: [{type: "song"}],
		},
	],
};
