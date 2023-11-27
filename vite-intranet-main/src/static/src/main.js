export const isDevelopment = process.env.NODE_ENV == "development";
export const apiPath = isDevelopment ? "https://service-ktir.dpc.tax.nalog.ru" : "";
