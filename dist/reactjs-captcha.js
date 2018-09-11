'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var captchaSettings = require('./captcha-settings');
var captchaHelper = require('./captcha-helper');

var Captcha = function (_React$Component) {
    _inherits(Captcha, _React$Component);

    function Captcha(props) {
        _classCallCheck(this, Captcha);

        return _possibleConstructorReturn(this, (Captcha.__proto__ || Object.getPrototypeOf(Captcha)).call(this, props));
    }

    _createClass(Captcha, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            captchaHelper.addCustomEventPolyfill();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.displayHtml();
        }

        // get BotDetect client-side instance.

    }, {
        key: 'getInstance',
        value: function getInstance() {
            var instance = null;
            if (typeof window.botdetect !== 'undefined') {
                return window.botdetect.getInstanceByStyleName(this.props.styleName);
            }
            return instance;
        }

        // display captcha html markup.

    }, {
        key: 'displayHtml',
        value: function displayHtml() {
            var self = this;
            var captchaStyleName = self.props.styleName || 'defaultCaptcha';
            var url = captchaSettings.get().captchaEndpoint + '?get=html&c=' + captchaStyleName;

            captchaHelper.ajax(url, function (data) {
                var target = document.getElementById('BDC_CaptchaComponent_' + captchaStyleName);
                target.innerHTML = data.replace(/<script.*<\/script>/g, '');
                self.loadScriptIncludes(captchaStyleName, function () {
                    var instance = self.getInstance();
                    if (instance) {
                        captchaHelper.addValidateEvent(instance);
                    } else {
                        console.error('window.botdetect undefined.');
                    }
                });
            });
        }

        // the current captcha id, which will be used for server-side validation purpose.

    }, {
        key: 'getCaptchaId',
        value: function getCaptchaId() {
            return this.getInstance().captchaId;
        }

        // the typed captcha code value.

    }, {
        key: 'getCaptchaCode',
        value: function getCaptchaCode() {
            return this.getInstance().userInput.value;
        }

        // reload a new captcha image.

    }, {
        key: 'reloadImage',
        value: function reloadImage() {
            this.getInstance().reloadImage();
        }
    }, {
        key: 'validateUnSafe',
        value: function validateUnSafe(callback) {
            var instance = this.getInstance();
            captchaHelper.validateUnSafe(instance, function (isHuman) {
                callback(isHuman);
                if (!isHuman) {
                    instance.reloadImage();
                }
            });
        }

        // load BotDetect scripts.

    }, {
        key: 'loadScriptIncludes',
        value: function loadScriptIncludes(styleName, callback) {
            var captchaId = document.getElementById('BDC_VCID_' + styleName).value;
            var scriptIncludeUrl = captchaSettings.get().captchaEndpoint + '?get=script-include&c=' + styleName + '&t=' + captchaId + '&cs=203';
            captchaHelper.getScript(scriptIncludeUrl, callback);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('div', { id: 'BDC_CaptchaComponent_' + this.props.styleName });
        }
    }]);

    return Captcha;
}(React.Component);

module.exports = Captcha;