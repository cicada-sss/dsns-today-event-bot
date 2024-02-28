import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

const method = "POST";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const createNote = async (body) => {
  try {
    const response = await fetch("https://pon.icu/api/notes/create", {
      method,
      headers,
      body,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

async function getTodayEvent(page, url) {
  await page.goto(url);
  const result = await page.evaluate(() => {
    const element = document.getElementsByClassName("today-event-wrapper")[0];
    return element ? element.innerText : null;
  });
  return result;
}

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const todayEvent = await getTodayEvent(
      page,
      "https://yuinoid.neocities.org/txt/my_dsns_timeline",
    );

    if (todayEvent) {
      await createNote(
        JSON.stringify({
          i: process.env.MISSKEY_API_KEY,
          text: todayEvent
            .replaceAll(/(@[a-z]+)/gi, "`$1`")
            .replaceAll(/([0-9]{4}.+?日)/gi, "**$1**"),
        }),
      );
    }

    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
