/**
 * Open detail links "x.car_infos.car_detail_url" which has "used-car-detail" in the URL, for example https://www.theparking.eu/used-cars-detail/volkswagen-golf-gte/139g-co2-km-komb-6-147l-100km-komb/A2FVZVFZ.html
 * and extract redirect_url, color, doors, category, ad_title
 */
module.exports = async (x, lib) => {
  const echo = lib.echo;
  const ff = lib.ff;
  const cheerio = lib.cheerio;
  const browser = lib.browser;

  await echo.log('----- detailLinks_extract_and_save -----');

  const page2 = await browser.newPage(); // open another tab

  let i = 1;
  for (const car_info of x.car_infos) {
    // check if record exists in "cars" table
    const record_exists = await carExists(car_info.car_detail_url, lib);
    if (record_exists) {
      await echo.warn(`${i}. record exists: ${car_info.car_detail_url}`);
      i++;
      continue;
    }


    // open car detail URL
    const url = car_info.car_detail_url;
    if (!url.includes('used-cars-detail')) { continue; }
    await echo.log(`  ...opening ${url}`);
    await page2.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 13000
    }).catch(err => echo.error(err));

    // wait to load content
    await ff.delayRnd(4000, 8000);

    // extract details
    await page2.waitForSelector('body').catch(err => echo.warn(err.message));
    const html = await page2.content().catch(err => echo.error(err));
    if (!html) { continue; }
    const $ = cheerio.load(html);

    // redirect_url
    let href = $('div.titre-new-detail>h1>a').attr('href');
    if (!href.includes('http')) { href = 'https://www.theparking.eu' + href; }
    if (href) { car_info.redirect_url = href; }

    // external url - the URL with car detail info
    car_info.external_url = null;

    // color
    car_info.color = $('ul.list-info-detail>.line-info-bloc:nth-of-type(2)>li:nth-of-type(1)').text() ?? '';
    car_info.color = car_info.color.replace(/color/ig, '').trim().toLowerCase().replace('unknown', '');


    // doors or category
    const data1 = $('ul.list-info-detail>.line-info-bloc:nth-of-type(3)>li:nth-of-type(1)').text() ?? '';
    const data2 = $('ul.list-info-detail>.line-info-bloc:nth-of-type(3)>li:nth-of-type(2)').text() ?? '';

    if (/doors/i.test(data1)) { car_info.doors = data1.replace(/doors/ig, '').trim().toLowerCase().replace('unknown', ''); }
    else if (/doors/i.test(data2)) { car_info.doors = data2.replace(/doors/ig, '').trim().toLowerCase().replace('unknown', ''); }
    else { car_info.doors = null; }

    if (/category/i.test(data1)) { car_info.category = data1.replace(/category/ig, '').trim().toLowerCase().replace('unknown', ''); }
    else if (/category/i.test(data2)) { car_info.category = data2.replace(/category/ig, '').trim().toLowerCase().replace('unknown', ''); }
    else { car_info.category = null; }


    // ad_title
    car_info.ad_title = $('h2.descri-part').text()?.trim() ?? '';


    /*** Save to "cars" table ***/
    let totalCars;
    try {
      await upsertCar(car_info, lib);
      totalCars = await countCars(lib);
    } catch (err) {
      console.log(err);
      await echo.error(err);
    }

    // debug
    await echo.warn(` "cars" count: ${totalCars}`);
    await echo.log(`${i}. ${car_info.make} | ${car_info.model} | ${car_info.version} | ${car_info.color} | ${car_info.doors} | ${car_info.category} | ${car_info.year} | ${car_info.mileage_km} km | ${car_info.price} € | ${car_info.location} | ${car_info.ad_title}`);
    await echo.log();

    i++;
  }

  // close tab
  await page2.close();

  return x;
};



const upsertCar = async (car_info, lib) => {
  const { echo, postgreSQL } = lib;
  const scraper_theparking_euMD = postgreSQL.sequelize.models['scraper_theparking_euMD'];
  const result_arr = await scraper_theparking_euMD.upsert(car_info);
  const result_obj = result_arr[0];
  // console.log(result_obj);
  await echo.warn(' \u2713 saved new doc_id:', result_obj.dataValues.car_id);
};


const carExists = async (car_detail_url, lib) => {
  const { postgreSQL } = lib;
  const scraper_theparking_euMD = postgreSQL.sequelize.models['scraper_theparking_euMD'];
  const record = await scraper_theparking_euMD.findOne({
    where: { car_detail_url }
  });
  return !!record;
};


const countCars = async (lib) => {
  const { postgreSQL } = lib;
  const scraper_theparking_euMD = postgreSQL.sequelize.models['scraper_theparking_euMD'];
  const totalCars = await scraper_theparking_euMD.count();
  return totalCars;
};
