// @flow
import React, { Component } from 'react'
import Style from './Style'
import { FANCY_PRIMITIVE, ELEMENT_TAGS_LIST } from '../constants'
import { classNames } from '../utilities/classNames'
import { isArray, isFunction, isString } from '../utilities/is'
import { getStyleTag } from '../utilities/styleTag'
import { getComponentName } from '../utilities/components'
import {
  isPrimitiveComponent,
  makeInterpolatedCSSRules,
  shouldInterpolateStyles,
} from '../utilities/primitives'
import { STYLESHEET as StyleSheet } from '../ThemeProvider/index'

export const STYLESHEET = StyleSheet

const styled = (Composed, composedProps) => (
  styles = '',
  options = { scope: '' }
) => {
  const { id, CSSRules, uuid } = STYLESHEET.makeRule(styles)

  class StyledComponent extends Component {
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
      if (isString(CSSRules)) return
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
      return this.styleSheet.makeStyles({
        CSSRules,
        id,
        props: this.props,
        scope: this.state.scope,
        uuid,
      })
    }

    render() {
      const { theme, ...rest } = this.props
      const props = {
        ...composedProps,
        ...rest,
      }
      const className = classNames(this.styles.fancy, this.props.className)

      return isString(Composed) ? (
        React.createElement(Composed, {
          ...props,
          className,
        })
      ) : options[FANCY_PRIMITIVE] ? (
        <Composed {...props} className={className} />
      ) : (
        <Composed {...props} styles={this.styles} />
      )
    }
  }

  StyledComponent.displayName = `styled(${getComponentName(Composed)})`
  StyledComponent._styleId = id
  StyledComponent._styleSheet = STYLESHEET

  return StyledComponent
}

/**
 * Creates the Fancy styled component.
 *
 * @param   {React.Component | string} component
 * @param   {any} args
 * @returns {React.Component}
 */
export const makeStyled = (component, componentOptions = {}) => (...args) => {
  const [styleArg, ...otherArgs] = args
  let cssRules = styleArg
  let options = otherArgs[0]

  // Interpolation Check
  if (shouldInterpolateStyles(styleArg)) {
    options = { ...componentOptions }
    options[FANCY_PRIMITIVE] = true

    cssRules = makeInterpolatedCSSRules(component, args, componentOptions)
  }
  // Special case Primitive
  else if (isString(component) && isFunction(styleArg)) {
    options = { ...componentOptions }
    options[FANCY_PRIMITIVE] = true

    cssRules = makeInterpolatedCSSRules(component, styleArg, componentOptions)
  }

  return styled(component)(cssRules, options)
}

/**
 * Sub-components
 */
makeStyled.Style = Style
makeStyled.StyleSheet = STYLESHEET

// Generate primatives
ELEMENT_TAGS_LIST.forEach(tag => (makeStyled[tag] = makeStyled(tag)))

export default makeStyled
