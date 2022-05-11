export const getRandomDelay = (min: number = 0.2, max: number = 0.3): number => {
    return Math.random() * (max - min) + min;
};
