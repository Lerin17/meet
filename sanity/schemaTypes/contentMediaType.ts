import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const contentMediaType = defineType({
  name: 'contentMedia',
  title: 'Content Media',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'src',
      type: 'image',
      title: 'Media Source',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    }),
    defineField({
      name: 'caption',
      type: 'text',
      title: 'Caption',
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {list: ['image', 'video', 'audio', 'file']},
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'width',
      type: 'number',
      title: 'Width',
    }),
    defineField({
      name: 'height',
      type: 'number',
      title: 'Height',
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'src',
    },
  },
})
