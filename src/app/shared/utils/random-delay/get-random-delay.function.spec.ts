import { getRandomDelay } from '@shared/utils';

describe('#getRandomDelayFunction', () => {
    it('should return value bellow min', () => {
        const results = [...new Array(10)].map(() => getRandomDelay(0.1, 0.2));
        expect(!results.includes(0,1)).toBeTruthy();
    });

    it('should return value bellow max', () => {
        const results = [...new Array(10)].map(() => getRandomDelay(0.1, 0.2));
        expect(!results.includes(0.2)).toBeTruthy();
    });

    it('should generate random numbers', () => {
        const results = [...new Array(10)].map(() => getRandomDelay(0.1, 0.2));
        const isNotSameNumberGenerated = [...new Set(results)].length > 1;
        expect(isNotSameNumberGenerated).toBeTruthy();
    });
});
