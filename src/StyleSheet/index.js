import Stylis from 'stylis'

const stylis = new Stylis()

const makeStyleSheet = () => {
  const state = {
    id: 0,
    CSSRules: {}
  }

  const addRule = (id, styles) => {
    state.CSSRules[id] = styles
  }

  const getRule = (id) => {
    return state.CSSRules[id]
  }

  const hasRule = (id) => {
    return !!getRule(id)
  }

  const removeRule = (id) => {
    delete state.CSSRules[id]
  }

  const makeRule = (CSSRules) => {
    state.id = state.id + 1
    return { id: state.id, CSSRules }
  }

  const makeStyles = (props) => {
    return generateStyles(props)
  }

  return {
    addRule,
    getRule,
    hasRule,
    removeRule,
    makeRule,
    makeStyles,
    CSSRules: state.CSSRules
  }
}

/**
 * Creates the tokenized styles based.
 */
export const generateStyles = ({id, props, CSSRules, scope}) => {
  const parsedCSSRules = typeof CSSRules === 'function'
    ? CSSRules(props) : CSSRules

  const styles = stylis((scope || ''), parsedCSSRules)
  return tokenize(id, styles)
}

/**
 * Renders the CSSRule with tokenized with the unique ID.
 *
 * @param   {string} id
 * @param   {string} CSSRules
 * @returns {string}
 */
export const tokenize = (id, CSSRules) => `/* ${id} */\n${CSSRules.trim()}\n`

export default makeStyleSheet
