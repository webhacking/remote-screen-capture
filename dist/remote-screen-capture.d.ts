import { ThenableWebDriver } from 'selenium-webdriver';
import { Observable } from 'rxjs';
export default class RemoteScreenCapture {
    getDriver(): Observable<ThenableWebDriver>;
    static take(URI: string, savePath?: string): Observable<string | void>;
}
