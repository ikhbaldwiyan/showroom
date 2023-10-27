export const setLocalStorage = (item, data) => {
  localStorage.setItem(item, JSON.stringify(data));
};
