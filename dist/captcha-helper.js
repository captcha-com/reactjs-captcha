'use strict';

module.exports.spread = function (initArr, addArr) {
    var addArrKeys = Object.keys(addArr);
    for (var i = 0; i < addArrKeys.length; i++) {
        initArr[addArrKeys[i]] = addArr[addArrKeys[i]];
    }
};
module.exports.getScript = function (url, callback) {
    this.ajax(url, function (responseText) {
        var f = new Function(responseText);
        f();
        if (typeof callback === 'function') {
            setTimeout(callback, 100);
        }
    });
};
module.exports.addValidateEvent = function (instance) {
    var self = this;
    var inputElm = document.getElementById(instance.options.userInputID);
    if (inputElm) {
        var attr = inputElm.getAttribute('data-correct-captcha');
        if (attr) {
            inputElm.onblur = function () {
                var code = inputElm.value;
                if (code.length > 0) {
                    var params = 'i=' + code;
                    self.ajax(instance.validationUrl + '&' + params, function (response) {
                        response = response === 'false' ? false : true;
                        var event = new CustomEvent('validatecaptcha', { detail: response });
                        inputElm.dispatchEvent(event);
                        if (!response) {
                            instance.reloadImage();
                        }
                    });
                }
            };
        }
    }
};
module.exports.ajax = function (url, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }

    function xhr() {
        var x = null;
        try {
            x = new XMLHttpRequest();
        } catch (e) {
            console.error(e);
        }
        return x;
    }

    var x = xhr();
    if (x) {
        if (x && 0 === x.readyState) {
            x.onreadystatechange = function () {
                if (4 === x.readyState && x.status === 200) {
                    if (typeof callback === 'function') {
                        callback(x.response);
                    }
                }
            };
            x.open('GET', url, true);
            x.send(params);
        }
    }
};