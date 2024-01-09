import random from "random-string-gen";
export const randomString = () => {
  return random({
    length: 7,
  });
};
