/**
 * Returns the displayName/Name of a given component.
 *
 * @param   {object} React.Component
 * @returns {string}
 */
export const getComponentName = (Component = {}) => (
  Component.displayName ||
  Component.name ||
  'Component'
)

/**
 * Attempts to return the mounted node, based on React's internals.
 * Currently works on React v15.
 *
 * @param   {object} React.Component
 * @returns {NodeElement}
 */
export const fastGetReactDOMNode = (Component) => (
  Component &&
  Component._reactInternalInstance &&
  Component._reactInternalInstance._renderedComponent &&
  Component._reactInternalInstance._renderedComponent._hostNode
)

/**
 * Gets the closest document Node.
 *
 * @param   {object} React.Component
 * @returns {NodeElement}
 */
export const getClosestDocument = Component => {
  const node = fastGetReactDOMNode(Component)
  return node ? node.ownerDocument : document
}
