import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const projectMediaType = defineType({
  name: 'projectMedia',
  title: 'Project Media',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'reference',
      title: 'Title',
      description: 'Building/House name',
      to: [{type: 'house'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'buildingtype',
      type: 'array',
      title: 'Building Types',
      of: [defineArrayMember({type: 'string'})],
      description: 'Associated building types',
    }),
    defineField({
      name: 'media',
      type: 'array',
      title: 'Content Media',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'contentMedia'}],
        }),
      ],
    }),
    defineField({
      name: 'RawFiles',
      type: 'array',
      title: 'Raw Files',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'type', type: 'string', options: {list: ['revit', 'cad', 'sketchup', '3dsmax', 'other']}}),
            defineField({name: 'name', type: 'string'}),
            defineField({name: 'size', type: 'number'}),
            defineField({name: 'url', type: 'url'}),
            defineField({name: 'version', type: 'string'}),
            defineField({name: 'createdAt', type: 'datetime'}),
            defineField({name: 'updatedAt', type: 'datetime'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
