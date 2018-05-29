// @flow
import React, { Component } from 'react'
import Style from './Style'
import { getStyleTag } from '../utilities/styleTag'
import { getComponentName } from '../utilities/components'
import { STYLESHEET as StyleSheet } from '../ThemeProvider/index'

export const FANCY_PRIMATIVE = '__IS_FANCY_PRIMATIVE__'
export const STYLESHEET = StyleSheet

const styled = Composed => (styles = '', options = { scope: '' }) => {
  const { id, CSSRules, uuid } = STYLESHEET.makeRule(styles)

  class WithStylesComponent extends Component {
    constructor(props) {
      super(props)
      this.state = options
      this.styleSheet = STYLESHEET
      this.tagNode = null
      this.styles = {}

      this.setStyles()
    }

    componentDidMount() {
      this.addRule()
    }

    componentDidUpdate(prevProps) {
      this.maybeUpdateRule(prevProps)
    }

    /**
     * Adds the CSS Rule to the <style> tag node.
     */
    addRule() {
      if (!id || !CSSRules || this.styleSheet.hasRule(id)) return

      const cssStyles = this.makeStyles().rule
      /**
       * We're retrieving the tagNode during the componentDidMount cycle to
       * allow for the getTagNode method to find custom <style> placements.
       *
       * Note: This may change (and be deprecated) with the recent addition
       * of auto-iFrame handling.
       */
      this.getTagNode().innerHTML += cssStyles

      this.styleSheet.addRule(id, cssStyles)
    }

    /**
     * Updates CSS Rule based on prop changes, if applicable.
     */
    maybeUpdateRule(prevProps) {
      /**
       * No need to update if the rule is static. This guard is to help
       * with performance.
       */
      if (typeof CSSRules === 'string') return
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
     * Retrieves and internally sets the <style> tag node.
     *
     * @return {NodeElement}
     */
    getTagNode() {
      if (this.tagNode) return this.tagNode
      this.tagNode = getStyleTag(this)

      return this.tagNode
    }

    /**
     * Sets the initial style classNames.
     */
    setStyles() {
      this.makeStyles().selectors.map(({ name, className }) => {
        this.styles[name] = className
      })
    }

    /**
     * Creates the CSS rules.
     *
     * @return {object} { rule: *string*, selectors: *array* }
     */
    makeStyles() {
      const isPrimative = options[FANCY_PRIMATIVE]

      return this.styleSheet.makeStyles({
        CSSRules: isPrimative ? CSSRules(this.props) : CSSRules,
        id,
        props: this.props,
        scope: this.state.scope,
        uuid,
      })
    }

    render() {
      return typeof Composed === 'string' ? (
        React.createElement(Composed, {
          ...this.props,
          className: [this.styles.fancy, this.props.className].join(' '),
        })
      ) : (
        <Composed {...this.props} styles={this.styles} />
      )
    }
  }

  WithStylesComponent.displayName = `styled(${getComponentName(Composed)})`
  WithStylesComponent._styleId = id
  WithStylesComponent._styleSheet = STYLESHEET

  return WithStylesComponent
}

/**
 * Determines if a component is a primative.
 *
 * @param   {string} component
 * @param   {array}  args
 * @returns {boolean}
 */
const isPrimativeComponent = (component: string, args: Array) => {
  return (
    typeof component === 'string' && (Array.isArray(args) || args === undefined)
  )
}

/**
 * Magical function that achieves the destructured construction of CSS styles
 * a-la styled-components.
 *
 * @param   {string} component
 * @param   {array}  args
 * @param   {object} props
 * @returns {string}
 */
export const makePrimativeStyles = (component: string, args: Array) => (
  props: Object
) => {
  if (!isPrimativeComponent(component, args)) return ''

  const amanda = args.map(a => (typeof a === 'function' ? a(props) : a))
  const [css, ...cssProps] = amanda

  const rules = [...css].slice(0, -1)
  const end = [...css].slice(-1)

  const styles = rules
    .map((rule, index) => rule.trim() + cssProps[index])
    .join('')
    .concat(end)

  return `.fancy {${styles}}`
}

/**
 * Creates the Fancy styled component.
 *
 * @param   {React.Component | string} component
 * @param   {any} args
 * @returns {React.Component}
 */
export const makeStyled = component => {
  return (...args) => {
    const [styleArg, ...otherArgs] = args
    let cssRules
    let styledArgs

    if (isPrimativeComponent(component, styleArg)) {
      cssRules = makePrimativeStyles(component, args)
      styledArgs = {}
      styledArgs[FANCY_PRIMATIVE] = true
    } else {
      cssRules = styleArg
      styledArgs = otherArgs[1]
    }

    return styled(component)(cssRules, styledArgs)
  }
}

/**
 * Sub-components
 */
makeStyled.Style = Style
makeStyled.StyleSheet = STYLESHEET

export default makeStyled
