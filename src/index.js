import puppeteer from "puppeteer";
import "dotenv/config";
import { log } from "./utils.js";
import { sendMessages } from "./services.js";
import { settings } from "./settings.js";

const check = async ({ browser, test }) => {
  const page = await browser.newPage();
  const url = test
    ? "https://www.facebook.com/permalink.php?story_fbid=pfbid0L2SqVkF7bBmTgvfLFpRd7SpVvRcFwACqkjNTxE9Ub2YAxnZEQSChD9ttS9sQEAgjl&id=100069937458250"
    : "https://www.allaccess.com.ar/event/taylor-swift-the-eras-tour";
  await page.goto(url);

  try {
    let text = null;
    if (test) {
      text = await page.$("text/Agotado");
    } else {
      const element = await page.$("#picker");
      text = await element.$("text/Agotado");
    }
    if (!text.isVisible()) throw new Error("Hay entradas!");
    //No hay entradas
    log("No hay entradas", test);
  } catch (error) {
    //Hay entradas
    log("Hay entradas", test);
    try {
      await Promise.all(sendMessages({ test }));
      log("Mensajes enviados", test);
    } catch (error) {
      log("No se enviaron los mensajes de WSP", test);
    }
  }
};

(() => {
  log("Started");
  let count = 0;
  puppeteer
    .launch({ headless: "new", args: ["--no-sandbox"] })
    .then((browser) => {
      setInterval(() => {
        log(`Interval ${(count += 1)}`);
        check({ browser, test: true });
        check({ browser, test: false });
      }, settings.intervalTime);
    });
})();
