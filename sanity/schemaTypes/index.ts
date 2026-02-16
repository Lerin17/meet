import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {houseType} from './houseType'
import {unitType} from './unitType'
import {projectMediaType} from './projectMediaType'
import {contentMediaType} from './contentMediaType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, houseType, unitType, projectMediaType, contentMediaType],
}
