// @flow
import { isArray, isFunction, isString } from './is'
import { FANCY_PRIMITIVE, PRIMITIVE_CLASSNAME } from '../constants'

/**
 * Determines if a component is a primitive.
 *
 * @param   {string} component
 * @param   {array}  args
 * @returns {boolean}
 */
export const isPrimitiveComponent = (component: string, args: Array) => {
  return isString(component) && (isArray(args) || args === undefined)
}

/**
 * Magical function that achieves the destructured construction of CSS styles
 * a-la styled-components.
 *
 * @param   {string} component
 * @param   {array}  args
 * @param   {object} options
 * @param   {object} props
 * @returns {string}
 */
export const makePrimitiveStyles = (
  component: string,
  options: Object = {},
  args: Array | string
) => (props: Object) => {
  if (!isString(component)) return ''
  let styles

  if (isPrimitiveComponent(component, args)) {
    const amanda = args.map(a => (isFunction(a) ? a(props) : a))
    const [css, ...cssProps] = amanda

    const rules = [...css].slice(0, -1)
    const end = [...css].slice(-1)

    styles = rules
      .map((rule, index) => rule.trim() + cssProps[index])
      .join('')
      .concat(end)
  } else {
    styles = args
  }

  const className = options.className || PRIMITIVE_CLASSNAME

  return `.${className} {${styles}}`
}

// Creates the primitive CSS Rules for stylis
//
// @param   {string} component
// @param   {object} options
// @param   {array|function} arg
// @returns {string}
export const makePrimitiveCSSRules = (
  component: string,
  options: Object = {},
  args
) => {
  if (!isString(component)) return ''
  // Special handling in case the styles is a functional callback
  if (isFunction(args)) {
    const className = options.className || 'fancy'
    return props => `.${className} { ${args(props)}`
  } else {
    return makePrimitiveStyles(component, options, args)
  }
}
