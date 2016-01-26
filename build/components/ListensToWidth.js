'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

/**
 * A simple HOC that provides facility for listening to container resizes.
 */

exports['default'] = function (ComposedComponent) {
  return (function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      var _this = this;

      _classCallCheck(this, _class);

      _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);

      this.onWindowResize = function () {
        _this.refs.child.onWidthChange(_reactDom2['default'].findDOMNode(_this).offsetWidth);
      };
    }

    _createClass(_class, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (!this.props.listenToWindowResize) return;
        window.addEventListener('resize', this.onWindowResize);
        // This is intentional. Once to properly set the breakpoint and resize the elements,
        // and again to compensate for any scrollbar that appeared because of the first step.
        this.onWindowResize();
        this.onWindowResize();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (!this.props.listenToWindowResize) return;
        window.removeEventListener('resize', this.onWindowResize);
      }

      /**
       * On window resize, update width of child by calling listener directly.
       * TODO: cleaner way to do this?
       */
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(ComposedComponent, _extends({}, this.props, { ref: 'child' }));
      }
    }], [{
      key: 'propTypes',
      value: {
        // This allows setting this on the server side
        initialWidth: _react.PropTypes.number,

        // If false, you should supply width yourself. Good if you want to debounce resize events
        // or reuse a handler from somewhere else.
        listenToWindowResize: _react.PropTypes.bool
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        initialWidth: 1280,
        listenToWindowResize: true
      },
      enumerable: true
    }]);

    return _class;
  })(_react.Component);
};

module.exports = exports['default'];