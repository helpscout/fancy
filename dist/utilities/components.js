'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns the displayName/Name of a given component.
 *
 * @param   {object} React.Component
 * @returns {string}
 */
var getComponentName = exports.getComponentName = function getComponentName() {
  var Component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Component.displayName || Component.name || 'Component';
};