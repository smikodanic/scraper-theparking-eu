module.exports = async (x, lib) => {
  const echo = lib.echo;
  const ff = lib.ff;
  const page = lib.page;
  // const searchpage_url = x.searchpage_url;

  await echo.log('----- searchResults_next -----');

  // close the advert - https://www.theparking.eu/#google_vignette
  const ins_EH = await page.waitForSelector('ins', { timeout: 2100 }).catch(err => { echo.log(' no advert popup'); });
  if (ins_EH) {
    await page.evaluate(() => {
      const el = document.querySelector('ins');
      el.style.display = 'none';
    });
    await echo.log(' closed advert popup');
  }
  await ff.delay(1300);
  // await page.$eval('ins', el => {
  //   console.log('el:::', el);
  //   el.style.display = 'none';
  // });
  // await page.click('div.wrap-header');
  // await ff.delay(1300);
  // await page.click('div.wrap-header');
  // await echo.log(' closed advert');


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
