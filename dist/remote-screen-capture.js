import * as fs from 'fs';
import * as chrome from 'selenium-webdriver/chrome';
import * as chromeDriver from 'chromedriver';
import { Builder, Capabilities } from 'selenium-webdriver';
import { from, of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
var RemoteScreenCapture = (function () {
    function RemoteScreenCapture() {
    }
    RemoteScreenCapture.prototype.getDriver = function () {
        chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());
        return of(new Builder()
            .withCapabilities(Capabilities.chrome())
            .setChromeOptions(new chrome.Options()
            .addExtensions())
            .build());
    };
    RemoteScreenCapture.take = function (URI, savePath) {
        return (new RemoteScreenCapture).getDriver().pipe(concatMap(function (driver) {
            return from(driver.get(URI)).pipe(concatMap(function () { return from(driver.takeScreenshot()); }), tap(function () { return from(driver.close()); }));
        }), map(function (encodedPngChunks) {
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
export default RemoteScreenCapture;
//# sourceMappingURL=remote-screen-capture.js.map