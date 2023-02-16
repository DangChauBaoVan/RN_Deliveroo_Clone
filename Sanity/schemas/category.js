import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Menu Category',
  type: 'document',
  fields: [
    {
      name:"name",
      type:"string",
      title:"Category Name",
      validation: (Rule)=>Rule.required(),
    },
    {
      name:"image",
      type:"image",
      title:"Category Image"
    },
  ],
})