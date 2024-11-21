export const buildStyle = (styleList: { style: string; condition: boolean }[]) => {
  return styleList
    .filter((item) => item.condition)
    .map((item) => item.style)
    .join(' ');
};

export const onlyUnique = (value: number, index: number, array: number[]) => {
  return array.indexOf(value) === index;
};