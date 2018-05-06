import Stylis from 'stylis'
import ruleParserPlugin from './ruleParserPlugin'
import { uuid } from '../utilities/id'
import { decodeStylisRules } from '../utilities/classNames'

const stylis = new Stylis()
stylis.use([ruleParserPlugin])

class StyleSheet {
  constructor () {
    this.cssRules = {}
    this._id = 0

    this.addRule = this.addRule.bind(this)
    this.getRule = this.getRule.bind(this)
    this.hasRule = this.hasRule.bind(this)
    this.makeRule = this.makeRule.bind(this)
    this.removeRule = this.removeRule.bind(this)
  }

  addRule (id, styles) {
    this.cssRules[id] = styles
  }

  getRule (id) {
    return this.cssRules[id]
  }

  hasRule (id) {
    return !!this.getRule(id)
  }

  removeRule (id) {
    delete this.cssRules[id]
  }

  makeRule (CSSRules) {
    this._id = this._id + 1
    return { id: this._id, CSSRules, uuid: uuid() }
  }

  makeStyles (props) {
    return generateStyles(props)
  }
}

/**
 * Creates the tokenized styles based.
 * @param   {object} props
 * @returns {string}
 */
export const generateStyles = ({id, props, CSSRules, scope, uuid}) => {
  const parsedCSSRules = typeof CSSRules === 'function'
    ? CSSRules(props) : CSSRules

  const styles = stylis((scope || ''), parsedCSSRules)
  return tokenize(styles, uuid, id)
}

/**
 * Renders the CSSRule with tokenized with the unique ID.
 *
 * @param   {string} cssRules
 * @param   {string} uuid
 * @param   {string} id
 * @returns {string}
 */
export const tokenize = (cssRules, uuid, id) => {
  /**
   * Decode and add unique classNames to rule
   */
  const block = decodeStylisRules(cssRules, uuid, id)
  /**
   * Stringifying the CSS Rule (only)
   */
  const rule = block.map(b => b.rule).join('')
  /**
   * Mapping the new UUID classNames (only)
   */
  const selectors = block.map(b => b.selector).filter(b => b.name)

  return {
    rule: `/* ${id} */\n${rule}\n`,
    selectors
  }
}

export default StyleSheet
