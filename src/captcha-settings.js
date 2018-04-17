var helper = require('./captcha-helper');

window.bdc_react_settings = window.bdc_react_settings || {captchaEndpoint: 'botdetectcaptcha'}
var settings = {
    config: window.bdc_react_settings,
    get: function () {
        this.config.captchaEndpoint = this.config.captchaEndpoint.replace(/\/+$/g, '');
        return this.config;
    },
    set: function (obj) {
        helper.spread(this.config, obj);
    }
};

module.exports = settings;
