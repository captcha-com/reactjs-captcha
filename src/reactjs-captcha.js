var React = require('react');
var captchaSettings = require('./captcha-settings');
var captchaHelper = require('./captcha-helper');

class Captcha extends React.Component {
    constructor(props) {
        super(props);
    }

    getInstance() {
        let instance = null;
        if (typeof window.botdetect !== 'undefined') {
            return window.botdetect.getInstanceByStyleName(this.props.styleName);
        }
        return instance;
    }

    componentWillMount() {
        captchaHelper.addCustomEventPolyfill();
    }

    componentDidMount() {
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