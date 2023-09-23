export const TruncatestringTo20 = (inputString: string) => {
  if (inputString?.length < 17) {
    return inputString;
  } else {
    return inputString?.slice(0, 15) + "...";
  }
};
