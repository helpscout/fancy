import { DELIMETER, SEP } from '../constants/stylis'

/**
 * Identifies and transforms individual cssRules for parsing.
 *
 * @param   {*} * (All from stylis)
 * @returns {string}
 */
const ruleParserPlugin = (
  context,
  content,
  selectors,
  parents,
  line,
  column,
  length,
  ns,
  depth,
  at
) => {
  switch (context) {
    // selector
    case 2:
      if (ns === 0) {
        return transformRule(selectors, content)
      }
      break
    // at-rule
    case 3:
      switch (ns) {
        default:
          return transformRule(parents, content)
      }
  }
}

/**
 * Prepares cssRule for parsing by passing in split tokens.
 *
 * @param   {string} selector
 * @param   {string} content
 * @returns {string}
 */
const transformRule = (selector, content) => {
  return content + SEP + selector + SEP + DELIMETER
}

export default ruleParserPlugin
