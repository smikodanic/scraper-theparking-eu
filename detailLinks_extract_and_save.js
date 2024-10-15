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
      await echo.warn(` record exists: ${car_info.car_detail_url}`);
      continue;
    }


    // open car detail URL
    const url = car_info.car_detail_url;
    if (!url.includes('used-cars-detail')) { continue; }
    await echo.log(`  ...opening ${url}`);
    await page2.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 8000
    }).catch(err => console.log(err.message));

    // wait to load content
    await ff.delayRnd(2100, 5500);

    // extract details
    const html = await page2.content();
    const $ = cheerio.load(html);

    // redirect_url
    let href = $('div.titre-new-detail>h1>a').attr('href');
    if (!href.includes('http')) { href = 'https://www.theparking.eu' + href; }
    if (href) { car_info.redirect_url = href; }

    // color
    car_info.color = $('ul.list-info-detail>.line-info-bloc:nth-of-type(2)>li:nth-of-type(1)').text() ?? '';
    car_info.color = car_info.color.replace(/color/ig, '').trim().toLowerCase().replace('unknown', '');

    // doors
    car_info.doors = $('ul.list-info-detail>.line-info-bloc:nth-of-type(3)>li:nth-of-type(1)').text() ?? '';
    car_info.doors = car_info.doors.replace(/doors/ig, '').trim().toLowerCase().replace('unknown', '');

    // category
    car_info.category = $('ul.list-info-detail>.line-info-bloc:nth-of-type(3)>li:nth-of-type(2)').text() ?? '';
    car_info.category = car_info.category.replace(/category/ig, '').trim().toLowerCase().replace('unknown', '');

    // ad_title
    car_info.ad_title = $('h2.descri-part').text()?.trim() ?? '';


    /*** Save to "cars" table ***/
    let totalCars;
    try {
      await upsertCar(car_info, lib);
      totalCars = await countCars();
    } catch (err) {
      await echo.error(err);
    }

    // debug
    await echo.warn(` cars total in db: ${totalCars}`);
    await echo.log(`${i}. ${car_info.make} | ${car_info.model} | ${car_info.version} | ${car_info.color} | ${car_info.doors} | ${car_info.category} | ${car_info.ad_title}`);
    await echo.log();

    i++;
  }

  // close tab
  await page2.close();

  return x;
};



const upsertCar = async (car_info, lib) => {
  const { echo, postgreSQL } = lib;

  const carsMD = postgreSQL.sequelize.models['carsMD'];
  const result_arr = await carsMD.upsert(car_info);
  const result_obj = result_arr[0];
  // console.log(result_obj);

  if (result_obj.isNewRecord) {
    await echo.warn(' \u2713 saved new doc_id: ', result_obj.dataValues.car_id);
  } else {
    await echo.warn(' \u2713 updated doc_id: ', result_obj.dataValues.car_id);
  }
};


const carExists = async (car_detail_url, lib) => {
  const { echo, postgreSQL } = lib;

  const carsMD = postgreSQL.sequelize.models['carsMD'];

  const record = await carsMD.findOne({
    where: { car_detail_url }
  });

  return !!record;
};


const countCars = async (lib) => {
  const { echo, postgreSQL } = lib;
  const carsMD = postgreSQL.sequelize.models['carsMD'];
  const totalCars = await carsMD.count();
  return totalCars;
};
