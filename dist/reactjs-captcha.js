'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var settings = require('./captcha-settings');
var helper = require('./captcha-helper');

var Captcha = function (_React$Component) {
    _inherits(Captcha, _React$Component);

    function Captcha(props) {
        _classCallCheck(this, Captcha);

        return _possibleConstructorReturn(this, (Captcha.__proto__ || Object.getPrototypeOf(Captcha)).call(this, props));
    }

    _createClass(Captcha, [{
        key: 'getInstance',
        value: function getInstance() {
            return window.botdetect !== undefined ? window.botdetect.getInstanceByStyleName(this.props.styleName) : null;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var self = this;
            var captchaStyleNameProp = self.props.styleName || 'defaultCaptcha';
            var captchaEndpointProp = settings.get().captchaEndpoint;
            var url = captchaEndpointProp + '?get=html&c=' + captchaStyleNameProp;

            helper.ajax(url, function (data) {
                var target = document.getElementById('BDC_CaptchaComponent_' + self.props.styleName);
                target.innerHTML = data.replace(/<script.*<\/script>/g, '');
                self.loadScriptIncludes(captchaStyleNameProp, captchaEndpointProp, function () {
                    var instance = self.getInstance();
                    if (instance) {
                        helper.addValidateEvent(instance);
                    } else {
                        console.error('window.botdetect undefined!');
                    }
                });
            });
        }
    }, {
        key: 'loadScriptIncludes',
        value: function loadScriptIncludes(styleName, endpoint, callback) {
            helper.getScript(endpoint + '?get=script-include', function () {
                var captchaId = document.getElementById('BDC_VCID_' + styleName).value;

                helper.getScript(endpoint + '?get=init-script-include&c=' + styleName + '&t=' + captchaId + '&cs=203', function () {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            return React.createElement('div', { id: 'BDC_CaptchaComponent_' + self.props.styleName });
        }
    }]);

    return Captcha;
}(React.Component);

module.exports = Captcha;