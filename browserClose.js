module.exports = async (x, lib) => {
  const ff = lib.ff;
  const browser = lib.browser;
  const echo = lib.echo;

  echo.log('--- browserClose ---');

  await ff.delay(1300);
  await browser.close();
  echo.log('Browser closed.');

  return x;
};
