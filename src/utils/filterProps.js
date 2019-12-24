function filterProps(props, IGNORE_KEYS) {
  const nprops = {};

  for (let key in props) {
    if (IGNORE_KEYS.indexOf(key) === -1) {
      nprops[key] = props[key];
    }
  }

  return nprops;
}

export default filterProps;