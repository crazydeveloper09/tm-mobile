export const groupBy = <T, K extends PropertyKey>(
  data: T[],
  getKey: (item: T) => K
): Record<K, T[]> => {
  return data.reduce((acc, item) => {
    const key = getKey(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
};