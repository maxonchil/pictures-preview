export const trackByProp = <T>(propKey: string = 'id') => (
    index: number,
    item: T,
): (keyof T) | T | undefined => {
    if (!item) return;
    if (!propKey) return item;
    return item[propKey];
};
