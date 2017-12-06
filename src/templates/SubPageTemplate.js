import React from 'react'
import PropTypes from 'prop-types'

export default class SubPageTemplate extends React.Component {
  static propTypes = {
    pathContext: PropTypes.shape({
      itemId: PropTypes.string,
    }),
  }
  render() {
    const {
      itemId,
    } = this.props.pathContext
    return (
      <div>
        {itemId}
      </div>
    )
  }
}
