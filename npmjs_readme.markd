## BotDetect CAPTCHA React Component: Simple API integration for React 13/14/15/16+

For a comprehensive step-by-step integration guide please see our [React Captcha Component Integration Guide](https://captcha.com/react-captcha.html).  
The guide covers the integration with the following backends:
- ASP.NET (Core): web API with MVC Core
- ASP.NET (Legacy): Web-API2, MVC1-5, Generic Handler
- Java: Servlet, Spring, Struts
- PHP: the plain PHP

To give you a hint how React Captcha Component works we pasted bellow a few, not necessary up-to-date (and mostly frontend related), excerpts from the Integration Guide.

### Quick guide:

##### 1) React Captcha Component Installation:

```sh
npm install reactjs-captcha --save
```

##### 2) Setting Backend Captcha Endpoint

Endpoint configuration depends on which technology you use in the backend.

- ASP.NET-based captcha endpoint:
```js
import { captchaSettings } from 'reactjs-captcha';

class App extends React.Component {

  constructor(props) {
    super(props);

    captchaSettings.set({
      captchaEndpoint: 
        'https://your-app-backend-hostname.your-domain.com/simple-captcha-endpoint.ashx'
    });
  }
  ...
}

export default App;
```

- Java-based captcha endpoint:
```js
import { captchaSettings } from 'reactjs-captcha';

class App extends React.Component {

  constructor(props) {
    super(props);

    captchaSettings.set({
      captchaEndpoint: 
        'https://your-app-backend-hostname.your-domain.com/simple-captcha-endpoint'
    });
  }
  ...
}

export default App;
```

- PHP-based captcha endpoint:
```js
import { captchaSettings } from 'reactjs-captcha';

class App extends React.Component {

  constructor(props) {
    super(props);

    captchaSettings.set({
      captchaEndpoint: 
        'https://your-app-backend-hostname.your-domain.com/botdetect-captcha-lib/simple-botdetect.php'
    });
  }
  ...
}

export default App;
```

##### 3) Import React Captcha Component and Display Captcha In Your View

```js
import { Captcha } from 'reactjs-captcha';

class App extends React.Component {

  ...

  render() {
    return (
      <Captcha captchaStyleName="yourFirstCaptchaStyle"
      ref={(captcha) => {this.captcha = captcha}} />
      <input id="yourFirstCaptchaUserInput" type="text" />
    )
  }

}
```

##### 4) Captcha Validation: Client-side Code

```js
// process the yourFormWithCaptcha on submit event
yourFormWithCaptchaOnSubmitHandler(event) {

  // the user-entered captcha code value to be validated at the backend side
  let userEnteredCaptchaCode = this.captcha.getUserEnteredCaptchaCode();

  // the id of a captcha instance that the user tried to solve
  let captchaId = this.captcha.getCaptchaId();

  let postData = {
    userEnteredCaptchaCode: userEnteredCaptchaCode,
    captchaId: captchaId
  };

  let self = this;

  // post the captcha data to the /your-app-backend-path on your backend.
  // make sure you import the axios in this view with: import axios from 'axios';
  axios.post(
    'https://your-app-backend-hostname.your-domain.com/your-app-backend-path',
    postData, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
      .then(response => {
        if (response.data.success == false) {
          // captcha validation failed; reload image
          self.captcha.reloadImage();
          // TODO: maybe display an error message, too
        } else {
          // TODO: captcha validation succeeded; proceed with your workflow
        }
      });

  event.preventDefault();
}
```

##### 5) Captcha Validation: Server-side Code

The `userEnteredCaptchaCode` and `captchaId` values posted from the frontend are used to validate a captcha challenge on the backend.

The validation is performed by calling the: `Validate(userEnteredCaptchaCode, captchaId)`.

- Server-side captcha validation with [ASP.NET Captcha](https://captcha.com/asp.net-captcha.html) is performed in the following way:
```csharp
// C#
SimpleCaptcha yourFirstCaptcha = new SimpleCaptcha();
bool isHuman = yourFirstCaptcha.Validate(userEnteredCaptchaCode, captchaId);
```
```vbnet
' VB.NET
Dim yourFirstCaptcha As SimpleCaptcha = New SimpleCaptcha()
Dim isHuman As Boolean = yourFirstCaptcha.Validate(userEnteredCaptchaCode, captchaId)
```

- Server-side captcha validation with [Java Captcha](https://captcha.com/java-captcha.html) is performed in the following way:
```java
SimpleCaptcha yourFirstCaptcha = SimpleCaptcha.load(request);
boolean isHuman = yourFirstCaptcha.validate(userEnteredCaptchaCode, captchaId);
```

- Server-side captcha validation with [PHP Captcha](https://captcha.com/php-captcha.html) is performed in the following way:
```php
$yourFirstCaptcha = new SimpleCaptcha();
$isHuman = $yourFirstCaptcha->Validate($userEnteredCaptchaCode, $captchaId);
```

### Documentation:

1. [React Captcha Component Step-by-step Integration Guide](https://captcha.com/react-captcha.html) -- read this one first

2. [React Captcha Component Basic Example](https://captcha.com/doc/react/examples/react-basic-captcha-example.html) -- partial code walk-through

3. [React Captcha Component Form Example](https://captcha.com/doc/react/examples/react-form-captcha-example.html) -- partial code walk-through


### Dependencies:

The current version of the React Captcha Component requires one of the following BotDetect CAPTCHA backends:
- [ASP.NET v4.4.2+](https://captcha.com/asp.net-captcha.html)
- [Java v4.0.Beta3.7+](https://captcha.com/java-captcha.html)
- [PHP v4.2.5+](https://captcha.com/php-captcha.html)

### Technical Support:

Through [contact form on captcha.com](https://captcha.com/contact.html).