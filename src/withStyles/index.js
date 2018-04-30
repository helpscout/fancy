import React, { Component } from 'react'
import Style from './Style'
import {
  getStyleTag,
  makeCSS,
  tokenize
} from './helpers'
import { getComponentName } from '../utilities/components'

export const ID = '__REACT_WITHSTYLES_TAG__'
export const MANAGER = {}

/**
 * HOC that renders specified CSS rules.
 *
 * @param   {object}
 * @param   {React.Component} - ComposedComponent
 * @returns {React.Component}
 */
const withStyles = (styles) => ComposedComponent => {
  const { id, CSSRules } = makeCSS(styles)

  class WithStylesComponent extends Component {
    componentDidMount () {
      if (!id || !CSSRules || hasStyle(id)) return

      const tagNode = getStyleTag()
      tagNode.innerHTML += tokenize(id, CSSRules)

      addStyleId(id)
    }

    render () {
      return (<ComposedComponent {...this.props} />)
    }
  }

  const name = getComponentName(ComposedComponent)

  WithStylesComponent.displayName = `withStyle(${name})`
  WithStylesComponent._withStylesId = id

  return WithStylesComponent
}

/**
 * Checks to the see if the styles have been previously added by ID.
 *
 * @param   {string} id
 * @returns {bool}
 */
export const hasStyle = (id) => !!MANAGER[id]

/**
 * Adds ID to mark that styles have been added.
 *
 * @param   {string} id
 * @returns {object}
 */
const addStyleId = (id) => {
  MANAGER[id] = true
  return MANAGER
}

/**
 * Removes an ID from the styles manager.
 *
 * @param   {string} id
 * @returns {undefined}
 */
export const removeStyleId = id => {
  MANAGER[id] = undefined
  return MANAGER
}

/**
 * Sub-components
 */
withStyles.Style = Style

export default withStyles
