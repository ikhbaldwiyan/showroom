import axios from "axios";
export const getLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  return JSON.parse(data) ?? {}
}

export const getImageBase64 = async (url) => {
  try {
    let image = await axios.get(url, { responseType: "arraybuffer" });
    let data = Buffer.from(image.data).toString("base64");
    return `data:image/jpeg;base64,${data}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    return ""; // Default image or error placeholder
  }
}