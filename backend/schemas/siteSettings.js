export default {
	name: "siteSettings",
	title: "Settings",
	type: "document",
	__experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
	groups: [
		{
			name: "home",
			title: "Home",
			default: true,
		},
		{
			name: "about",
			title: "About",
		},
		{
			name: "music",
			title: "Music",
		},
		{
			name: "colors",
			title: "Colors",
		},
	],
	fields: [
		{
			name: "homeBackground",
			title: "Home Background",
			type: "image",
			group: "home",
			options: {
				hotspot: true,
			},
		},
		{
			name: "saying1",
			title: "Saying 1",
			type: "string",
			group: "home",
		},
		{
			name: "saying2",
			title: "Saying 2",
			type: "string",
			group: "home",
		},
		{
			name: "aboutImage",
			title: "About Image",
			type: "image",
			group: "about",
		},
		{
			name: "biography",
			title: "Biography",
			type: "text",
			group: "about",
		},
		{
			name: "albumsBackground",
			title: "Albums Background",
			type: "image",
			group: "music",
			options: {
				hotspot: true,
			},
		},
		{
			name: "singlesBackground",
			title: "Singles Background",
			type: "image",
			group: "music",
			options: {
				hotspot: true,
			},
		},
		{
			name: "color1",
			title: "Color 1",
			type: "color",
			group: "colors",
		},
		{
			name: "color2",
			title: "Color 2",
			type: "color",
			group: "colors",
		},
		{
			name: "color3",
			title: "Color 3",
			type: "color",
			group: "colors",
		},
	],
};
