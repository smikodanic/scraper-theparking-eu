module.exports = async (x, lib) => {
  const browser = lib.browser;
  const echo = lib.echo;

  echo.log('--- browserClose ---');

  await browser.close();
  echo.log('Browser closed.');

  return x;
};
