const useArrayTrim = (input, trimLength) => {
  if (typeof input === "string") {
    let converted = input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    if (converted.length >= trimLength) {
      let trimmedArr = converted.slice(0, trimLength);
      return trimmedArr;
    }
    return converted;
  }
  if (input.length >= trimLength) {
    let trimmedArr = input.slice(0, trimLength);
    return trimmedArr;
  }
  return input;
};

export default useArrayTrim;
