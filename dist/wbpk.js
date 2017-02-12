'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wbpk = function () {
    function wbpk() {
        _classCallCheck(this, wbpk);

        this.config = {};

        return this;
    }

    /**
     * Loads an existing webpack config
     * @param string|object config
     * @return wbpk
     */


    _createClass(wbpk, [{
        key: 'load',
        value: function load(config) {
            var configObj = null;

            if (typeof config === 'string') {
                configObj = require(config);
            } else if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
                configObj = config;
            } else {
                throw 'Invalid parameter passed to config. Parameter should either be webpack config object or path to webpack config.';
            }

            this.config = _extends({}, this.config, configObj);

            return this;
        }

        /**
         * @param string|array entry
         * @return wbpk
         */

    }, {
        key: 'entry',
        value: function entry(_entry) {
            this.config.entry = _entry;

            return this;
        }

        /**
         * @param string output
         * @return wbpk
         */

    }, {
        key: 'output',
        value: function output(_output) {
            this.config.output = this.preserve(this.config.output);

            var split = _output.split('/');

            // Need the path without the ending filename
            this.config.output.path = '' + split.slice().splice(0, split.length - 1).join('/');
            // Ending filename will just be the last of the split
            this.config.output.filename = split[split.length - 1];

            return this;
        }

        /**
         * @param string[] loaders
         */

    }, {
        key: 'loaders',
        value: function loaders(_loaders) {
            this.config.module = this.preserve(this.config.module);

            this.config.module.loaders = _loaders;

            return this;
        }

        /**
         * Keeps an open webpack watch process
         */

    }, {
        key: 'watch',
        value: function watch() {
            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var compiler = (0, _webpack2.default)(this.config);

            compiler.watch(opts, function (err, stats) {});
        }

        /**
         * Runs the webpack command once
         */

    }, {
        key: 'run',
        value: function run() {
            var compiler = (0, _webpack2.default)(this.config);

            compiler.run(function (err, stats) {
                console.log(err, stats);
            });
        }

        /**
         * Preserves an existing value or returns a new default
         * 
         * @param mixed def - What you want to default the value to, defaults to an empty object
         * @return mixed
         */

    }, {
        key: 'preserve',
        value: function preserve(prop) {
            var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return typeof prop !== 'undefined' ? prop : def;
        }
    }]);

    return wbpk;
}();

exports.default = wbpk;
