"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const chromeDriver = require("chromedriver");
const selenium_webdriver_1 = require("selenium-webdriver");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class RemoteScreenCapture {
    getDriver() {
        chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());
        return rxjs_1.of(new selenium_webdriver_1.Builder()
            .withCapabilities(selenium_webdriver_1.Capabilities.chrome())
            .setChromeOptions(new chrome.Options()
            .addExtensions())
            .build());
    }
    static take(URI, savePath) {
        return (new RemoteScreenCapture).getDriver().pipe(operators_1.concatMap((driver) => {
            return rxjs_1.from(driver.get(URI)).pipe(operators_1.concatMap(() => rxjs_1.from(driver.takeScreenshot())), operators_1.tap(() => rxjs_1.from(driver.close())));
        }), operators_1.map((encodedPngChunks) => {
            if (savePath) {
                const absoluteSavePath = `${savePath}/${new Date().getTime()}.png`;
                fs.writeFileSync(absoluteSavePath, encodedPngChunks, 'base64');
                return absoluteSavePath;
            }
            return encodedPngChunks;
        }));
    }
}
exports.RemoteScreenCapture = RemoteScreenCapture;
//# sourceMappingURL=remote-screen-capture.js.map