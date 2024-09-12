export const getAvailableProducts = async ({ page, size, sort }) => {
  let url = `${getBaseUrl()}/products/available?page=${page}&size=${size}`;
  if (sort) {
    url += `&sort=${sort}`;
  }
  const response = await fetch(url);

  const responseBody = await response.json();
  return responseBody;
};

const getBaseUrl = () => {
  return process.env.BASE_BE_URL || "http://localhost:8080/api/v1";
};