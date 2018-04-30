'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeStyleId = exports.hasStyle = exports.MANAGER = exports.ID = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

var _helpers = require('./helpers');

var _components = require('../utilities/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ID = exports.ID = '__REACT_REACTOR_WITHSTYLES_TAG__';
var MANAGER = exports.MANAGER = {};

/**
 * HOC that renders specified CSS rules.
 *
 * @param   {object}
 * @param   {React.Component} - ComposedComponent
 * @returns {React.Component}
 */
var withStyles = function withStyles(styles) {
  return function (ComposedComponent) {
    var _makeCSS = (0, _helpers.makeCSS)(styles),
        id = _makeCSS.id,
        CSSRules = _makeCSS.CSSRules;

    var WithStylesComponent = function (_Component) {
      _inherits(WithStylesComponent, _Component);

      function WithStylesComponent() {
        _classCallCheck(this, WithStylesComponent);

        return _possibleConstructorReturn(this, (WithStylesComponent.__proto__ || Object.getPrototypeOf(WithStylesComponent)).apply(this, arguments));
      }

      _createClass(WithStylesComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (!id || !CSSRules || hasStyle(id)) return;

          var tagNode = (0, _helpers.getStyleTag)();
          tagNode.innerHTML += (0, _helpers.tokenize)(id, CSSRules);

          addStyleId(id);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(ComposedComponent, this.props);
        }
      }]);

      return WithStylesComponent;
    }(_react.Component);

    var name = (0, _components.getComponentName)(ComposedComponent);

    WithStylesComponent.displayName = 'withStyle(' + name + ')';
    WithStylesComponent._withStylesId = id;

    return WithStylesComponent;
  };
};

/**
 * Checks to the see if the styles have been previously added by ID.
 *
 * @param   {string} id
 * @returns {bool}
 */
var hasStyle = exports.hasStyle = function hasStyle(id) {
  return !!MANAGER[id];
};

/**
 * Adds ID to mark that styles have been added.
 *
 * @param   {string} id
 * @returns {object}
 */
var addStyleId = function addStyleId(id) {
  MANAGER[id] = true;
  return MANAGER;
};

/**
 * Removes an ID from the styles manager.
 *
 * @param   {string} id
 * @returns {undefined}
 */
var removeStyleId = exports.removeStyleId = function removeStyleId(id) {
  MANAGER[id] = undefined;
  return MANAGER;
};

/**
 * Sub-components
 */
withStyles.Style = _Style2.default;

exports.default = withStyles;