export const API_KEY = `AIzaSyBUmbWFpPSZef2rRjvN8WIWo_nu2wDxD3I`;

export const value_converter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};
