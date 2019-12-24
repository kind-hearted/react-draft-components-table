function setLeftRightTrsHeight(baseTableRef, leftTableRef, rightTableRef, selector) {
  let baseTrs = [];

  if (baseTableRef.current) {
    baseTrs = baseTableRef.current.querySelectorAll(selector);
  }

  let leftTrs = [];

  if (leftTableRef.current) {
    leftTrs = leftTableRef.current.querySelectorAll(selector);
  }

  let rightTrs = [];

  if (rightTableRef.current) {
    rightTrs = rightTableRef.current.querySelectorAll(selector);
  }

  for (let i = 0, ilen = baseTrs.length; i < ilen; i++) {
    const height = getElementHeight(baseTrs[i]);

    if (leftTrs[i] && leftTrs[i].offsetHeight !== height) {
      leftTrs[i].style.height = height + 'px';
    }

    if (rightTrs[i] && rightTrs[i].offsetHeight !== height) {
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