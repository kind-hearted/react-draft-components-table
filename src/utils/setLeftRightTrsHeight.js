function setLeftRightTrsHeight(baseTableRef, leftTableRef, rightTableRef, selector) {
  const baseTrs = baseTableRef.current.querySelectorAll(selector);
  const leftTrs = leftTableRef.current.querySelectorAll(selector);
  const rightTrs = rightTableRef.current.querySelectorAll(selector);

  for (let i = 0, ilen = baseTrs.length; i < ilen; i++) {
    const height = getElementHeight(baseTrs[i]);

    if (leftTrs[i]) {
      leftTrs[i].style.height = height + 'px';
    }

    if (rightTrs[i]) {
      rightTrs[i].style.height = height + 'px';
    }
  }
}

function getElementHeight(element) {
  if (element.getBoundingClientRect) {
    return element.getBoundingClientRect().height;
  }

  return element.offsetHeight;
}

export default setLeftRightTrsHeight;