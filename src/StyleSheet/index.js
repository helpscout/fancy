import Stylis from 'stylis'
import ruleParserPlugin from './ruleParserPlugin'
import { uuid } from '../utilities/id'
import { decodeStylisRules } from '../utilities/classNames'

const stylis = new Stylis()
stylis.use([ruleParserPlugin])

function StyleSheet () {
  let cssRules = {}
  let _id = 0

  function addRule (id, styles) {
    cssRules[id] = styles
  }

  function getRule (id) {
    return cssRules[id]
  }

  function hasRule (id) {
    return !!getRule(id)
  }

  function removeRule (id) {
    delete cssRules[id]
  }

  function makeRule (CSSRules) {
    _id = _id + 1
    return { id: _id, CSSRules, uuid: uuid() }
  }

  function makeStyles ({id, props, CSSRules, scope, uuid}) {
    const parsedCSSRules = typeof CSSRules === 'string'
      ? CSSRules : CSSRules(props)

    return tokenize(stylis((scope || ''), parsedCSSRules), uuid, id)
  }

  return {
    addRule,
    getRule,
    hasRule,
    removeRule,
    makeRule,
    makeStyles,
    cssRules,
    id: _id
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
export function tokenize (cssRules, uuid, id) {
  /**
   * Decode and add unique classNames to rule
   */
  const block = decodeStylisRules(cssRules, uuid, id)

  return {
    rule: `/* ${id} */\n${block.map(b => b.rule).join('')}\n`,
    selectors: block.map(b => b.selector).filter(b => b.name)
  }
}

export default StyleSheet
