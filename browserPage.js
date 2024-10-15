const PptrPlus = require('pptr-plus');
const os = require('os');



/**
 * Open the browser and a tab.
 */
module.exports = async (x, lib) => {
  const ff = lib.ff;
  const echo = lib.echo;
  const headless = lib.input.headless;

  /*** start the browser ***/
  // define chrome executable path
  const osPlatform = os.platform(); // possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
  let executablePath;
  if (/^win/i.test(osPlatform)) {
    executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  } else if (/^linux/i.test(osPlatform)) {
    executablePath = '/usr/bin/google-chrome';
  } else if (/^darwin/i.test(osPlatform)) {
    executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }

  const pptrConf = {
    executablePath,
    headless,
    defaultViewport: null, // ensure Puppeteer doesn't override your viewport settings
    args: [
      '--start-maximized', // this flag maximizes the browser window
    ],
    ignoreDefaultArgs: ['--enable-automation'] // remove "Chrome is being controlled by automated test software"
  };
  const browser = await lib.puppeteer.launch(pptrConf).catch(err => echo.error(err));

  /*** open a tab ***/
  // const page = await browser.newPage(); // open page in the second tab
  const page = (await browser.pages())[0]; // open page in the first tab
  await page.bringToFront();


  /*** get screen dimensions using page.evaluate ***/
  const screenDimensions = await page.evaluate(() => {
    return {
      width: window.screen.availWidth,
      height: window.screen.availHeight
    };
  });


  /*** set viewport to the maximum screen dimensions ***/
  await page.setViewport({
    width: screenDimensions.width,
    height: screenDimensions.height
  });


  /*** override navigator.webdriver to false (navigator.languages, navigator.plugins) ***/
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });
  const isWebdriverFalse = await page.evaluate(() => navigator.webdriver === false); // Check if navigator.webdriver is set to false
  console.log('navigator.webdriver is set to false:', isWebdriverFalse);


  /*** pptr-plus ***/
  const pptrPlus = new PptrPlus(page);
  ff.libAdd({ browser, page, pptrPlus });

  return x;
};
