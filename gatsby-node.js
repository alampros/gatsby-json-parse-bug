const path = require('path')

const pageTemplate = path.resolve('src/templates/SubPageTemplate.js')
const allJsonMetadata = require('./dummy-data.json')

exports.createPages = ({ boundActionCreators }) => {
  const { createPage } = boundActionCreators

  /**
   * Changing this to a higher number (>30) increases the likelihood of the error.
   */
  const howManyRecords = Math.min(
    parseInt(process.env.CREATE_PAGE_COUNT, 10) || 100,
    allJsonMetadata.length
  )

  console.log('\n\nCreating %d pages\n\n', howManyRecords)

  return Promise.all(allJsonMetadata.slice(0, howManyRecords).map(async itemMetadata => {
    const { id: itemId } = itemMetadata
    return createPage({
      path: `/fromjson/${itemId}/`,
      component: pageTemplate,
    })
  }))
}
