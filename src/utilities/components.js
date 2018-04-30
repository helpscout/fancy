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
