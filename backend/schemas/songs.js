export default {
	name: "song",
	title: "Song",
	type: "object",
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
			name: "audio",
			title: "Audio",
			type: "file",
			options: {
				accept: "audio/*",
			},
		},
	],
};
