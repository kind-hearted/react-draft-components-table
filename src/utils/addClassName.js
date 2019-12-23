function addClassName(props, className) {
  const result = {};

  for (let key in props) {
    result[key] = props[key];
  }

  result.className = [className, result.className].join(' ');

  return result;
};

export default addClassName;