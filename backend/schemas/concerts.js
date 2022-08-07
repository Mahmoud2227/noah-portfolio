export default {
  name:"concert",
  title: 'Concert',
  type:'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',

    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'h:mm a',
        timeStep:15
      }
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'attendeesCount',
      title: 'Attendees Count',
      type: "number",
      initialValue: 0,
      readOnly: true
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        options: {
          hotspot: true,
        }
      }]
    }
  ]
}