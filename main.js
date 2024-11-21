const FunctionFlow = require('@mikosoft/functionflow');
const Echo = require('@mikosoft/echo');
const puppeteer = require('puppeteer-core');
const cheerio = require('cheerio');

// libs
const lib_time = require('./lib_time.js');
const lib_text = require('./lib_text.js');
const countriesJson = require('./countries.json');


// functions
const PostgreSQL = require('./PostgreSQL.js');
const browserPage = require('./browserPage.js');
const browserClose = require('./browserClose.js');
const homepageOpen = require('./homepageOpen.js');
const searchResults_gotoPage = require('./searchResults_gotoPage.js');
const searchResults_extract = require('./searchResults_extract.js');
const detailLinks_extract_and_save = require('./detailLinks_extract_and_save.js');
const searchResults_next = require('./searchResults_next.js');



module.exports = async (input, inputSecret) => {
  if (!input) { throw new Error('Input is required.'); }

  /* define x */
  const x = {
    searchpage_num: 1,
    searchpage_url: '', // https://www.theparking.eu/used-cars/VW-caddy.html
    car_infos: [] // [{searchpage_num, searchpage_url, car_detail_url, redirect_url, make, model, version,  date_published, location, fuel, mileage, year, transmission,   color, doors, category, ad_title}, ...]
  };


  /* define lib */
  const eventEmitter = global.dex8.eventEmitter;
  const ff = new FunctionFlow({ debug: false, msDelay: 1300 }, eventEmitter);
  const echo = new Echo(true, 130, eventEmitter);

  // PostgreSQL
  const { PG_DATABASE, PG_USERNAME, PG_PASSWORD, PG_HOST, PG_PORT } = inputSecret;
  const postgreSQL = new PostgreSQL(PG_DATABASE, PG_USERNAME, PG_PASSWORD, PG_HOST, PG_PORT, false, { force: false }, 'postgres');


  /* FF injections */
  const lib = { input, inputSecret, puppeteer, echo, ff, cheerio, lib_time, lib_text, postgreSQL, countriesJson };
  ff.xInject(x);
  ff.libInject(lib);


  /* process */
  let output;
  try {
    await ff.one(browserPage);
    await ff.one(homepageOpen);
    await ff.one(searchResults_gotoPage);

    await ff.serial([
      searchResults_extract,
      detailLinks_extract_and_save,
      searchResults_next]);
    output = await ff.repeat(input.max_search_pages);

  } catch (err) {
    echo.error(err);
    throw err;
  } finally {
    setTimeout(() => {
      ff.one(browserClose);
    }, 10000);
  }

  return output;
};
