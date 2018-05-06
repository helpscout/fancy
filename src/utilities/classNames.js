import {
  DELIMETER,
  SEP
} from '../constants/stylis'

/**
 * Returns an array of classNames prepped for React.
 *
 * @param   {array} classes
 * @returns {string}
 */
export const classNames = (...classes) => {
  return classes
    .filter(name => name && typeof name !== 'boolean')
    .join(' ')
}

/**
 * Determines if a selector is a className.
 *
 * @param   {string} selector
 * @returns {bool}
 */
export const isClassName = selector => selector && selector.charAt(0) === '.'

/**
 * Creates a unique namespaced className selector.
 *
 * @param   {string} selector
 * @param   {string} uuid
 * @param   {string} id
 * @returns {string}
 */
export const makeUniqClassName = (selector, uuid, id) => {
  return selector.split(':')
    .map((s, index) => index === 0 ? `${s}__${uuid}-${id}` : s)
    .join(':')
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
export const makeUniqSelectorForCombinator = (combinator, selector, uuid, id) => {
  return selector
    .split(combinator)
    .map(s => makeUniqClassName(s.trim(), uuid, id))
    .join(combinator)
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
 * @param   {string} newSelector
 * @returns {string}
 */
export const makeRuleFromStylis = (rule, selector, uniqSelector) => {
  if (!isClassName(selector)) return rule

  return rule.replace(selector, `${selector}, ${uniqSelector}`)
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
export const decodeStylisRules = (cssRules, uuid, id) => {
  return cssRules.split(DELIMETER).map(cssRule => {
    /**
     * Extract values from (parsed) stylis output
     */
    const values = cssRule.split(SEP)
    const selector = values[1]
    const initialRule = values[0]
    const isClass = isClassName(selector)

    const uniqSelector = makeUniqSelector(selector, uuid, id)

    return {
      selector: {
        name: isClass ? selector.substring(1) : selector,
        className: isClass ? uniqSelector.substring(1) : selector
      },
      rule: makeRuleFromStylis(initialRule, selector, uniqSelector)
    }
  })
}
