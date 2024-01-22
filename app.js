import * as cheerio from "cheerio";
import axios from "axios";
// Inputs
const URL = "https://cheerio.js.org/";
const CSS_SELECTOR = "h1.hero__title";

async function printTextFromCssSelector(url, cssSelector) {
  try {
    if (!url || !cssSelector) {
      throw new Error("💥Spotted an empty input💥");
    }
    // DEV: I wanted to make it full by cheerio using fromURL method, but it came out it's not available yet. Even to it's in their docs
    // That's why i had to scrap the website using axios and then work on it using Cheerio
    // More info: https://github.com/cheeriojs/cheerio/issues/3391

    const response = await axios.get(url);
    const html = response.data;
    if (!response || !html) {
      throw new Error(`💥Unable to get html data from ${url}💥`);
    }

    const $ = cheerio.load(html);
    if (!$) {
      throw new Error(`💥Unable to load html data from ${url}💥`);
    }
    const text = $(cssSelector).text();
    if (!text) {
      throw new Error(`💥No element found with a ${cssSelector} selector. Try a different one💥`);
    }
    console.log(text);
  } catch (error) {
    console.error(error.message);
  }
}
printTextFromCssSelector(URL, CSS_SELECTOR);
