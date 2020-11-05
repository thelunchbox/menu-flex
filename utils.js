function incrementOrWrap(current, length) {
  if (current + 1 >= length) {
    return 0;
  }
  return current + 1;
}

function decrementOrWrap(current, length) {
  if (current - 1 < 0) {
    return length - 1;
  }
  return current - 1;
}

module.exports = {
  incrementOrWrap,
  decrementOrWrap,
};
