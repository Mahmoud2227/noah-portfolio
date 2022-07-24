export default {
  name: "song",
  title: "Song",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: 'audio',
      title: 'Audio',
      type: 'file',
      options: {
        accept: 'audio/*',
      }
    },
    {
      name: "album",
      title: 'Album',
      type: 'reference',
      to: [{ type: 'album' }],
    }
  ]
}