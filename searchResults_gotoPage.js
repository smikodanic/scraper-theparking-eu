module.exports = async (x, lib) => {
  const echo = lib.echo;
  const page = lib.page;
  const from_search_page = lib.input.from_search_page;

  if (!from_search_page || from_search_page === 1) { return x; }

  await echo.log('----- searchResults_gotoPage -----');

  // open search results page
  await page.evaluate(from_search_page => {
    window.ctrl.set_pageReload(from_search_page);
  }, from_search_page);

  // update x
  x.searchpage_num = from_search_page;

  await echo.log(`opened search results page: ${from_search_page}`);


  return x;
};
