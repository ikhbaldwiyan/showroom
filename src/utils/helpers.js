export const getLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  return JSON.parse(data) ?? {}
}