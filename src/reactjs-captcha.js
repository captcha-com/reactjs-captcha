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

    componentDidMount() {
        this.displayHtml();
    }

    // get BotDetect client-side instance.
    getInstance() {
        let instance = null;
        if (typeof window.botdetect !== 'undefined') {
            return window.botdetect.getInstanceByStyleName(this.props.styleName);
        }
        return instance;
    }

    // display captcha html markup.
    displayHtml() {
        let self = this;
        let captchaStyleName = self.props.styleName || 'defaultCaptcha';
        let url = captchaSettings.get().captchaEndpoint + '?get=html&c=' + captchaStyleName;

        captchaHelper.ajax(url, function(data) {
            let target = document.getElementById('BDC_CaptchaComponent_' + captchaStyleName);
            target.innerHTML = data.replace(/<script.*<\/script>/g, '');
            self.loadScriptIncludes(captchaStyleName, function() {
                let instance = self.getInstance();
                if (instance) {
                    captchaHelper.addValidateEvent(instance);
                } else {
                    console.error('window.botdetect undefined.');
                }
            })
        });
    }

    // the current captcha id, which will be used for server-side validation purpose.
    getCaptchaId() {
        return this.getInstance().captchaId;
    }

    // the typed captcha code value.
    getCaptchaCode() {
        return this.getInstance().userInput.value;
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

    // load BotDetect scripts.
    loadScriptIncludes(styleName, callback) {
        let captchaId = document.getElementById('BDC_VCID_' + styleName).value;
        let scriptIncludeUrl = captchaSettings.get().captchaEndpoint + '?get=script-include&c=' + styleName + '&t=' + captchaId + '&cs=203';
        captchaHelper.getScript(scriptIncludeUrl, callback);
    }

    render() {
        return (
            <div id={'BDC_CaptchaComponent_' + this.props.styleName}></div>
        );
    }
}

module.exports = Captcha;