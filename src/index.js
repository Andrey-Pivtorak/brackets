module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) {
    return false;
  }

  const last = (arr) => arr[arr.length - 1];

  const isCloseBracket = (bracket) => !!bracketsConfig
    .find(([openBracket, closeBracket]) => bracket === closeBracket);

  const closeToOpenBracketsMap = bracketsConfig.reduce((acc, current) => {
    const [openBracket, closeBracket] = current;
    acc[closeBracket] = openBracket;
    return acc;
  }, {});

  const resultStack = [];
  for (const ch of str) {
    const isOpenAndCloseSame = closeToOpenBracketsMap[ch] === ch;
    if (isOpenAndCloseSame) {

      if (last(resultStack) === ch) {
        resultStack.pop();
      } else {
        resultStack.push(ch);
      }

    } else if (isCloseBracket(ch)) {
      const closeBracket = resultStack.pop();
      if (closeToOpenBracketsMap[ch] !== closeBracket) {
        return false;
      }

    } else {
      resultStack.push(ch);
    }
  }

  return resultStack.length === 0;
}
