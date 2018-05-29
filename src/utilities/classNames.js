import { DELIMETER, SEP } from '../constants/stylis'
import { has, hasMany } from './strings'

export const SCOPE_TOKEN = '/*00*/'

/**
 * Returns an array of classNames prepped for React.
 *
 * @param   {array} classes
 * @returns {string}
 */
export const classNames = (...classes) => {
  return classes.filter(name => name && typeof name !== 'boolean').join(' ')
}

/**
 * Determines if a selector is a className.
 *
 * @param   {string} selector
 * @returns {bool}
 */
export const isClassName = selector => selector && selector.charAt(0) === '.'

/**
 * Factory function to generate unique className for first className within
 * selector rule.
 *
 * @param   {string} uuid
 * @param   {string} id
 * @returns {string}
 */
export const makeUniqFirstClassName = (uuid, id) => (item, index) => {
  return index === 0 ? `${item}__${uuid}-${id}` : item
}

/**
 * Gets the base selector from a selector sequence.
 *
 * @param   {string} selector
 * @returns {string}
 */
export const getBaseSelector = selector => {
  return selector.split(/ |:|_|-/gi)[0].trim()
}

/**
 * Splits a selector into individual rules.
 *
 * @param   {string} rule
 * @param   {string} token
 * @returns {array}
 */
export const getPreCompileSelectors = (rule, token) => {
  return rule
    .split(token)
    .filter(r => r)
    .map(r => r.trim())
}

/**
 * Compiles cssRules from token points.
 *
 * @param   {string} rule
 * @param   {string} token
 * @param   {function} compiler
 * @returns {string}
 */
export const compileRule = (
  rule,
  token,
  compiler,
  prefix = '',
  suffix = ''
) => {
  const selectors = getPreCompileSelectors(rule, token)
  return prefix + selectors.map(compiler).join(token) + suffix
}

/**
 * Creates a unique namespaced className selector.
 *
 * @param   {string} selector
 * @param   {string} uuid
 * @param   {string} id
 * @returns {string}
 */
export const makeUniqClassName = (selector, uuid, id) => {
  const generateClassName = makeUniqFirstClassName(uuid, id)

  const generate = (item, index) => {
    let className = generateClassName(item, index)

    if (index === 0) {
      if (hasMany(item, /\./)) {
        className = compileRule(item, '.', generateClassName, '.')
      }
      if (has(item, ':')) {
        className = compileRule(item, ':', generateClassName)
      }
      if (has(item, ',')) {
        className = compileRule(item, ',', generateClassName, '', ',')
      }
    }

    return className
  }

  return compileRule(selector, ' ', generate)
}

/**
 * Creates a unique namespaced className selector for combinator rules.
 *
 * @param   {string} combinator
 * @param   {string} selector
 * @param   {string} uuid
 * @param   {string} id
 * @returns {string}
 */
export const makeUniqSelectorForCombinator = (
  combinator,
  selector,
  uuid,
  id
) => {
  const selectors = getPreCompileSelectors(selector, combinator)
  const compiler = (s, index) => {
    const base = getBaseSelector(s)
    if (index > 0 && base !== selectors[0]) return s
    return makeUniqClassName(s, uuid, id)
  }

  return compileRule(selector, combinator, compiler)
}

/**
 * Creates the uniq selector from a cssRule.
 *
 * @param   {string} selector
 * @param   {string} uuid
 * @param   {string} id
 * @returns {string}
 */
export const makeUniqSelector = (selector, uuid, id) => {
  if (!isClassName(selector)) return selector
  let newSelector = makeUniqClassName(selector, uuid, id)
  /**
   * Combinator based rules
   * https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_selectors
   */
  /* Sibling (+) */
  if (selector.indexOf('+') >= 0) {
    newSelector = makeUniqSelectorForCombinator('+', selector, uuid, id)
    /* Sibling (~) */
  } else if (selector.indexOf('~') >= 0) {
    newSelector = makeUniqSelectorForCombinator('~', selector, uuid, id)
  }

  return newSelector
}

/**
 * Enhances the CSS rule by adding a new (uniq) selector.
 *
 * @param   {string} rule
 * @param   {string} selector
 * @param   {string} scope
 * @returns {string}
 */
export const makeRuleFromStylis = (
  rule,
  selector = '',
  uniqSelector = '',
  scope = ''
) => {
  if (!selector) return rule

  const scopelessSelector = selector.replace(scope, '').trim()
  if (!isClassName(scopelessSelector)) return rule

  const parsedSelector = uniqSelector.replace(SCOPE_TOKEN, scope)
  return rule.replace(selector, parsedSelector)
}

/**
 * Decodes the stylis rules (with seps/delimeters), and enhances the defined
 * rules with unique namespaced CSS rules, if applicable.
 *
 * @param   {string} cssRules
 * @param   {string} uuid
 * @param   {string} id
 * @returns {string}
 */
export const decodeStylisRules = (
  cssRules,
  uuid,
  id,
  /* istanbul ignore next */
  scope = ''
) => {
  return cssRules.split(DELIMETER).map(cssRule => {
    /**
     * Extract values from (parsed) stylis output
     */
    const values = cssRule.split(SEP)
    const selector = values[1]
    const initialRule = values[0]
    const scopelessSelector = selector
      ? scope
        ? selector.replace(`${scope} `, '')
        : selector
      : selector
    const isClass = isClassName(scopelessSelector)

    const uniqSelector = makeUniqSelector(scopelessSelector, uuid, id)
    const tokenedUniqSelector = `${SCOPE_TOKEN} ${uniqSelector}`

    return {
      selector: {
        name: isClass ? scopelessSelector.substring(1) : selector,
        className: isClass ? uniqSelector.substring(1) : selector,
      },
      rule: makeRuleFromStylis(
        initialRule,
        selector,
        tokenedUniqSelector,
        scope
      ),
    }
  })
}
