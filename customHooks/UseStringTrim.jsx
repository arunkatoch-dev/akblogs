const useStringTrim = (string, trimLength) => {
  if (string.length >= trimLength) {
    let shortStr = string.slice(0, trimLength);
    return shortStr;
  }
  return string;
};

export default useStringTrim;
