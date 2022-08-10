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
			name: "duration",
			title: "Duration",
			type: "string",
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
			name: "audio",
			title: "Audio",
			type: "file",
			options: {
				accept: "audio/*",
			},
		},
	],
};
