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
            .setChromeOptions(new chrome.Options()
            .addExtensions())
            .build());
    };
    RemoteScreenCapture.take = function (URI, savePath) {
        return (new RemoteScreenCapture).getDriver().pipe(operators_1.concatMap(function (driver) {
            return rxjs_1.from(driver.get(URI)).pipe(operators_1.concatMap(function () { return rxjs_1.from(driver.takeScreenshot()); }), operators_1.tap(function () { return rxjs_1.from(driver.close()); }));
        }), operators_1.map(function (encodedPngChunks) {
            if (savePath) {
                var absoluteSavePath = savePath + "/" + new Date().getTime() + ".png";
                fs.writeFileSync(absoluteSavePath, encodedPngChunks, 'base64');
                return absoluteSavePath;
            }
            return encodedPngChunks;
        }));
    };
    return RemoteScreenCapture;
}());
exports.default = RemoteScreenCapture;
//# sourceMappingURL=remote-screen-capture.js.map