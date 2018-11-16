let Store = {
  storage: {},
  async get(key, maxAge) {
    return this.storage[key];
  },
  set(key, value, maxAge) {
    this.storage[key] = value;
  },
  destroy(key) {
    delete this.storage[key];
  }
};

export default Store;
