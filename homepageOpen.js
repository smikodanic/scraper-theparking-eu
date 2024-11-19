module.exports = async (x, lib) => {
  const echo = lib.echo;
  const ff = lib.ff;
  const page = lib.page;
  const search_term = lib.input.search_term ?? '';


  await echo.log('----- homepageOpen -----');
  if (!search_term) { throw new Error('The "search_term" is not defined in the input JSON file'); }

  const url = `https://www.theparking.eu`;
  await echo.log(` ...opening home page "${url}"`);

  await page.goto(url, {
    waitUntil: 'load',
    timeout: 3000
  }).catch(err => echo.error(err));

  await echo.log(' ...reload home page');
  await page.reload();

  const accept_EH = await page.waitForSelector('button > span[tabindex="-1"]', { timeout: 3400 }).catch(err => echo.error(err));
  if (accept_EH) {
    await echo.log(' clicked "Do not accept"');
    await accept_EH.click();
  }

  const agree_EH = await page.waitForSelector('button[mode="primary"]', { timeout: 3400 }).catch(err => echo.error(err));
  if (agree_EH) {
    await echo.log(' clicked "Agree" button');
    await agree_EH.click();
  }

  await ff.delay(1300);

  // type search term
  await echo.log(` type search term: "${search_term}"`);
  await page.type('input#inputString', search_term, { delay: 30 });


  return x;
};
