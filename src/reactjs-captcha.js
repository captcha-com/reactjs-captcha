var React = require('react');
var settings = require('./captcha-settings');
var helper = require('./captcha-helper');

class Captcha extends React.Component {
    constructor(props) {
        super(props);
    }

    getInstance() {
        return (window.botdetect !== undefined)
            ? window.botdetect.getInstanceByStyleName(this.props.styleName) : null;
    }

    componentWillMount() {
        helper.addCustomEventPolyfill();
    }

    componentDidMount() {
        let self = this;
        let captchaStyleNameProp = self.props.styleName || 'defaultCaptcha';
        let captchaEndpointProp = settings.get().captchaEndpoint;
        let url = captchaEndpointProp + '?get=html&c=' + captchaStyleNameProp;

        helper.ajax(url, function (data) {
            let target = document.getElementById('BDC_CaptchaComponent_' + self.props.styleName);
            target.innerHTML = data.replace(/<script.*<\/script>/g, '');
            self.loadScriptIncludes(captchaStyleNameProp, captchaEndpointProp, function () {
                let instance = self.getInstance();
                if (instance) {
                    helper.addValidateEvent(instance);
                } else {
                    console.error('window.botdetect undefined!');
                }
            })
        });
    }

    loadScriptIncludes(styleName, endpoint, callback) {
        helper.getScript(endpoint + '?get=script-include', function () {
            let captchaId = document.getElementById('BDC_VCID_' + styleName).value;

            helper.getScript(endpoint + '?get=init-script-include&c='
                + styleName + '&t=' + captchaId + '&cs=203', function () {
                if (typeof callback === 'function') {
                    callback();
                }
            });
        });
    }

    render() {
        let self = this;
        return (
            <div id={'BDC_CaptchaComponent_' + self.props.styleName}></div>
        );
    }
}

module.exports = Captcha;