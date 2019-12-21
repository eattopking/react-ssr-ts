const store = {
  storage: {},
  get(key: string) {
    return (this.storage as any)[key];
  },
  set(key: string, value: string) {
    (this.storage as any)[key] = value;
  },
  destroy(key: string) {
    delete (this.storage as any)[key];
  }
};

export default store;