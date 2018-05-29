/**
 * Returns the displayName/Name of a given component.
 *
 * @param   {object} React.Component
 * @returns {string}
 */
export const getComponentName = (Component = {}) =>
  Component.displayName || Component.name || 'Component'

/**
 * Attempts to return the document node, based on React's internals.
 * Currently works on React v15.
 *
 * @param   {object} React.Component
 * @returns {NodeElement}
 */
export const fastGetReactDOMDocument = Component =>
  Component &&
  Component._reactInternalInstance &&
  Component._reactInternalInstance._context &&
  Component._reactInternalInstance._context.document

/**
 * Gets the closest document Node.
 *
 * @param   {object} React.Component
 * @returns {NodeElement}
 */
export const getClosestDocument = Component => {
  return fastGetReactDOMDocument(Component) || document
}
