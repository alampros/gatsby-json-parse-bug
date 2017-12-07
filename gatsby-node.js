const path = require('path')

const pageTemplate = path.resolve('src/templates/SubPageTemplate.js')
const allJsonMetadata = require('./dummy-data.json')

exports.createPages = ({ boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const howManyRecords = 100 // <-- change this to 10 and it works fine

  return Promise.all(allJsonMetadata.slice(0, howManyRecords).map(async itemMetadata => {
    const { id: itemId } = itemMetadata
    return createPage({
      path: `/fromjson/${itemId}/`,
      component: pageTemplate,
    })
  }))
}
