module.exports = async (x, lib) => {
  const echo = lib.echo;
  const ff = lib.ff;
  const page = lib.page;
  const search_term = lib.input.search_term ?? '';
  const countriesJson = lib.countriesJson;
  const countries = lib.input.countries?.map(country => country.toUpperCase()); // uppercase all countries entered in the input
  const sort_by = lib.input.sort_by;


  await echo.log('----- homepageOpen -----');
  if (!search_term) { throw new Error('The "search_term" is not defined in the input JSON file'); }

  const url = `https://www.theparking.eu`;
  await echo.log(` ...opening home page "${url}"`);

  await page.goto(url, {
    waitUntil: 'load',
    timeout: 21000
  }).catch(err => echo.error(err));

  await echo.log(' ...reload home page');
  await page.reload();

  const accept_EH = await page.waitForSelector('button > span[tabindex="-1"]', { timeout: 3400 }).catch(err => echo.warn(err.message));
  if (accept_EH) {
    await echo.log(' clicked "Do not accept"');
    await accept_EH.click();
  }

  const agree_EH = await page.waitForSelector('button[mode="primary"]', { timeout: 3400 }).catch(err => echo.warn(err.message));
  if (agree_EH) {
    await echo.log(' clicked "Agree" button');
    await agree_EH.click();
  }


  await ff.delay(2100);


  /*** type search term ***/
  await echo.log(` type search term: "${search_term}"`);
  await page.type('input#inputString', search_term, { delay: 30 });


  await ff.delay(3400);


  let current_url = await page.url(); // https://www.theparking.eu/#!/used-cars/vw.html
  current_url = decodeURIComponent(current_url); // https://www.theparking.eu/#!/used-cars/Fiat.html%3Ftri%3Ddate -> https://www.theparking.eu/#!/used-cars/Fiat.html?tri=date

  /*** add country ids in the URL ***/
  if (countries?.length) {
    await echo.log(` selected countries: ${countries}`);
    const id_pays_arr = [];
    for (const [countryJson, id] of Object.entries(countriesJson)) {
      if (countries.includes(countryJson)) { id_pays_arr.push(id); }
    }
    const id_pays_val = id_pays_arr.join('|');
    current_url = current_url.includes('?') ? current_url + `&id_pays=${id_pays_val}` : current_url + `?id_pays=${id_pays_val}`;
  }

  if (!!sort_by) {
    await echo.log(` selected sort_by: "${sort_by}"`);
    current_url = current_url.includes('?') ? current_url + `&tri=${sort_by}` : current_url + `?tri=${sort_by}`;
  }

  if (countries?.length || !!sort_by) {
    await echo.log(` ...opening new URL: ${current_url}`);
    await page.goto(current_url, {
      waitUntil: 'load',
      timeout: 21000
    }).catch(err => echo.error(err));
  }


  return x;
};
