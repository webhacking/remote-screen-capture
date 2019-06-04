import {RemoteScreenCapture} from './remote-screen-capture';
import {Observable} from 'rxjs/internal/Observable';

describe('Testing extended expect', () => {
  it('Capture from dummy website', () => {
    const targetEndPoint = 'https://www.hax0r.info';
    expect(RemoteScreenCapture.take(targetEndPoint))
      .toBeInstanceOf(Observable)
  })
});
