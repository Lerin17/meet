import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const houseType = defineType({
  name: 'house',
  title: 'House',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'houseName',
      title: 'House Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'noBedrooms',
      title: 'Number of Bedrooms',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'noGuestBedrooms',
      title: 'Number of Guest Bedrooms',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'maidroom',
      title: 'Has Maid Room',
      type: 'boolean',
    }),
    defineField({
      name: 'codeName',
      title: 'Code Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'floors',
      title: 'Floors',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'floor',
          fields: [
            defineField({
              name: 'floorLevel',
              title: 'Floor Level',
              type: 'string',
              options: {
                list: [
                  { title: 'Ground Floor', value: 'groundfloor' },
                  { title: 'First Floor', value: 'firstfloor' },
                  { title: 'Second Floor', value: 'secondfloor' },
                  { title: 'Third Floor', value: 'thirdfloor' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'noofBedroom',
              title: 'Number of Bedrooms',
              type: 'number',
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: 'floorArea',
              title: 'Floor Area (sqm)',
              type: 'number',
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: 'noofWindows',
              title: 'Number of Windows',
              type: 'number',
            }),
            defineField({
              name: 'noofDoors',
              title: 'Number of Doors',
              type: 'number',
            }),
            defineField({
              name: 'bedrooms',
              title: 'Bedrooms',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'bedroom',
                  fields: [
                    defineField({
                      name: 'bedroomTitle',
                      title: 'Bedroom Title',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'floorArea',
                      title: 'Floor Area (sqm)',
                      type: 'number',
                      validation: (rule) => rule.required().min(0),
                    }),
                    defineField({
                      name: 'noofWindows',
                      title: 'Number of Windows',
                      type: 'number',
                      validation: (rule) => rule.required().min(0),
                    }),
                    defineField({
                      name: 'noBathroom',
                      title: 'Number of Bathrooms',
                      type: 'number',
                      validation: (rule) => rule.required().min(0),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'assets',
      title: 'Assets',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
         
            defineField({
              name: 'type',
              type: 'string',
              title: 'Asset Type',
              initialValue: 'image',
              readOnly: true,
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
      ],
    }),
  ],
})