var React = require('react');
var settings = require('./captcha-settings');
var helper = require('./captcha-helper');

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
        helper.addCustomEventPolyfill();
    }

    componentDidMount() {
        let self = this;
        let captchaStyleName = self.props.styleName || 'defaultCaptcha';
        let url = settings.get().captchaEndpoint + '?get=html&c=' + captchaStyleName;

        helper.ajax(url, function (data) {
            let target = document.getElementById('BDC_CaptchaComponent_' + captchaStyleName);
            target.innerHTML = data.replace(/<script.*<\/script>/g, '');
            self.loadScriptIncludes(captchaStyleName, function () {
                let instance = self.getInstance();
                if (instance) {
                    helper.addValidateEvent(instance);
                } else {
                    console.error('window.botdetect undefined');
                }
            })
        });
    }

    loadScriptIncludes(styleName, callback) {
        let captchaId = document.getElementById('BDC_VCID_' + styleName).value;
        let scriptIncludeUrl = settings.get().captchaEndpoint + '?get=script-include&c=' + styleName + '&t=' + captchaId + '&cs=203';
        helper.getScript(scriptIncludeUrl, callback);
    }

    render() {
        let self = this;
        return (
            <div id={'BDC_CaptchaComponent_' + self.props.styleName}></div>
        );
    }
}

module.exports = Captcha;