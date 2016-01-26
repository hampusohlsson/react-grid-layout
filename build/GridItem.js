

/**
 * An individual item within a ReactGridLayout.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _reactResizable = require('react-resizable');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var GridItem = (function (_Component) {
  _inherits(GridItem, _Component);

  function GridItem() {
    var _this = this,
        _arguments2 = arguments;

    _classCallCheck(this, GridItem);

    _get(Object.getPrototypeOf(GridItem.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      resizing: null,
      className: ''
    };

    this.onDragHandler = function (handlerName) {
      return function (e, _ref) {
        var element = _ref.element;
        var position = _ref.position;
        return (function () {
          if (!this.props[handlerName]) return;
          // Get new XY

          var _calcXY = this.calcXY(position);

          var x = _calcXY.x;
          var y = _calcXY.y;

          // Cap x at numCols
          x = Math.min(x, this.props.cols - this.props.w);

          this.props[handlerName](this.props.i, x, y, { e: e, element: element, position: position });
        }).apply(_this, _arguments2);
      };
    };

    this.onResizeHandler = function (handlerName) {
      return function (e, _ref2) {
        var element = _ref2.element;
        var size = _ref2.size;
        return (function () {
          if (!this.props[handlerName]) return;

          // Get new XY

          var _calcWH = this.calcWH(size);

          var w = _calcWH.w;
          var h = _calcWH.h;

          // Cap w at numCols
          w = Math.min(w, this.props.cols - this.props.x);
          // Ensure w is at least 1
          w = Math.max(w, 1);

          // Min/max capping
          w = Math.max(Math.min(w, this.props.maxW), this.props.minW);
          h = Math.max(Math.min(h, this.props.maxH), this.props.minH);

          this.setState({ resizing: handlerName === 'onResizeStop' ? null : size });

          this.props[handlerName](this.props.i, w, h, { e: e, element: element, size: size });
        }).apply(_this, _arguments2);
      };
    };
  }

  _createClass(GridItem, [{
    key: 'calcPosition',

    /**
     * Return position on the page given an x, y, w, h.
     * left, top, width, height are all in pixels.
     * @param  {Number}  x             X coordinate in grid units.
     * @param  {Number}  y             Y coordinate in grid units.
     * @param  {Number}  w             W coordinate in grid units.
     * @param  {Number}  h             H coordinate in grid units.
     * @return {Object}                Object containing coords.
     */
    value: function calcPosition(x, y, w, h) {
      var p = this.props;
      var width = p.containerWidth - p.margin[0];
      var out = {
        left: Math.round(width * (x / p.cols) + p.margin[0]),
        top: Math.round(p.rowHeight * y + p.margin[1]),
        width: Math.round(width * (w / p.cols) - p.margin[0]),
        height: Math.round(h * p.rowHeight - p.margin[1])
      };
      return out;
    }

    /**
     * Translate x and y coordinates from pixels to grid units.
     * @param  {Number} options.left  Left offset in pixels.
     * @param  {Number} options.top   Top offset in pixels.
     * @return {Object}               x and y in grid units.
     */
  }, {
    key: 'calcXY',
    value: function calcXY(_ref3) {
      var left = _ref3.left;
      var top = _ref3.top;
      return (function () {
        left = left - this.props.margin[0];
        top = top - this.props.margin[1];
        // This is intentional; because so much of the logic on moving boxes up/down relies
        // on an exact y position, we only round the x, not the y.
        var x = Math.round(left / this.props.containerWidth * this.props.cols);
        var y = Math.floor(top / this.props.rowHeight);
        x = Math.max(Math.min(x, this.props.cols), 0);
        y = Math.max(y, 0);
        return { x: x, y: y };
      }).apply(this, arguments);
    }

    /**
     * Given a height and width in pixel values, calculate grid units.
     * @param  {Number} options.height Height in pixels.
     * @param  {Number} options.width  Width in pixels.
     * @return {Object}                w, h as grid units.
     */
  }, {
    key: 'calcWH',
    value: function calcWH(_ref4) {
      var height = _ref4.height;
      var width = _ref4.width;
      return (function () {
        width = width + this.props.margin[0];
        height = height + this.props.margin[1];
        var w = Math.round(width / this.props.containerWidth * this.props.cols);
        var h = Math.round(height / this.props.rowHeight);
        w = Math.max(Math.min(w, this.props.cols - this.props.x), 0);
        h = Math.max(h, 0);
        return { w: w, h: h };
      }).apply(this, arguments);
    }

    /**
     * This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
     * well when server rendering, and the only way to do that properly is to use percentage width/left because
     * we don't know exactly what the browser viewport is.
     * Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
     * left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
     *
     * @param  {Object} pos Position object with width, height, left, top.
     * @return {Object}     Style object.
     */
  }, {
    key: 'createStyle',
    value: function createStyle(pos) {
      var style = {
        width: pos.width + 'px',
        height: pos.height + 'px',
        left: pos.left + 'px',
        top: pos.top + 'px',
        position: 'absolute'
      };

      // This is used for server rendering.
      if (this.props.usePercentages) {
        style.left = (0, _utils.perc)(pos.left / this.props.containerWidth);
        style.width = (0, _utils.perc)(pos.width / this.props.containerWidth);
      }

      // CSS Transforms support
      if (this.props.useCSSTransforms) {
        (0, _utils.setTransform)(style, [pos.left, pos.top]);
        style.left = null;
        style.top = null;
      }

      return style;
    }

    /**
     * Mix a Draggable instance into a child.
     * @param  {Element} child    Child element.
     * @param  {Object} position  Position object (pixel values)
     * @return {Element}          Child wrapped in Draggable.
     */
  }, {
    key: 'mixinDraggable',
    value: function mixinDraggable(child, position) {
      var start = typeof position.left === "string" ? undefined : { x: position.left, y: position.top };
      return _react2['default'].createElement(
        _reactDraggable2['default'],
        {
          start: start,
          moveOnStartChange: this.props.moveOnStartChange,
          onStop: this.onDragHandler('onDragStop'),
          onStart: this.onDragHandler('onDragStart'),
          onDrag: this.onDragHandler('onDrag'),
          handle: this.props.handle,
          cancel: ".react-resizable-handle " + this.props.cancel,
          useCSSTransforms: this.props.useCSSTransforms
        },
        _react2['default'].createElement(
          'span',
          null,
          child
        )
      );
    }

    /**
     * Mix a Resizable instance into a child.
     * @param  {Element} child    Child element.
     * @param  {Object} position  Position object (pixel values)
     * @return {Element}          Child wrapped in Resizable.
     */
  }, {
    key: 'mixinResizable',
    value: function mixinResizable(child, position) {
      var p = this.props;
      // This is the max possible width - doesn't go to infinity because of the width of the window
      var maxWidth = this.calcPosition(0, 0, p.cols - p.x, 0).width;

      // Calculate min/max constraints using our min & maxes
      var mins = this.calcPosition(0, 0, p.minW, p.minH);
      var maxes = this.calcPosition(0, 0, p.maxW, p.maxH);
      var minConstraints = [mins.width, mins.height];
      var maxConstraints = [Math.min(maxes.width, maxWidth), Math.min(maxes.height, Infinity)];
      return _react2['default'].createElement(
        _reactResizable.Resizable,
        {
          width: position.width,
          height: position.height,
          minConstraints: minConstraints,
          maxConstraints: maxConstraints,
          onResizeStop: this.onResizeHandler('onResizeStop'),
          onResizeStart: this.onResizeHandler('onResizeStart'),
          onResize: this.onResizeHandler('onResize')
        },
        child
      );
    }

    /**
     * Wrapper around drag events to provide more useful data.
     * All drag events call the function with the given handler name,
     * with the signature (index, x, y).
     *
     * @param  {String} handlerName Handler name to wrap.
     * @return {Function}           Handler function.
     */
  }, {
    key: 'render',
    value: function render() {
      var p = this.props,
          pos = this.calcPosition(p.x, p.y, p.w, p.h);
      if (this.state.resizing) {
        pos.width = this.state.resizing.width;
        pos.height = this.state.resizing.height;
      }

      // Create the child element. We clone the existing element but modify its className and style.
      var child = _react2['default'].cloneElement(this.props.children, {
        // Munge a classname. Use passed in classnames and resizing.
        // React with merge the classNames.
        className: ['react-grid-item', this.props.className, this.props.isDraggable ? '' : 'static', this.state.resizing ? 'resizing' : '', this.props.useCSSTransforms ? 'cssTransforms' : ''].join(' '),
        // We can set the width and height on the child, but unfortunately we can't set the position.
        style: (0, _objectAssign2['default'])({}, this.props.style, this.createStyle(pos))
      });

      // Resizable support. This is usually on but the user can toggle it off.
      if (this.props.isResizable) {
        child = this.mixinResizable(child, pos);
      }

      // Draggable support. This is always on, except for with placeholders.
      if (this.props.isDraggable) {
        child = this.mixinDraggable(child, pos);
      }

      return child;
    }
  }], [{
    key: 'propTypes',
    value: {
      // Children must be only a single element
      children: _react2['default'].PropTypes.element,

      // General grid attributes
      cols: _react2['default'].PropTypes.number.isRequired,
      containerWidth: _react2['default'].PropTypes.number.isRequired,
      rowHeight: _react2['default'].PropTypes.number.isRequired,
      margin: _react2['default'].PropTypes.array.isRequired,

      // These are all in grid units
      x: _react2['default'].PropTypes.number.isRequired,
      y: _react2['default'].PropTypes.number.isRequired,
      w: _react2['default'].PropTypes.number.isRequired,
      h: _react2['default'].PropTypes.number.isRequired,

      // All optional
      minW: function minW(props, propName, _componentName) {
        _react2['default'].PropTypes.number.apply(this, arguments);
        if (props.minW > props.w || props.minW > props.maxW) constraintError('minW', props);
      },
      maxW: function maxW(props, propName, _componentName) {
        _react2['default'].PropTypes.number.apply(this, arguments);
        if (props.maxW < props.w || props.maxW < props.minW) constraintError('maxW', props);
      },
      minH: function minH(props, propName, _componentName) {
        _react2['default'].PropTypes.number.apply(this, arguments);
        if (props.minH > props.h || props.minH > props.maxH) constraintError('minH', props);
      },
      maxH: function maxH(props, propName, _componentName) {
        _react2['default'].PropTypes.number.apply(this, arguments);
        if (props.maxH < props.h || props.maxH < props.minH) constraintError('maxH', props);
      },

      // ID is nice to have for callbacks
      i: _react2['default'].PropTypes.string.isRequired,

      // If true, item will be repositioned when x/y/w/h change
      moveOnStartChange: _react2['default'].PropTypes.bool,

      // Functions
      onDragStop: _react2['default'].PropTypes.func,
      onDragStart: _react2['default'].PropTypes.func,
      onDrag: _react2['default'].PropTypes.func,
      onResizeStop: _react2['default'].PropTypes.func,
      onResizeStart: _react2['default'].PropTypes.func,
      onResize: _react2['default'].PropTypes.func,

      // Flags
      isDraggable: _react2['default'].PropTypes.bool,
      isResizable: _react2['default'].PropTypes.bool,

      // Use CSS transforms instead of top/left
      useCSSTransforms: _react2['default'].PropTypes.bool,
      isPlaceholder: _react2['default'].PropTypes.bool,

      // Others
      className: _react2['default'].PropTypes.string,
      // Selector for draggable handle
      handle: _react2['default'].PropTypes.string,
      // Selector for draggable cancel (see react-draggable)
      cancel: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      isDraggable: true,
      isResizable: true,
      useCSSTransforms: true,
      className: '',
      cancel: '',
      minH: 1,
      minW: 1,
      maxH: Infinity,
      maxW: Infinity
    },
    enumerable: true
  }]);

  return GridItem;
})(_react.Component);

exports['default'] = GridItem;

function constraintError(name, props) {
  delete props.children;
  throw new Error(name + ' overrides contraints on gridItem ' + props.i + '. Full props: ' + JSON.stringify(props));
}
module.exports = exports['default'];

/**
 * Wrapper around drag events to provide more useful data.
 * All drag events call the function with the given handler name,
 * with the signature (index, x, y).
 *
 * @param  {String} handlerName Handler name to wrap.
 * @return {Function}           Handler function.
 */