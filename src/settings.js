const apiToken = process.env.API_TOKEN;
const numberId = process.env.NUMBER_ID;
const phones = process.env.PHONES?.split(",") ?? [];
const intervalTime = parseInt(process.env.INTERVAL_TIME || 1000 * 60 * 5);

export const settings = { apiToken, numberId, phones, intervalTime };
