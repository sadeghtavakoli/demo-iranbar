import http from "./httpService";

const apiEndpoint = "CustomerApi/AddCustomer";

export async function RegisterCustomer(customer) {
  try {
    return await http.post(apiEndpoint, customer);
  } catch (error) {
    console.error(error);
  }
}
