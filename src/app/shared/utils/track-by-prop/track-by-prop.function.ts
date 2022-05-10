export const trackByProp = <T>(propKey: keyof T = 'id' as keyof T) => (
    index: number,
    item: T,
): (keyof T) | T | undefined => {
    if (!item) return;
    if (!propKey) return item;
    // @ts-ignore
    return item[propKey];
};
