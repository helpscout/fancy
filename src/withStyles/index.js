import React, { Component } from 'react'
import Style from './Style'
import {
  getStyleTag
} from './helpers'
import { getComponentName } from '../utilities/components'
import makeStyleSheet from '../StyleSheet'

export const STYLESHEET = makeStyleSheet()

/**
 * HOC that renders specified CSS rules.
 *
 * @param   {object}
 * @param   {React.Component} - Composed
 * @returns {React.Component}
 */
const withStyles = (styles) => Composed => {
  const { id, CSSRules } = STYLESHEET.makeRule(styles)

  class WithStylesComponent extends Component {
    constructor (props) {
      super(props)
      this.styleSheet = STYLESHEET
    }

    componentDidMount () {
      if (!id || !CSSRules || this.styleSheet.hasRule(id)) return

      const cssStyles = this.styleSheet.makeStyles({ id, props: this.props, CSSRules })
      const tagNode = getStyleTag()
      tagNode.innerHTML += cssStyles

      this.styleSheet.addRule(id, cssStyles)
    }

    componentDidUpdate (prevProps) {
      /**
       * Tested in Enzyme, but difficult to set up Istanbul to report.
       */
      /* istanbul ignore next */
      if (prevProps === this.props) return

      const prevStyles = this.styleSheet.getRule(id)
      /**
       * Cannot really tested in Enzyme, as there is always styles whe a
       * component is initialized. This is a fail-safe guard.
       */
      /* istanbul ignore next */
      if (!prevStyles) return

      const nextStyles = this.styleSheet.makeStyles({ id, props: this.props, CSSRules })
      if (prevStyles === nextStyles) return

      const tagNode = getStyleTag()
      tagNode.innerHTML = tagNode.innerHTML.replace(prevStyles, nextStyles)

      this.styleSheet.addRule(id, nextStyles)
    }

    render () {
      return (<Composed {...this.props} />)
    }
  }

  WithStylesComponent.displayName = `withStyle(${getComponentName(Composed)})`
  WithStylesComponent._withStylesId = id
  WithStylesComponent._styleSheet = STYLESHEET

  return WithStylesComponent
}
/**
 * Sub-components
 */
withStyles.Style = Style
withStyles.StyleSheet = STYLESHEET

export default withStyles
