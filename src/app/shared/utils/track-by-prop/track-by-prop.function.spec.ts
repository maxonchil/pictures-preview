import { trackByProp } from '@shared/utils';

describe('#trackByProp', () => {
    let trackFn;

    beforeEach(() => {
        trackFn = trackByProp();
    })

    it('should return undefined if no item', () => {
        expect(trackFn(0, undefined)).toEqual(undefined);
    });

    it('should use "id"  if no propKey passed', () => {
        expect(trackFn(0, { id: 'myId'})).toEqual('myId');
    });

    it('should use propKey and return object value by key', () => {
        const trackFn = trackByProp('customKey');
        expect(trackFn(0, { customKey: 'customValue'})).toEqual('customValue');
    });

    it('should return undefined if no such value by key', () => {
        const trackFn = trackByProp('customKey2');
        expect(trackFn(0, { customKey: 'customValue'})).toEqual(undefined);
    });
});
