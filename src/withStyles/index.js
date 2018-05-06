import React, { Component } from 'react'
import Style from './Style'
import { getStyleTag } from '../utilities/styleTag'
import { getComponentName } from '../utilities/components'
import StyleSheet from '../StyleSheet/index'

export const STYLESHEET = new StyleSheet()

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
const withStyles = (styles = '', options = defaultOptions) => Composed => {
  const { id, CSSRules, uuid } = STYLESHEET.makeRule(styles)

  class WithStylesComponent extends Component {
    constructor (props) {
      super(props)
      this.state = options
      this.styleSheet = STYLESHEET
      this.tagNode = null
      this.styles = {}
    }

    componentWillMount () {
      if (!this.shouldUpdateCSSRules()) return
      this.makeStyles().selectors
        .map(({name, className}) => {
          this.styles[name] = className
        })
    }

    componentDidMount () {
      if (!this.shouldUpdateCSSRules()) return

      const cssStyles = this.makeStyles().rule
      /**
       * We're retrieving the tagNode during the componentDidMount cycle to
       * allow for the getTagNode method to find custom <style> placements.
       *
       * Note: This may change (and be deprecated) with the recent addition
       * of auto-iFrame handling.
       */
      const tagNode = this.getTagNode()
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

      const nextStyles = this.makeStyles().rule
      /**
       * (Virtual) CSS diffing
       */
      if (prevStyles === nextStyles) return
      /**
       * DOM <style> updating
       * Reasoning for not assigning the <style> node to the StyleSheet
       * instance. There may be a chance that the <style> tag may be unmounted
       * (e.g. attached within an iFrame). By doing dynamic (and relatively
       * cheap) DOM checks, we avoid having to worry about memory/GC.
       *
       * Note: This my change in the future.
       */
      const tagNode = this.getTagNode()
      tagNode.innerHTML = tagNode.innerHTML.replace(prevStyles, nextStyles)
      /**
       * Update (virtual) CSS rule
       */
      this.styleSheet.addRule(id, nextStyles)
    }

    /**
     * Determines if CSS rules should be adjusted.
     *
     * @return {bool}
     */
    shouldUpdateCSSRules () {
      return (id && CSSRules && !this.styleSheet.hasRule(id))
    }

    /**
     * Retrieves and internally sets the <style> tag node.
     *
     * @return {NodeElement}
     */
    getTagNode () {
      if (this.tagNode) return this.tagNode
      this.tagNode = getStyleTag(this)

      return this.tagNode
    }

    /**
     * Creates the CSS rules.
     *
     * @return {object} { rule: *string*, selectors: *array* }
     */
    makeStyles () {
      return this.styleSheet.makeStyles({
        CSSRules,
        id,
        props: this.props,
        scope: this.state.scope,
        uuid
      })
    }

    render () {
      return (<Composed {...this.props} styles={this.styles} />)
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
