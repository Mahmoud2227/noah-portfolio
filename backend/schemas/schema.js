// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import testimonials from './testimonials'
import songs from './songs'
import albums from './albums'
import singles from './singles';
import brands from './brands'
import concerts from './concerts';
import post from './post';
import siteSettings from './siteSettings';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    siteSettings,
    testimonials,
    albums,
    singles,
    songs,
    concerts,
    post,
    brands,
  ]),
})
