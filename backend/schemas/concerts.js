import {GiPartyPopper} from 'react-icons/gi';

export default {
	name: "concert",
	title: "Concert",
	type: "document",
	icon:GiPartyPopper,
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
			}
		},
		{
			name: "date",
			title: "Date",
			type: "datetime",
			options: {
				dateFormat: "YYYY-MM-DD",
				timeFormat: "hh:mm a",
				timeStep: 15,
			},
		},
		{
			name: "location",
			title: "Location",
			type: "string",
		},
		{
			name: "price",
			title: "Price",
			type: "number",
		},
		{
			name: "description",
			title: "Description",
			type: "text",
		},
		{
			name: "attendeesCount",
			title: "Attendees Count",
			type: "number",
			initialValue: 0,
		},
		{
			name: "cover",
			title: "Cover",
			type: "image",
			options: {
				hotspot: true,
			}
		},
		{
			name: "images",
			title: "Images",
			type: "array",
			of: [
				{
					type: "image",
					options: {
						hotspot: true,
					},
				},
			],
		},
	],
};
