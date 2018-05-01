import React, { Component } from 'react'
import Style from './Style'
import {
  getStyleTag,
  makeCSS,
  tokenize
} from './helpers'
import { getComponentName } from '../utilities/components'

export const ID = '__REACT_REACTOR_STYLES__'
export const MANAGER = {}

/**
 * HOC that renders specified CSS rules.
 *
 * @param   {object}
 * @param   {React.Component} - Composed
 * @returns {React.Component}
 */
const withStyles = (styles) => Composed => {
  const { id, CSSRules } = makeCSS(styles)

  class WithStylesComponent extends Component {
    componentDidMount () {
      if (!id || !CSSRules || hasStyle(id)) return

      const cssStyles = generateStyles({ id, props: this.props, CSSRules })
      const tagNode = getStyleTag()
      tagNode.innerHTML += cssStyles

      addStyle(id, cssStyles)
    }

    componentDidUpdate (prevProps) {
      /**
       * Tested in Enzyme, but difficult to set up Istanbul to report.
       */
      /* istanbul ignore next */
      if (prevProps === this.props) return

      const prevStyles = getStyle(id)
      /**
       * Cannot really tested in Enzyme, as there is always styles whe a
       * component is initialized. This is a fail-safe guard.
       */
      /* istanbul ignore next */
      if (!prevStyles) return

      const nextStyles = generateStyles({ id, props: this.props, CSSRules })
      if (prevStyles === nextStyles) return

      const tagNode = getStyleTag()
      tagNode.innerHTML = tagNode.innerHTML.replace(prevStyles, nextStyles)

      addStyle(id, nextStyles)
    }

    render () {
      return (<Composed {...this.props} />)
    }
  }

  const name = getComponentName(Composed)

  WithStylesComponent.displayName = `withStyle(${getComponentName(Composed)})`
  WithStylesComponent._withStylesId = id

  return WithStylesComponent
}

/**
 * Creates the tokenized styles based.
 */
export const generateStyles = ({id, props, CSSRules}) => {
  const parsedCSSRules = typeof CSSRules === 'function' ?
    CSSRules(props) : CSSRules

  return tokenize(id, parsedCSSRules)
}


/**
 * Retrieves the cached styles based on id.
 *
 * @param   {string} id
 * @returns {bool}
 */
export const getStyle = (id) => MANAGER[id]


/**
 * Checks to the see if the styles have been previously added by ID.
 *
 * @param   {string} id
 * @returns {bool}
 */
export const hasStyle = (id) => !!getStyle(id)


/**
 * Adds ID to mark that styles have been added.
 *
 * @param   {string} id
 * @returns {object}
 */
const addStyle = (id, styles) => {
  MANAGER[id] = styles
  return MANAGER
}


/**
 * Removes an ID from the styles manager.
 *
 * @param   {string} id
 * @returns {undefined}
 */
export const removeStyle = id => {
  MANAGER[id] = undefined
  return MANAGER
}


/**
 * Sub-components
 */
withStyles.Style = Style

export default withStyles
