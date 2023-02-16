import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name:"Name",
      type:"string",
      title:"Restaurant Name",
      validation: (Rule)=>Rule.required(),
    },
    {
      name:"short_description",
      type:"string",
      title:"Short description",
      validation: (Rule)=>Rule.max(200),
    },
    {
      name:"image",
      type:"image",
      title:"Restaurant Image",
    },
    {
      name:"lat",
      type:"number",
      title:"Latitude of the restaurant",
    },
    {
      name:"long",
      type:"number",
      title:"Longtitude of the restaurant",
    },
    {
      name:"address",
      type:"string",
      title:"Restaurant Address",
      validation: (Rule)=>Rule.required(),
    },
    {
      name:"rating",
      type:"number",
      title:"Rating (from1-5 stars)",
      validation: (Rule)=>Rule.required().min(1).max(5).error("Please enter a value between 1-5"),
    },
    {
      name:"type",
      title:"Category",
      validation: (Rule)=>Rule.required(),
      type:"reference",
      to:[{type:"category"}]
    },
    {
      name:"dishes",
      title:"Dishes",
      validation: (Rule)=>Rule.required(),
      type:"array",
      of:[{type:"reference",to:[{type:"dish"}]}]
    },
  ]
})
