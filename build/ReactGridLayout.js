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

var _GridItem = require('./GridItem');

var _GridItem2 = _interopRequireDefault(_GridItem);

var _componentsListensToWidth = require('./components/ListensToWidth');

var _componentsListensToWidth2 = _interopRequireDefault(_componentsListensToWidth);

// Types

// End Types

/**
 * A reactive, fluid grid layout with draggable, resizable components.
 */

var ReactGridLayout = (function (_React$Component) {
  _inherits(ReactGridLayout, _React$Component);

  function ReactGridLayout() {
    var _this = this;

    _classCallCheck(this, ReactGridLayout);

    _get(Object.getPrototypeOf(ReactGridLayout.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      activeDrag: null,
      isMounted: false,
      layout: (0, _utils.synchronizeLayoutWithChildren)(this.props.layout, this.props.children, this.props.cols, this.props.verticalCompact),
      width: this.props.initialWidth,
      oldDragItem: null,
      oldResizeItem: null
    };

    this.onWidthChange = function (width) {
      _this.setState({ width: width });
    };

    this.onDragStart = function (i, x, y, _ref) {
      var e = _ref.e;
      var element = _ref.element;

      var layout = _this.state.layout;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;

      _this.setState({ oldDragItem: (0, _utils.clone)(l) });

      _this.props.onDragStart(layout, l, l, null, e, element);
    };

    this.onDrag = function (i, x, y, _ref2) {
      var e = _ref2.e;
      var element = _ref2.element;

      var layout = _this.state.layout;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;
      var oldL = _this.state.oldDragItem;

      // Create placeholder (display only)
      var placeholder = {
        w: l.w, h: l.h, x: l.x, y: l.y, placeholder: true, i: i
      };

      // Move the element to the dragged location.
      layout = (0, _utils.moveElement)(layout, l, x, y, true /* isUserAction */);

      _this.props.onDrag(layout, oldL, l, placeholder, e, element);

      _this.setState({
        layout: (0, _utils.compact)(layout, _this.props.verticalCompact),
        activeDrag: placeholder
      });
    };

    this.onDragStop = function (i, x, y, _ref3) {
      var e = _ref3.e;
      var element = _ref3.element;

      var layout = _this.state.layout;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;
      var oldL = _this.state.oldDragItem;

      // Move the element here
      layout = (0, _utils.moveElement)(layout, l, x, y, true /* isUserAction */);

      _this.props.onDragStop(layout, oldL, l, null, e, element);

      // Set state
      _this.setState({
        layout: (0, _utils.compact)(layout, _this.props.verticalCompact),
        activeDrag: null,
        oldDragItem: null
      });
    };

    this.onResizeStart = function (i, w, h, _ref4) {
      var e = _ref4.e;
      var element = _ref4.element;

      var layout = _this.state.layout;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;

      _this.setState({ oldResizeItem: (0, _utils.clone)(l) });

      _this.props.onResizeStart(layout, l, l, null, e, element);
    };

    this.onResize = function (i, w, h, _ref5) {
      var e = _ref5.e;
      var element = _ref5.element;

      var layout = _this.state.layout;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;
      var oldL = _this.state.oldResizeItem;

      // Set new width and height.
      l.w = w;
      l.h = h;

      // Create placeholder element (display only)
      var placeholder = {
        w: w, h: h, x: l.x, y: l.y, placeholder: true, i: i
      };

      _this.props.onResize(layout, oldL, l, placeholder, e, element);

      // Re-compact the layout and set the drag placeholder.
      _this.setState({ layout: (0, _utils.compact)(layout, _this.props.verticalCompact), activeDrag: placeholder });
    };

    this.onResizeStop = function (i, w, h, _ref6) {
      var e = _ref6.e;
      var element = _ref6.element;

      var layout = _this.state.layout;
      var l = (0, _utils.getLayoutItem)(layout, i);
      var oldL = _this.state.oldResizeItem;

      _this.props.onResizeStop(layout, oldL, l, null, e, element);

      _this.setState({
        layout: (0, _utils.compact)(layout, _this.props.verticalCompact),
        activeDrag: null,
        oldResizeItem: null
      });
    };
  }

  _createClass(ReactGridLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Call back with layout on mount. This should be done after correcting the layout width
      // to ensure we don't rerender with the wrong width.
      this.props.onLayoutChange(this.state.layout);
      this.setState({ isMounted: true });
    }

    // FIXME would like to reconcile propTypes & flow, but we want propTypes for consumers of this module
    // (they might not be using Flow), and I don't want to duplicate a typedef & propTypes
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // This allows you to set the width manually if you like.
      // Use manual width changes in combination with `listenToWindowResize: false`
      if (nextProps.width !== this.props.width) this.onWidthChange(nextProps.width);

      // If children change, regenerate the layout.
      if (nextProps.children.length !== this.props.children.length) {
        this.setState({
          layout: (0, _utils.synchronizeLayoutWithChildren)(this.state.layout, nextProps.children, nextProps.cols, this.props.verticalCompact)
        });
      }

      // Allow parent to set layout directly.
      if (nextProps.layout && JSON.stringify(nextProps.layout) !== JSON.stringify(this.state.layout)) {
        this.setState({
          layout: (0, _utils.synchronizeLayoutWithChildren)(nextProps.layout, nextProps.children, nextProps.cols, this.props.verticalCompact)
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // Call back so we can store the layout
      // Do it only when a resize/drag is not active, otherwise there are way too many callbacks
      if (this.state.layout !== prevState.layout && !this.state.activeDrag) {
        this.props.onLayoutChange(this.state.layout, this.state.layouts);
      }
    }

    /**
     * Calculates a pixel value for the container.
     * @return {String} Container height in pixels.
     */
  }, {
    key: 'containerHeight',
    value: function containerHeight() {
      if (!this.props.autoSize) return;
      return (0, _utils.bottom)(this.state.layout) * this.props.rowHeight + this.props.margin[1] + 'px';
    }

    /**
     * When the width changes, save it to state. This helps with left/width calculations.
     */
  }, {
    key: 'placeholder',

    /**
     * Create a placeholder object.
     * @return {Element} Placeholder div.
     */
    value: function placeholder() {
      if (!this.state.activeDrag) return null;

      // {...this.state.activeDrag} is pretty slow, actually
      return _react2['default'].createElement(
        _GridItem2['default'],
        {
          w: this.state.activeDrag.w,
          h: this.state.activeDrag.h,
          x: this.state.activeDrag.x,
          y: this.state.activeDrag.y,
          i: this.state.activeDrag.i,
          isPlaceholder: true,
          className: 'react-grid-placeholder',
          containerWidth: this.state.width,
          cols: this.props.cols,
          margin: this.props.margin,
          rowHeight: this.props.rowHeight,
          isDraggable: false,
          isResizable: false,
          useCSSTransforms: this.props.useCSSTransforms
        },
        _react2['default'].createElement('div', null)
      );
    }

    /**
     * Given a grid item, set its style attributes & surround in a <Draggable>.
     * @param  {Element} child React element.
     * @param  {string}  i     Index of element.
     * @return {Element}       Element wrapped in draggable and properly placed.
     */
  }, {
    key: 'processGridItem',
    value: function processGridItem(child) {
      if (!child.key) return;
      var i = child.key;
      var l = (0, _utils.getLayoutItem)(this.state.layout, i);
      if (!l) return;

      // watchStart property tells Draggable to react to changes in the start param
      // Must be turned off on the item we're dragging as the changes in `activeDrag` cause rerenders
      var moveOnStartChange = !(this.state.activeDrag && this.state.activeDrag.i === i);

      // Parse 'static'. Any properties defined directly on the grid item will take precedence.
      var draggable, resizable;
      if (l['static'] || this.props.isDraggable === false) draggable = false;
      if (l['static'] || this.props.isResizable === false) resizable = false;

      return _react2['default'].createElement(
        _GridItem2['default'],
        _extends({
          containerWidth: this.state.width,
          cols: this.props.cols,
          margin: this.props.margin,
          rowHeight: this.props.rowHeight,
          moveOnStartChange: moveOnStartChange,
          cancel: this.props.draggableCancel,
          handle: this.props.draggableHandle,
          onDragStop: this.onDragStop,
          onDragStart: this.onDragStart,
          onDrag: this.onDrag,
          onResizeStart: this.onResizeStart,
          onResize: this.onResize,
          onResizeStop: this.onResizeStop,
          isDraggable: draggable,
          isResizable: resizable,
          useCSSTransforms: this.props.useCSSTransforms && this.state.isMounted,
          usePercentages: !this.state.isMounted
        }, l),
        child
      );
    }
  }, {
    key: 'render',
    value: function render() {
      // Calculate classname
      /*eslint no-redeclare:0*/ // eslint bug?
      var _props = this.props;
      var className = _props.className;

      var props = _objectWithoutProperties(_props, ['className']);

      className = 'react-grid-layout ' + (className || '');

      return _react2['default'].createElement(
        'div',
        _extends({}, props, { className: className, style: { height: this.containerHeight() } }),
        _react2['default'].Children.map(this.props.children, this.processGridItem.bind(this)),
        this.placeholder()
      );
    }
  }], [{
    key: 'propTypes',

    // mixins: [PureDeepRenderMixin, WidthListeningMixin], // FIXME

    value: {
      //
      // Basic props
      //

      // If true, the container height swells and contracts to fit contents
      autoSize: _react2['default'].PropTypes.bool,
      // # of cols.
      cols: _react2['default'].PropTypes.number,

      // A selector that will not be draggable.
      draggableCancel: _react2['default'].PropTypes.string,
      // A selector for the draggable handler
      draggableHandle: _react2['default'].PropTypes.string,

      // If true, the layout will compact vertically
      verticalCompact: _react2['default'].PropTypes.bool,

      // layout is an array of object with the format:
      // {x: Number, y: Number, w: Number, h: Number, i: Number}
      layout: function layout(props, propName, _componentName) {
        var layout = props.layout;
        // I hope you're setting the _grid property on the grid items
        if (layout === undefined) return;
        (0, _utils.validateLayout)(layout, 'layout');
      },

      layouts: function layouts(props, propName, _componentName) {
        if (props.layouts) {
          throw new Error("ReactGridLayout does not use `layouts`: Use ReactGridLayout.Responsive.");
        }
      },

      // margin between items [x, y] in px
      margin: _react2['default'].PropTypes.array,
      // Rows have a static height, but you can change this based on breakpoints if you like
      rowHeight: _react2['default'].PropTypes.number,

      //
      // Flags
      //
      isDraggable: _react2['default'].PropTypes.bool,
      isResizable: _react2['default'].PropTypes.bool,
      // Use CSS transforms instead of top/left
      useCSSTransforms: _react2['default'].PropTypes.bool,

      //
      // Callbacks
      //

      // Callback so you can save the layout.
      // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
      onLayoutChange: _react2['default'].PropTypes.func,

      // Calls when drag starts. Callback is of the signature (layout, oldItem, newItem, placeholder, e).
      // All callbacks below have the same signature. 'start' and 'stop' callbacks omit the 'placeholder'.
      onDragStart: _react2['default'].PropTypes.func,
      // Calls on each drag movement.
      onDrag: _react2['default'].PropTypes.func,
      // Calls when drag is complete.
      onDragStop: _react2['default'].PropTypes.func,
      //Calls when resize starts.
      onResizeStart: _react2['default'].PropTypes.func,
      // Calls when resize movement happens.
      onResize: _react2['default'].PropTypes.func,
      // Calls when resize is complete.
      onResizeStop: _react2['default'].PropTypes.func,

      //
      // Other validations
      //

      // Children must not have duplicate keys.
      children: function children(props, propName, _componentName) {
        _react2['default'].PropTypes.node.apply(this, arguments);
        var children = props[propName];

        // Check children keys for duplicates. Throw if found.
        var keys = {};
        _react2['default'].Children.forEach(children, function (child) {
          if (keys[child.key]) {
            throw new Error("Duplicate child key found! This will cause problems in ReactGridLayout.");
          }
          keys[child.key] = true;
        });
      }
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      autoSize: true,
      cols: 12,
      rowHeight: 150,
      layout: [],
      margin: [10, 10],
      isDraggable: true,
      isResizable: true,
      useCSSTransforms: true,
      verticalCompact: true,
      onLayoutChange: function onLayoutChange() {},
      onDragStart: function onDragStart() {},
      onDrag: function onDrag() {},
      onDragStop: function onDragStop() {},
      onResizeStart: function onResizeStart() {},
      onResize: function onResize() {},
      onResizeStop: function onResizeStop() {}
    },
    enumerable: true
  }]);

  return ReactGridLayout;
})(_react2['default'].Component);

ReactGridLayout.displayName = 'ReactGridLayout';
exports['default'] = (0, _componentsListensToWidth2['default'])(ReactGridLayout);
module.exports = exports['default'];

/**
 * When dragging starts
 * @param {String} i Id of the child
 * @param {Number} x X position of the move
 * @param {Number} y Y position of the move
 * @param {Event} e The mousedown event
 * @param {Element} element The current dragging DOM element
 * @param {Object} position Drag information
 */

/**
 * Each drag movement create a new dragelement and move the element to the dragged location
 * @param {String} i Id of the child
 * @param {Number} x X position of the move
 * @param {Number} y Y position of the move
 * @param {Event} e The mousedown event
 * @param {Element} element The current dragging DOM element
 * @param {Object} position Drag information
 */

/**
 * When dragging stops, figure out which position the element is closest to and update its x and y.
 * @param  {String} i Index of the child.
 * @param {Number} i Index of the child
 * @param {Number} x X position of the move
 * @param {Number} y Y position of the move
 * @param {Event} e The mousedown event
 * @param {Element} element The current dragging DOM element
 * @param {Object} position Drag information
 */