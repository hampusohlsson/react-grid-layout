'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _responsiveUtils = require('./responsiveUtils');

var _ReactGridLayout = require('./ReactGridLayout');

var _ReactGridLayout2 = _interopRequireDefault(_ReactGridLayout);

var _componentsListensToWidth = require('./components/ListensToWidth');

var _componentsListensToWidth2 = _interopRequireDefault(_componentsListensToWidth);

// Types

// End Types

/**
 * A wrapper around ReactGridLayout to support responsive breakpoints.
 */

var ResponsiveReactGridLayout = (function (_React$Component) {
  _inherits(ResponsiveReactGridLayout, _React$Component);

  _createClass(ResponsiveReactGridLayout, null, [{
    key: 'propTypes',

    // mixins: [PureDeepRenderMixin, WidthListeningMixin], // FIXME

    value: {
      //
      // Basic props
      //

      // Optional, but if you are managing width yourself you may want to set the breakpoint
      // yourself as well.
      breakpoint: _react2['default'].PropTypes.string,

      // {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
      breakpoints: _react2['default'].PropTypes.object,

      // # of cols. This is a breakpoint -> cols map
      cols: _react2['default'].PropTypes.object,

      // layouts is an object mapping breakpoints to layouts.
      // e.g. {lg: Layout, md: Layout, ...}
      layouts: function layouts(props, propName, _componentName) {
        _react2['default'].PropTypes.object.isRequired.apply(this, arguments);

        var layouts = props.layouts;
        Object.keys(layouts).map(function (k) {
          (0, _utils.validateLayout)(layouts[k], 'layouts.' + k);
        });
      },

      //
      // Callbacks
      //

      // Calls back with breakpoint and new # cols
      onBreakpointChange: _react2['default'].PropTypes.func,

      // Callback so you can save the layout.
      // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
      onLayoutChange: _react2['default'].PropTypes.func,

      // Calls back with (containerWidth, margin, cols)
      onWidthChange: _react2['default'].PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      layouts: {},
      onBreakpointChange: function onBreakpointChange() {},
      onLayoutChange: function onLayoutChange() {},
      onWidthChange: function onWidthChange() {}
    },
    enumerable: true
  }]);

  function ResponsiveReactGridLayout(props) {
    var _this = this;

    _classCallCheck(this, ResponsiveReactGridLayout);

    _get(Object.getPrototypeOf(ResponsiveReactGridLayout.prototype), 'constructor', this).call(this, props);

    this.onLayoutChange = function (layout) {
      _this.state.layouts[_this.state.breakpoint] = layout;
      _this.setState({ layout: layout, layouts: _this.state.layouts });
      _this.props.onLayoutChange(layout, _this.state.layouts);
    };

    this.onWidthChange = function (width) {
      // Set new breakpoint
      var newState = {
        width: width,
        breakpoint: _this.props.breakpoint || (0, _responsiveUtils.getBreakpointFromWidth)(_this.props.breakpoints, width)
      };
      newState.cols = (0, _responsiveUtils.getColsFromBreakpoint)(newState.breakpoint, _this.props.cols);

      // Breakpoint change
      if (newState.cols !== _this.state.cols) {

        // Store the current layout
        newState.layouts = _this.state.layouts;
        newState.layouts[_this.state.breakpoint] = JSON.parse(JSON.stringify(_this.state.layout));

        // Find or generate a new one.
        newState.layout = (0, _responsiveUtils.findOrGenerateResponsiveLayout)(newState.layouts, _this.props.breakpoints, newState.breakpoint, _this.state.breakpoint, newState.cols, _this.props.verticalLayout);

        // This adds missing items.
        newState.layout = (0, _utils.synchronizeLayoutWithChildren)(newState.layout, _this.props.children, newState.cols, _this.props.verticalCompact);

        // Store this new layout as well.
        newState.layouts[newState.breakpoint] = newState.layout;

        _this.props.onBreakpointChange(newState.breakpoint, newState.cols);
      }

      _this.props.onWidthChange(width, _this.props.margin, newState.cols);
      _this.setState(newState);
    };

    var breakpoint = this.props.breakpoint || (0, _responsiveUtils.getBreakpointFromWidth)(this.props.breakpoints, this.props.initialWidth);
    var cols = (0, _responsiveUtils.getColsFromBreakpoint)(breakpoint, this.props.cols);

    // Get the initial layout. This can tricky; we try to generate one however possible if one doesn't exist
    // for this layout.
    var initialLayout = (0, _responsiveUtils.findOrGenerateResponsiveLayout)(this.props.layouts, this.props.breakpoints, breakpoint, breakpoint, cols, this.props.verticalCompact);

    this.state = {
      layout: initialLayout,
      // storage for layouts obsoleted by breakpoints
      layouts: this.props.layouts || {},
      breakpoint: breakpoint,
      cols: cols,
      width: this.props.initialWidth
    };
  }

  // FIXME reconcile Flow types & PropTypes

  _createClass(ResponsiveReactGridLayout, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // This allows you to set the width manually if you like.
      // Use manual width changes in combination with `listenToWindowResize: false`
      if (nextProps.width) this.onWidthChange(nextProps.width);

      // Allow parent to set breakpoint directly.
      if (nextProps.breakpoint !== this.props.breakpoint) {
        this.onWidthChange(this.state.width);
      }

      // Allow parent to set layouts directly.
      if (nextProps.layouts && nextProps.layouts !== this.state.layouts) {
        // Since we're setting an entirely new layout object, we must generate a new responsive layout
        // if one does not exist.
        var newLayout = (0, _responsiveUtils.findOrGenerateResponsiveLayout)(nextProps.layouts, nextProps.breakpoints, this.state.breakpoint, this.state.breakpoint, this.state.cols, this.props.verticalLayout);

        this.setState({
          layouts: nextProps.layouts,
          layout: newLayout
        });
      }
    }

    /**
     * Bubble this up, add `layouts` object.
     * @param  {Array} layout Layout from inner Grid.
     */
  }, {
    key: 'render',
    value: function render() {
      // Don't pass responsive props to RGL.
      /*eslint no-redeclare: 0*/ // bug?
      var _props = this.props;
      var layouts = _props.layouts;
      var onBreakpointChange = _props.onBreakpointChange;
      var breakpoints = _props.breakpoints;

      var props = _objectWithoutProperties(_props, ['layouts', 'onBreakpointChange', 'breakpoints']);

      return _react2['default'].createElement(
        _ReactGridLayout2['default'],
        _extends({}, props, {
          layout: this.state.layout,
          cols: this.state.cols,
          listenToWindowResize: false,
          onLayoutChange: this.onLayoutChange,
          width: this.state.width }),
        this.props.children
      );
    }
  }]);

  return ResponsiveReactGridLayout;
})(_react2['default'].Component);

ResponsiveReactGridLayout.displayName = 'ResponsiveReactGridLayout';
exports['default'] = (0, _componentsListensToWidth2['default'])(ResponsiveReactGridLayout);
module.exports = exports['default'];

/**
 * When the width changes work through breakpoints and reset state with the new width & breakpoint.
 * Width changes are necessary to figure out the widget widths.
 */