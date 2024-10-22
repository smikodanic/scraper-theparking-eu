module.exports = async (x, lib) => {
  const echo = lib.echo;
  const ff = lib.ff;
  const page = lib.page;
  // const searchpage_url = x.searchpage_url;

  await echo.log('----- searchResults_next -----');

  // close the advert
  await page.click('div.wrap-header');
  await ff.delay(1300);
  await page.click('div.wrap-header');
  await echo.log(' closed advert');



  // go to next page
  const nextLink_EH = await page.waitForSelector('li.btn-next>a', { timeout: 3400 }).catch(err => console.log('WARNING:', err.message));
  if (!nextLink_EH) {
    await echo.log('No next search result page. Stop the scraper.');
    ff.stop();
  } else {
    await nextLink_EH.click();
    x.searchpage_num++;
    await echo.log(` clicked next search page: ${x.searchpage_num}`);
  }

  await ff.delay(3400);

  return x;
};
