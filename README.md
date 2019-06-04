## Remote Screen Capture
> Capture screenshots from url.
<p align="left">
<a href="https://travis-ci.org/webhacking/remote-screen-capture"><img src="https://travis-ci.org/webhacking/remote-screen-capture.svg?branch=master" alt="Build Status"></a>
<a href="https://codecov.io/gh/webhacking/remote-screen-capture"><img src="https://codecov.io/gh/webhacking/remote-screen-capture/branch/master/graph/badge.svg" /></a>
</p>


It uses [Selenium](https://www.seleniumhq.org/)(Chrome) under the hood.

## Install
Using npm:
```
npm install remote-screen-capture
```

Using yarn:
```
yarn add remote-screen-capture
```

## Usage
> *NOTE:* If you using ES6+ just import statements

Promise-based:
```javascript
// Or 
const RemoteScreenCapture = require('remote-screen-capture').RemoteScreenCapture;

// If you want to encoded data
RemoteScreenCapture.take('https://www.google.com').toPromise().then(chunks => {
  console.log('Base64 Encoded Chunks', chunks);
});

// If you want to save image locally
RemoteScreenCapture.take('https://www.google.com', './images').toPromise().then(savePath => {
  console.log(`Saved to: ${savePath}`);
});

// Synchronous
const saveFilePath = await RemoteScreenCapture.take('https://www.google.com', './images').toPromise();
```

Observable-based:
```javascript
const RemoteScreenCapture = require('remote-screen-capture').RemoteScreenCapture;

// If you want to encoded data
RemoteScreenCapture.take('https://www.google.com').subscribe(chunks => {
  console.log('Base64 Encoded Chunks', chunks);
});

// If you want to save image locally
RemoteScreenCapture.take('https://www.google.com', './images').subscribe(savePath => {
  console.log(`Saved to: ${savePath}`);
});
```

## API
- take(URI: string, savePath?: string)

## Where do I go for help?
If you need, open an issue.


## Tests
`npm test` runs the jest tests.

`npm run-script coverage` runs the tests and reports code coverage.

#Contributing

If you want to contribute to the project (awesome!!), just pull request.







