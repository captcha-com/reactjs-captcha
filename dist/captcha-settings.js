'use strict';

var captchaHelper = require('./captcha-helper');

window.bdc_react_settings = window.bdc_react_settings || { captchaEndpoint: 'botdetectcaptcha' };
var captchaSettings = {
    config: window.bdc_react_settings,
    get: function get() {
        this.config.captchaEndpoint = this.config.captchaEndpoint.replace(/\/+$/g, '');
        return this.config;
    },
    set: function set(settings) {
        captchaHelper.spread(this.config, settings);
    }
};

module.exports = captchaSettings;