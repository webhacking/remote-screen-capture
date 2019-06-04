import * as fs from 'fs';
import * as chrome from 'selenium-webdriver/chrome';
import  * as chromeDriver from 'chromedriver';
import {ThenableWebDriver, Builder, Capabilities} from 'selenium-webdriver';
import {from, of, Observable} from 'rxjs';
import {concatMap, map, tap} from 'rxjs/operators';

export class RemoteScreenCapture {
  public getDriver(): Observable<ThenableWebDriver> {
    chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());
    return of(new Builder()
      .withCapabilities(Capabilities.chrome())
      .setChromeOptions(
        new chrome.Options()
          .addExtensions()
      )
      .build());
  }

  public static take(URI: string, savePath?: string): Observable<string | void> {
    return (new RemoteScreenCapture).getDriver().pipe(
      concatMap((driver: ThenableWebDriver) => {
        return from(driver.get(URI)).pipe(
          concatMap(() => from(driver.takeScreenshot())),
          tap(() => from(driver.close()))
        )
      }),
      map((encodedPngChunks) => {
        if (savePath) {
          const absoluteSavePath = `${savePath}/${new Date().getTime()}.png`;
          fs.writeFileSync(absoluteSavePath, encodedPngChunks, 'base64');
          return absoluteSavePath;
        }
        return encodedPngChunks;
      })
    );
  }
}