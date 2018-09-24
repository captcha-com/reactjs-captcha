module.exports.spread = function(initArr, addArr) {
    var addArrKeys = Object.keys(addArr);
    for (var i = 0; i < addArrKeys.length; i++) {
        initArr[addArrKeys[i]] = addArr[addArrKeys[i]];
    }
};

module.exports.getScript = function(url, callback) {
    this.ajax(url, function(responseText) {
        var f = new Function(responseText);
        f();
        if (typeof callback === 'function') {
            callback();
        }
    });
};

module.exports.addValidateEvent = function(captchaInstance) {
    var self = this;
    var userInput = captchaInstance.userInput;
    if (userInput && this.useUserInputBlurValidation(userInput)) {
        userInput.onblur = function() {
            var captchaCode = userInput.value;
            if (captchaCode.length !== 0) {
                self.validateUnsafe(captchaInstance, function(isHuman) {
                    var event = new CustomEvent('validatecaptcha', { detail: isHuman });
                    userInput.dispatchEvent(event);
                    if (!isHuman) {
                        captchaInstance.reloadImage();
                    }
                });
            }
        };
    }
};

module.exports.validateUnsafe = function(captchaInstance, callback) {
    var captchaCode = captchaInstance.userInput.value;
    this.ajax(captchaInstance.validationUrl + '&i=' + captchaCode, function(isHuman) {
        isHuman = (isHuman == 'true');
        callback(isHuman);
    });
};

module.exports.useUserInputBlurValidation = function(userInput) {
    return (userInput.getAttribute('data-correct-captcha') !== null);
};

module.exports.getHtml = function(captchaStyleName, captchaEndpoint, callback) {
    var self = this;
    var url =  captchaEndpoint + '?get=html&c=' + captchaStyleName;
    this.ajax(url, function(data) {
        var captchaHtml = data.replace(/<script.*<\/script>/g, '');;
        callback(captchaHtml);
    });
};

module.exports.ajax = function(url, callback) {
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
            x.onreadystatechange = function() {
                if (4 === x.readyState && x.status === 200) {
                    if (typeof callback === 'function') {
                        callback(x.response);
                    }
                }
            };
            x.open('GET', url, true);
            x.send();
        }
    }
}

module.exports.addCustomEventPolyfill = function() {
    if (typeof window.CustomEvent !== 'function') {
        window.CustomEvent = function(event, params) {
            params = params || {bubbles: false, cancelable: false, detail: undefined};
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };
        window.CustomEvent.prototype = window.Event.prototype;
    }
}
