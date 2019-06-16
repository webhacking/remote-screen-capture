import { Observable } from 'rxjs';
import { OptionsInterface } from './interface/options.interface';
export declare class RemoteScreenCapture {
    private getDriver;
    static take(URI: string, options?: OptionsInterface): Observable<string>;
}
