// @flow
import Stylis from 'stylis'
import ruleParserPlugin from './ruleParserPlugin'
import { uuid } from '../utilities/id'
import { decodeStylisRules } from '../utilities/classNames'

const stylis = new Stylis()
stylis.use([ruleParserPlugin])

const initialState = {
  _cssRules: {},
  _id: 0,
  _styles: {},
  _scope: '',
  _theme: {},
}

function StyleSheet() {
  let state = initialState

  function addRule(id, styles) {
    state._cssRules[id] = styles
  }

  function getRule(id) {
    return state._cssRules[id]
  }

  function hasRule(id) {
    return !!getRule(id)
  }

  function removeRule(id) {
    delete state._cssRules[id]
  }

  function makeRule(CSSRules) {
    state._id = state._id + 1
    return { id: state._id, CSSRules, uuid: uuid() }
  }

  function updateScope(scope) {
    state._scope = scope
    return state._scope
  }

  function updateTheme(theme) {
    state._theme = theme
    return state._theme
  }

  function getCSSRules() {
    return state._cssRules
  }

  function getId() {
    return state._id
  }

  function getScope() {
    return state._scope
  }

  function getStyles() {
    return state._styles
  }

  function getTheme() {
    return state._theme
  }

  function __getState() {
    return state
  }

  function __dangerouslyResetStyleSheet() {
    state = initialState
    // Force reset
    state._cssRules = {}
  }

  /**
   * Adds the unique selectors to state._styles.
   *
   * @param   {string} id
   * @param   {string} selectors
   * @returns {string}
   */
  function addStyles(id: string, selectors: string) {
    if (!state._styles[id]) {
      state._styles[id] = selectors
    }

    return state._styles[id]
  }

  /**
   * Generates the tokenized rule and unique selectors.
   *
   * @param   {string} id
   * @param   {object} props
   * @param   {string} CSSRules
   * @param   {string} scope
   * @param   {string} uuid
   * @returns {string} object
   */
  function makeStyles({ id, props, CSSRules, scope, uuid }) {
    const parsedCSSRules =
      typeof CSSRules !== 'string'
        ? CSSRules({ ...props, theme: state._theme })
        : CSSRules

    const enhancedScope = state._scope ? state._scope : scope || ''
    const styles = tokenize(
      stylis(enhancedScope, parsedCSSRules),
      uuid,
      id,
      enhancedScope
    )

    return {
      selectors: addStyles(id, styles.selectors),
      rule: styles.rule,
    }
  }

  return {
    addRule,
    getRule,
    hasRule,
    removeRule,
    updateScope,
    updateTheme,
    makeRule,
    addStyles,
    makeStyles,
    getCSSRules,
    getId,
    getScope,
    getStyles,
    getTheme,
    __getState,
    __dangerouslyResetStyleSheet,
  }
}

/**
 * Renders the CSSRule with tokenized with the unique ID.
 *
 * @param   {string} cssRules
 * @param   {string} uuid
 * @param   {string} id
 * @returns {string}
 */
export function tokenize(
  cssRules: string,
  uuid: string,
  id: string,
  scope: string
) {
  /**
   * Decode and add unique classNames to rule
   */
  const block = decodeStylisRules(cssRules, uuid, id, scope)

  return {
    rule: `/* ${id} */\n${block.map(b => b.rule).join('')}\n`,
    selectors: block.map(b => b.selector).filter(b => b.name),
  }
}

export default StyleSheet
