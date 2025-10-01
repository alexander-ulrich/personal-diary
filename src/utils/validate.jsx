import { getLocalStorageData } from "./localStorageData";

export const validate = async ({ title, date, img, content }) => {
  const newErrors = {};
  const entries = getLocalStorageData("diary");
  if (entries.map((entry) => entry.date === date))
    newErrors.duplicate = "Date already has an Entry, come back tomorrow!";
  if (!title.trim()) newErrors.title = "Title is required.";
  if (!date.trim()) {
    newErrors.date = "Date is required.";
  }
  if (!img.trim()) {
    newErrors.img = "Image is required.";
  }
  if (!content.trim()) newErrors.content = "Entry is required.";
  return newErrors;
};
export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
