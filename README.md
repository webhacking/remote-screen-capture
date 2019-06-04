## Remote Screen Capture
> Capture screenshots from url.

It uses [Selenium](https://www.seleniumhq.org/)(Chrome) under the hood.

## Install
```
npm install remote-screen-capture
```

## Usage

Promise-based:
```javascript
import RemoteScreenCapture from 'remote-screen-capture';

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
import RemoteScreenCapture from 'remote-screen-capture';

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







