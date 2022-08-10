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
			name: "description",
			title: "Description",
			type: "text",
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
			title: "Songs",
			name: "songs",
			type: "array",
			of: [{type: "song"}],
		},
	],
};
