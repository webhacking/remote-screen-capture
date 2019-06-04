import * as fs from 'fs';
import * as chrome from 'selenium-webdriver/chrome';
import * as chromeDriver from 'chromedriver';
import { Builder, Capabilities } from 'selenium-webdriver';
import { from, of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
export default class RemoteScreenCapture {
    getDriver() {
        chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());
        return of(new Builder()
            .withCapabilities(Capabilities.chrome())
            .setChromeOptions(new chrome.Options()
            .addExtensions())
            .build());
    }
    static take(URI, savePath) {
        return (new RemoteScreenCapture).getDriver().pipe(concatMap((driver) => {
            return from(driver.get(URI)).pipe(concatMap(() => from(driver.takeScreenshot())), tap(() => from(driver.close())));
        }), map((encodedPngChunks) => {
            if (savePath) {
                const absoluteSavePath = `${savePath}/${new Date().getTime()}.png`;
                fs.writeFileSync(absoluteSavePath, encodedPngChunks, 'base64');
                return absoluteSavePath;
            }
            return encodedPngChunks;
        }));
    }
}
//# sourceMappingURL=remote-screen-capture.js.map