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
            let captchaStyleName = this.props.styleName || 'defaultCaptcha';
            this.displayHtml(captchaStyleName);
        }
    }

    // get BotDetect client-side instance.
    getInstance() {
        let instance = null;
        if (typeof window.botdetect !== 'undefined') {
            const captchaStyleName = (this.state && (typeof this.state.styleName !== 'undefined'))
                ? this.state.styleName
                : this.props.styleName;
            instance = window.botdetect.getInstanceByStyleName(captchaStyleName);
        }
        return instance;
    }

    // the current captcha id, which will be used for server-side validation purpose.
    getCaptchaId() {
        return this.getInstance().captchaId;
    }

    // the typed captcha code value.
    getCaptchaCode() {
        return this.getInstance().userInput.value;
    }

    displayHtml(styleName) {
        let self = this;
        captchaHelper.getHtml(styleName, captchaSettings.get().captchaEndpoint, function(captchaHtml) {
            document.getElementById('BDC_CaptchaComponent').innerHTML = captchaHtml;
            self.loadScriptIncludes(styleName);
        });
    };

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
    generateCaptchaMarkup(styleName) {
        this.setState({styleName: styleName});
        this.displayHtml(styleName);
    }

    // load BotDetect scripts.
    loadScriptIncludes(styleName) {
        var self = this;
        let captchaId = document.getElementById('BDC_VCID_' + styleName).value;
        let scriptIncludeUrl = captchaSettings.get().captchaEndpoint + '?get=script-include&c=' + styleName + '&t=' + captchaId + '&cs=203';
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

    render() {
        return (
            <div id='BDC_CaptchaComponent'></div>
        );
    }
}

module.exports = Captcha;