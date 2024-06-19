import { Recipe } from '@/app/type';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const handleManual = (recipe: Recipe) => {
  const manual: { index: number; text: string; img: string }[] = [];
  const manualText: { index: number; text: string }[] = [];
  const manualImg: { index: number; img: string }[] = [];

  Object.entries(recipe).forEach(([key, value]) => {
    if (key.includes('MANUAL')) {
      if (value !== '') {
        !key.includes('IMG')
          ? manualText.push({ index: parseInt(key.replace('MANUAL', '')), text: value })
          : manualImg.push({ index: parseInt(key.replace('MANUAL_IMG', '')), img: value });
      }
    }
  });

  manualText.forEach((item) => {
    manualImg.forEach((image) => {
      if (item.index === image.index) manual.push({ index: item.index, text: item.text, img: image.img });
    });
  });

  manual.sort((a, b) => a.index - b.index);

  return manual;
};

export const verifyNumber = (value: string, totalPage: number, currentPage: number) => {
  const isNumRegex = /^[0-9]*$/;
  if (isNumRegex.test(value)) {
    if (Number(value) > totalPage) return currentPage;
    if (Number(value) < 1) return currentPage;
    return Number(value);
  }
  return currentPage;
};
