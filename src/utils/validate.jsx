import { getLocalStorageData } from "./localStorageData";

export const validate = async ({ title, date, img, content }) => {
  const newErrors = {};
  const entries = (await getLocalStorageData("diary")) || [];

  if (!title.trim()) newErrors.title = "Title is required.";
  if (!date.trim()) {
    newErrors.date = "Date is required.";
  } else {
    entries.map((entry) => {
      if ((entry.date !== undefined) | null && entry.date === date) {
        console.log("Entry Date: " + entry.date, "Input Date: " + date);
        newErrors.duplicate = "Entry already exists, come back tomorrow!";
      }
    });
  }

  if (!img.trim()) {
    newErrors.img = "Image is required.";
  }
  if (!content.trim()) newErrors.content = "Entry is required.";
  console.log(newErrors);
  return newErrors;
};
export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
