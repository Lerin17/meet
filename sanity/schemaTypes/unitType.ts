import {defineArrayMember, defineField, defineType} from 'sanity'

export const unitType = defineType({
  name: 'unit',
  title: 'Unit',
  type: 'document',
  fields: [
    defineField({ name: 'unitId', title: 'Unit ID', type: 'string', validation: (rule) => rule.required() }),

    defineField({
      name: 'legacy',
      title: 'Legacy Info',
      type: 'object',
      fields: [
        defineField({
          name: 'source',
          title: 'Source',
          type: 'string',
          options: { list: [ { title: 'Manual', value: 'manual' }, { title: 'Imported', value: 'imported' } ] },
        }),
        defineField({ name: 'ingestionDate', title: 'Ingestion Date', type: 'date' }),
        defineField({
          name: 'confidence',
          title: 'Confidence',
          type: 'string',
          options: { list: [ { title: 'High', value: 'high' }, { title: 'Medium', value: 'medium' }, { title: 'Low', value: 'low' } ] },
        }),
      ],
    }),

    defineField({
      name: 'dataQuality',
      title: 'Data Quality',
      type: 'object',
      fields: [
        defineField({ name: 'missingFields', title: 'Missing Fields', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
      ],
    }),

    defineField({ name: 'excludedDates', title: 'Excluded Dates', type: 'array', of: [defineArrayMember({ type: 'date' })] }),
    defineField({ name: 'requiresReview', title: 'Requires Review', type: 'boolean' }),
    defineField({ name: 'notes', title: 'Notes', type: 'array', of: [defineArrayMember({ type: 'string' })] }),

    defineField({
      name: 'identity',
      title: 'Identity',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({
          name: 'buildingType',
          title: 'Building Type',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'code', title: 'Code', type: 'string' }),
                defineField({ name: 'label', title: 'Label', type: 'string' }),
              ],
            }),
          ],
        }),
        defineField({ name: 'numberOfBedrooms', title: 'Number Of Bedrooms', type: 'number' }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'object',
          fields: [
            defineField({ name: 'city', title: 'City', type: 'string' }),
            defineField({ name: 'district', title: 'District', type: 'string' }),
            defineField({ name: 'estate', title: 'Estate', type: 'string' }),
            defineField({ name: 'axis', title: 'Axis', type: 'string' }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'state',
      title: 'State',
      type: 'object',
      fields: [
        defineField({
          name: 'currentPhase',
          title: 'Current Phase',
          type: 'string',
          options: {
            list: [
              { title: 'Foundation', value: 'Foundation' },
              { title: 'DPC', value: 'DPC' },
              { title: 'Ground Floor', value: 'Ground_Floor' },
              { title: 'First Floor', value: 'First_Floor' },
              { title: 'Roofing', value: 'Roofing' },
              { title: 'Finishing', value: 'Finishing' },
              { title: 'Completed', value: 'Completed' },
              { title: 'Handover', value: 'Handover' },
            ],
          },
        }),
        defineField({ name: 'constructionStatus', title: 'Construction Status', type: 'string' }),
        defineField({ name: 'occupancyStatus', title: 'Occupancy Status', type: 'string' }),
        defineField({ name: 'lastUpdated', title: 'Last Updated', type: 'date' }),
        defineField({
          name: 'progress',
          title: 'Progress',
          type: 'object',
          fields: [
            defineField({ name: 'currentPhase', title: 'Current Phase', type: 'string' }),
            defineField({ name: 'ProgressValue', title: 'Progress Value', type: 'number' }),
            defineField({ name: 'overallProgressPercentage', title: 'Overall Progress %', type: 'number' }),
            defineField({ name: 'deliveryStop', title: 'Delivery Stop', type: 'string' }),
          ],
        }),
        defineField({ name: 'isCompleted', title: 'Is Completed', type: 'boolean' }),
        defineField({
          name: 'fundedStatus',
          title: 'Funded Status',
          type: 'string',
          options: { list: [ { title: 'Funded', value: 'funded' }, { title: 'Not Funded', value: 'not_funded' }, { title: 'Partially Funded', value: 'partially_funded' } ] },
        }),
        defineField({ name: 'lastUpdatedAt', title: 'Last Updated At', type: 'date' }),
        defineField({
          name: 'nextMilestone',
          title: 'Next Milestone',
          type: 'object',
          fields: [
            defineField({ name: 'milestoneName', title: 'Milestone Name', type: 'string' }),
            defineField({ name: 'expectedCompletionDate', title: 'Expected Completion Date', type: 'date' }),
          ],
        }),
        defineField({
          name: 'previousStates',
          title: 'Previous Weekly States',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'week', title: 'Week', type: 'string' }),
                defineField({ name: 'phaseName', title: 'Phase Name', type: 'string' }),
                defineField({ name: 'statusSummary', title: 'Status Summary', type: 'string' }),
                defineField({ name: 'progressPercentage', title: 'Progress Percentage', type: 'number' }),
                defineField({ name: 'comments', title: 'Comments', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'team',
          title: 'Team',
          type: 'object',
          fields: [
            defineField({ name: 'supervisingEngineer', title: 'Supervising Engineer', type: 'string' }),
            defineField({ name: 'projectManager', title: 'Project Manager', type: 'string' }),
            defineField({ name: 'siteSupervisor', title: 'Site Supervisor', type: 'string' }),
            defineField({ name: 'contractor', title: 'Contractor', type: 'string' }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'houses',
      title: 'Houses',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'houseCode', title: 'House Code', type: 'string' }),
            defineField({ name: 'buildingType', title: 'Building Type', type: 'string' }),
            defineField({ name: 'lastAction', title: 'Last Action', type: 'string' }),
            defineField({ name: 'currentProgress', title: 'Current Progress', type: 'number' }),
            defineField({ name: 'phase', title: 'Phase', type: 'string' }),
            defineField({ name: 'percentComplete', title: 'Percent Complete', type: 'number' }),
            defineField({ name: 'isCompleted', title: 'Is Completed', type: 'boolean' }),
            defineField({ name: 'deliveryStop', title: 'Delivery Stop', type: 'string' }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'date', title: 'Date', type: 'date' }),
            defineField({ name: 'details', title: 'Details', type: 'text' }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'risks',
      title: 'Risks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'level',
              title: 'Risk Level',
              type: 'string',
              options: { list: [ { title: 'Low', value: 'low' }, { title: 'Medium', value: 'medium' }, { title: 'High', value: 'high' } ] },
            }),
            defineField({ name: 'type', title: 'Type', type: 'string' }),
            defineField({ name: 'note', title: 'Note', type: 'text' }),
            defineField({ name: 'dateIdentified', title: 'Date Identified', type: 'date' }),
          ],
        }),
      ],
    }),
  ],
})
