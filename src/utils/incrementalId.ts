export const generateIncrementalId = (currentId: string, digits: number) => {
  const paddedId = currentId.padStart(digits, '0');
  return paddedId;
};
