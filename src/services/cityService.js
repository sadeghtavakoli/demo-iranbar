import http from "./httpService";

const apiEndpoint = "HelperApi/GetAllCities";

export function getAllCities() {
  try {
    return http.get(apiEndpoint);
  } catch (error) {
    console.error(error);
  }
}
