import { ThenableWebDriver } from 'selenium-webdriver';
import { Observable } from 'rxjs';
import { OptionsInterface } from './interface/options.interface';
export declare class RemoteScreenCapture {
    getDriver(): Observable<ThenableWebDriver>;
    static take(URI: string, options?: OptionsInterface): Observable<string | void>;
}
