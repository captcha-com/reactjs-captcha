## BotDetect Captcha React Component (JavaScript: React 0.13.x/0.14.x/15/16+)

### Requirements:
BotDetect Captcha React Component requires [BotDetect ASP.NET Captcha](https://captcha.com/asp.net-captcha.html#simple-api), [BotDetect Java Captcha](https://captcha.com/java-captcha.html#simple-api) or [BotDetect PHP Captcha](https://captcha.com/php-captcha.html#simple-api) library to generate Captcha challenges. Simple API support for ASP.NET Core and .NET Core will be released this month -- very likely during the week of 2018/11/19-25. See our [roadmap](https://captcha.com/captcha-roadmap-and-release-notes.html#aspnet-release-notes) for details.

### Quick guide:

##### 1) Installation:
```sh
npm install reactjs-captcha --save
```
##### 2) Importing React Captcha Component into Your Component:
```js
import { Captcha, captchaSettings } from 'reactjs-captcha';
```

##### 3) Setting backend Captcha endpoint:

Endpoint Configuration depends on which technology you use in the backend.

- ASP.NET-based Captcha endpoint:
```js
class Example extends React.Component {

    constructor(props) {
        super(props);

        captchaSettings.set({
            captchaEndpoint: 'captcha-endpoint/BotDetectCaptcha.ashx'
        });
    }

    ...
}
```

- Java-based Captcha endpoint:
```js
class Example extends React.Component {

    constructor(props) {
        super(props);

        captchaSettings.set({
            captchaEndpoint: 'captcha-endpoint/botdetectcaptcha'
        });
    }

    ...
}
```

- PHP-based Captcha endpoint:
```js
class Example extends React.Component {

    constructor(props) {
        super(props);

        captchaSettings.set({
            captchaEndpoint: 'captcha-endpoint/simple-botdetect.php'
        });
    }

    ...
}
```

##### 4) Displaying Captcha In Your View
```js
class Example extends React.Component {

    ...

    render() {
        return (
            <Captcha styleName="exampleCaptcha" ref={(captcha) => {this.captcha = captcha}} />
        )
    }

}
```

##### 5) Client-side Captcha validation
- Using validateUnsafe(callback) method to validate Captcha code on form submit:
```js
...
import { Captcha } from 'reactjs-captcha';

class Example extends React.Component {

  constructor(props) {
    super(props);
  }
  
  // On form submit.
  formSubmit(event) {
    
    this.captcha.validateUnsafe(function(isCaptchaCodeCorrect) {

      if (isCaptchaCodeCorrect) {
        // Captcha code is correct
      } else {
        // Captcha code is incorrect
      }

    });

    event.preventDefault();
  }

  render() {
    ...
  }
}

export default Example;
```

OR

- Using data-correct-captcha directive attribute to validate Captcha code on blur event:
```html
<input 
  type="text" 
  name="captchaCode"
  id="captchaCode"
  data-correct-captcha
>
```

```js
document.getElementById('captchaCode').addEventListener('validatecaptcha', function (e) {
  let isCorrect = e.detail;
  if (isCorrect) {
    // UI Captcha validation passed
  } else {
    // UI Captcha validation failed
  }
});
```

##### 6) Server-side Captcha validation:
These client-side captcha validations are just an usability improvement that you may use or not -- they do not protect your form from spammers at all.

As you are protecting some server-side action you must validate a Captcha at the server-side before executing that protected action.

- Server-side Captcha validation with [ASP.NET Captcha](https://captcha.com/asp.net-captcha.html#simple-api) is performed in the following way:
```csharp
// C#
SimpleCaptcha captcha = new SimpleCaptcha();
bool isHuman = captcha.Validate(captchaCode, captchaId);
```
```vbnet
' VB.NET
Dim captcha As SimpleCaptcha = New SimpleCaptcha()
Dim isHuman As Boolean = captcha.Validate(captchaCode, captchaId)
```

- Server-side Captcha validation with [Java Captcha](https://captcha.com/java-captcha.html#simple-api) is performed in the following way:
```java
SimpleCaptcha captcha = SimpleCaptcha.load(request);
boolean isHuman = captcha.validate(captchaCode, captchaId);
```

- Server-side Captcha validation with [PHP Captcha](https://captcha.com/php-captcha.html#simple-api) is performed in the following way:
```php
$captcha = new SimpleCaptcha();
$isHuman = $captcha->Validate($captchaCode, $captchaId);
```

### Docs:
 
[React CAPTCHA Integration Guide](https://captcha.com/react-captcha.html)

### Code Examples: 
1. [Basic React CAPTCHA Example](https://captcha.com/doc/react/examples/react-basic-captcha-example.html)

2. [React CAPTCHA Form Example](https://captcha.com/doc/react/examples/react-form-captcha-example.html)


### Dependencies:
Captcha React component uses Captcha library for Captcha image and Captcha sound generation. At the moment challenges are generated in Java backend with [BotDetect Java Captcha library](https://captcha.com/java-captcha.html#simple-api) and PHP backend with [BotDetect PHP Captcha library](https://captcha.com/php-captcha.html#simple-api), but BotDetect ASP.NET is going to work with Captcha React plugin soon as well.


### Technical Support:

Through [contact form on captcha.com](https://captcha.com/contact.html).
