import puppeteer from "puppeteer";
import "dotenv/config";
import { log } from "./utils.js";
import { sendMessages } from "./services.js";
import { settings } from "./settings.js";

const URL = "https://www.allaccess.com.ar/event/taylor-swift-the-eras-tour";
const browser = await puppeteer.launch({ headless: "new" });
let intervalCount = 0;
let sendedMessageCount = 0;

const check = async () => {
  log(`Interval ${(intervalCount += 1)}`);
  const page = await browser.newPage();
  await page.goto(URL);
  const element = await page.waitForSelector("#picker-bar > div > div > div");
  const text = await element.evaluate((el) => el.textContent);

  if (text === "Agotado") {
    log("No hay entradas");
    await page.close();
    return;
  }

  log("Hay entradas");
  if (sendedMessageCount >= 5) {
    await page.close();
    log("Se envio la cantidad maxima de mensajes");
    return;
  }

  await Promise.all(sendMessages());
  log("Mensajes enviados");
  sendedMessageCount += 1;
  await page.close();
};

const init = () => {
  log("Started");

  check();

  setInterval(() => {
    check();
  }, settings.intervalTime);
};

init();
