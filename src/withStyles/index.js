import React, { Component } from 'react'
import Style from './Style'
import {
  getStyleTag
} from '../utilities/styleTag'
import { getComponentName } from '../utilities/components'
import makeStyleSheet from '../StyleSheet/index'

export const STYLESHEET = makeStyleSheet()

const defaultOptions = {
  scope: ''
}

/**
 * HOC that renders specified CSS rules.
 *
 * @param   {object}
 * @param   {React.Component} - Composed
 * @returns {React.Component}
 */
const withStyles = (styles, options = defaultOptions) => Composed => {
  const { id, CSSRules } = STYLESHEET.makeRule(styles)

  class WithStylesComponent extends Component {
    constructor (props) {
      super(props)
      this.state = options
      this.styleSheet = STYLESHEET
    }

    componentDidMount () {
      if (!id || !CSSRules || this.styleSheet.hasRule(id)) return

      const cssStyles = this.makeStyles()
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

      const nextStyles = this.makeStyles()
      if (prevStyles === nextStyles) return

      const tagNode = getStyleTag()
      tagNode.innerHTML = tagNode.innerHTML.replace(prevStyles, nextStyles)

      this.styleSheet.addRule(id, nextStyles)
    }

    makeStyles () {
      return this.styleSheet.makeStyles({
        CSSRules,
        id,
        props: this.props,
        scope: this.state.scope
      })
    }

    render () {
      return (<Composed {...this.props} />)
    }
  }

  WithStylesComponent.displayName = `withStyle(${getComponentName(Composed)})`
  WithStylesComponent._FancyStyleId = id
  WithStylesComponent._FancyStyleSheet = STYLESHEET

  return WithStylesComponent
}
/**
 * Sub-components
 */
withStyles.Style = Style
withStyles.StyleSheet = STYLESHEET

export default withStyles
