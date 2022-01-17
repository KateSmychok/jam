import imgSmall from '../img/small.svg';
import imgMid from '../img/mid.svg';
import imgBig from '../img/big.svg';

export const choosePot = (amount) => {
  let img;
  if (amount <= 500) {
    img = imgSmall;
  } else if (amount > 500 && amount < 1000) {
    img = imgMid;
  } else {
    img = imgBig;
  }
  return img;
};
