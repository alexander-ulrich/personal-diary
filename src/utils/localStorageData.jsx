export function getLocalStorageData(key) {
  return JSON.parse(localStorage.getItem(key));
}

export async function setLocalStorageData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  return "Entry has been added to Diary!";
}
