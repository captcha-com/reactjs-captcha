var React = require('react');
var captchaSettings = require('./captcha-settings');
var captchaHelper = require('./captcha-helper');

class Captcha extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        captchaHelper.addCustomEventPolyfill();
    }

    // generate captcha html markup in view
    componentDidMount() {
        if (captchaSettings.get().captchaEnabled) {
            let captchaStyleName = this.getCaptchaStyleName();
            this.displayHtml(captchaStyleName);
        }
    }

    // get captcha style name.
    getCaptchaStyleName() {
        let styleName;

        // the value can be set in generateCaptchaMarkup method
        if (this.state && (typeof this.state.captchaStyleName !== 'undefined')) {
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
    getInstance() {
        let instance = null;
        if (typeof window.botdetect !== 'undefined') {
            const captchaStyleName = this.getCaptchaStyleName();
            instance = window.botdetect.getInstanceByStyleName(captchaStyleName);
        }
        return instance;
    }

    // the current captcha id, which will be used for server-side validation purpose.
    getCaptchaId() {
        return this.getInstance().captchaId;
    }

    // the user entered captcha code value.
    // keep this method for backward compatibility
    getCaptchaCode() {
        return this.getInstance().userInput.value;
    }

    getUserEnteredCaptchaCode() {
        return this.getCaptchaCode();
    }

    displayHtml(captchaStyleName) {
        let self = this;
        captchaHelper.getHtml(captchaStyleName, captchaSettings.get().captchaEndpoint, function(captchaHtml) {
            document.getElementById('BDC_CaptchaComponent').innerHTML = captchaHtml;
            self.loadScriptIncludes(captchaStyleName);
        });
    }

    // reload a new captcha image.
    reloadImage() {
        this.getInstance().reloadImage();
    }

    validateUnsafe(callback) {
        let instance = this.getInstance();
        captchaHelper.validateUnsafe(instance, function(isHuman) {
            callback(isHuman);
            if (!captchaHelper.useUserInputBlurValidation(instance.userInput) && !isHuman) {
                instance.reloadImage();
            }
        });
    }

    // generate captcha markup manually
    generateCaptchaMarkup(captchaStyleName) {
        this.setState({captchaStyleName: captchaStyleName});
        this.displayHtml(captchaStyleName);
    }

    // load BotDetect scripts.
    loadScriptIncludes(captchaStyleName) {
        var self = this;
        let captchaIdElement = document.getElementById('BDC_VCID_' + captchaStyleName);
        if (captchaIdElement) {
            let captchaId = captchaIdElement.value;
            let scriptIncludeUrl = captchaSettings.get().captchaEndpoint + '?get=script-include&c=' + captchaStyleName + '&t=' + captchaId + '&cs=203';
            captchaHelper.getScript(scriptIncludeUrl, function() {
                // register user input blur validation
                let instance = self.getInstance();
                if (instance) {
                    captchaHelper.addValidateEvent(instance);
                } else {
                    console.error('window.botdetect undefined.');
                }
            });
        }
    }

    render() {
        return (
            <div id='BDC_CaptchaComponent'></div>
        );
    }
}

module.exports = Captcha;