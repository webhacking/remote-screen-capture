"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var chrome = require("selenium-webdriver/chrome");
var chromeDriver = require("chromedriver");
var selenium_webdriver_1 = require("selenium-webdriver");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var RemoteScreenCapture = (function () {
    function RemoteScreenCapture() {
    }
    RemoteScreenCapture.prototype.getDriver = function () {
        chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());
        return rxjs_1.of(new selenium_webdriver_1.Builder()
            .withCapabilities(selenium_webdriver_1.Capabilities.chrome())
<<<<<<< HEAD
            .setChromeOptions(new chrome.Options().headless().addExtensions().addExtensions('--kiosk'))
=======
            .setChromeOptions(new chrome.Options().headless().addExtensions().addArguments('--no-sandbox').addArguments('--disable-dev-shm-usage'))
>>>>>>> ee9a337dede61c805d045b2a04a7e23f34878f30
            .build());
    };
    RemoteScreenCapture.take = function (URI, options) {
        return (new RemoteScreenCapture()).getDriver().pipe(operators_1.concatMap(function (driver) {
            return rxjs_1.from(driver.manage().window().setRect({
                width: options && options.width ? options.width : 2880,
                height: options && options.height ? options.height : 1800
            })).pipe(operators_1.concatMap(function () { return rxjs_1.from(driver.get(URI)); }), operators_1.concatMap(function () { return rxjs_1.from(driver.takeScreenshot()); }), operators_1.tap(function () { return rxjs_1.from(driver.close()); }));
        }), operators_1.map(function (encodedPngChunks) {
            if (options && options.savePath) {
                var absoluteSavePath = options.savePath + "/" + new Date().getTime() + ".png";
                fs.writeFileSync(absoluteSavePath, encodedPngChunks, 'base64');
                return absoluteSavePath;
            }
            return encodedPngChunks;
        }));
    };
    return RemoteScreenCapture;
}());
exports.RemoteScreenCapture = RemoteScreenCapture;
//# sourceMappingURL=remote-screen-capture.js.map