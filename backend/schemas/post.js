export default {
	title: "Post",
  name: "post",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title"
      }
    },
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [{type: "block"},{type: "image"}],

    }
  ]
};
