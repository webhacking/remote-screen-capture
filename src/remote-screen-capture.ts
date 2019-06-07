import * as fs from 'fs';
import * as chrome from 'selenium-webdriver/chrome';
import  * as chromeDriver from 'chromedriver';
import {ThenableWebDriver, Builder, Capabilities} from 'selenium-webdriver';
import {from, of, Observable} from 'rxjs';
import {concatMap, map, tap} from 'rxjs/operators';
import {OptionsInterface} from './interface/options.interface';

export class RemoteScreenCapture {
  public getDriver(): Observable<ThenableWebDriver> {
    chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());
    return of(new Builder()
      .withCapabilities(Capabilities.chrome())
      .setChromeOptions(
        new chrome.Options().headless().addExtensions()
      )
      .build()
    );
  }

  public static take(URI: string, options?: OptionsInterface): Observable<string | void> {
    return (new RemoteScreenCapture).getDriver().pipe(
      concatMap((driver: ThenableWebDriver) => {
        return from(driver.manage().window().setRect({
          width: options && options.width ? options.width : 2880,
          height: options && options.height ? options.height : 1800
        })).pipe(
          concatMap(() => from(driver.get(URI))),
          concatMap(() => from(driver.takeScreenshot())),
          tap(() => from(driver.close()))
        )
      }),
      map((encodedPngChunks) => {
        if (options && options.savePath) {
          const absoluteSavePath = `${options.savePath}/${new Date().getTime()}.png`;
          fs.writeFileSync(absoluteSavePath, encodedPngChunks, 'base64');
          return absoluteSavePath;
        }
        return encodedPngChunks;
      })
    );
  }
}