'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * withStyle <style> component
 *
 * @returns {React.Component}
 */
var Style = function Style(props) {
  return _react2.default.createElement('style', { id: _index.ID, type: 'text/css' });
};

exports.default = Style;