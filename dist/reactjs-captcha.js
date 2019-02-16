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

        // generate captcha html markup in view

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (captchaSettings.get().captchaEnabled) {
                var captchaStyleName = this.getCaptchaStyleName();
                this.displayHtml(captchaStyleName);
            }
        }

        // get captcha style name.

    }, {
        key: 'getCaptchaStyleName',
        value: function getCaptchaStyleName() {
            var styleName = void 0;

            // the value can be set in generateCaptchaMarkup method
            if (this.state && typeof this.state.captchaStyleName !== 'undefined') {
                styleName = this.state.captchaStyleName;
                return styleName;
            }

            styleName = this.props.captchaStyleName;
            if (styleName) {
                return styleName;
            }

            // backward compatible
            styleName = this.props.styleName;
            if (styleName) {
                return styleName;
            }

            throw new Error('The captchaStyleName attribute is not found or its value is not set.');
        }

        // get BotDetect client-side instance.

    }, {
        key: 'getInstance',
        value: function getInstance() {
            var instance = null;
            if (typeof window.botdetect !== 'undefined') {
                var captchaStyleName = this.getCaptchaStyleName();
                instance = window.botdetect.getInstanceByStyleName(captchaStyleName);
            }
            return instance;
        }

        // the current captcha id, which will be used for server-side validation purpose.

    }, {
        key: 'getCaptchaId',
        value: function getCaptchaId() {
            return this.getInstance().captchaId;
        }

        // the user entered captcha code value.
        // keep this method for backward compatibility

    }, {
        key: 'getCaptchaCode',
        value: function getCaptchaCode() {
            return this.getInstance().userInput.value;
        }
    }, {
        key: 'getUserEnteredCaptchaCode',
        value: function getUserEnteredCaptchaCode() {
            return this.getCaptchaCode();
        }
    }, {
        key: 'displayHtml',
        value: function displayHtml(captchaStyleName) {
            var self = this;
            captchaHelper.getHtml(captchaStyleName, captchaSettings.get().captchaEndpoint, function (captchaHtml) {
                document.getElementById('BDC_CaptchaComponent').innerHTML = captchaHtml;
                self.loadScriptIncludes(captchaStyleName);
            });
        }

        // reload a new captcha image.

    }, {
        key: 'reloadImage',
        value: function reloadImage() {
            this.getInstance().reloadImage();
        }
    }, {
        key: 'validateUnsafe',
        value: function validateUnsafe(callback) {
            var instance = this.getInstance();
            captchaHelper.validateUnsafe(instance, function (isHuman) {
                callback(isHuman);
                if (!captchaHelper.useUserInputBlurValidation(instance.userInput) && !isHuman) {
                    instance.reloadImage();
                }
            });
        }

        // generate captcha markup manually

    }, {
        key: 'generateCaptchaMarkup',
        value: function generateCaptchaMarkup(captchaStyleName) {
            this.setState({ captchaStyleName: captchaStyleName });
            this.displayHtml(captchaStyleName);
        }

        // load BotDetect scripts.

    }, {
        key: 'loadScriptIncludes',
        value: function loadScriptIncludes(captchaStyleName) {
            var self = this;
            var captchaIdElement = document.getElementById('BDC_VCID_' + captchaStyleName);
            if (captchaIdElement) {
                var captchaId = captchaIdElement.value;
                var scriptIncludeUrl = captchaSettings.get().captchaEndpoint + '?get=script-include&c=' + captchaStyleName + '&t=' + captchaId + '&cs=203';
                captchaHelper.getScript(scriptIncludeUrl, function () {
                    // register user input blur validation
                    var instance = self.getInstance();
                    if (instance) {
                        captchaHelper.addValidateEvent(instance);
                    } else {
                        console.error('window.botdetect undefined.');
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('div', { id: 'BDC_CaptchaComponent' });
        }
    }]);

    return Captcha;
}(React.Component);

module.exports = Captcha;