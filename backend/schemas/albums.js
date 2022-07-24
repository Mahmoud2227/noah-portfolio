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
      }
    }
  ]
}