module.exports = async (x, lib) => {
  const echo = lib.echo;
  const ff = lib.ff;
  const lib_time = lib.lib_time;
  const lib_text = lib.lib_text;
  const cheerio = lib.cheerio;
  const page = lib.page;


  await echo.log();
  await echo.log(`----- SEARCH PAGE ${x.searchpage_num} -----`);
  await echo.log('----- searchResults_extract -----');

  await ff.delay(2100); // wait to load the content

  x.searchpage_url = await page.url();

  const html = await page.content();
  const $ = cheerio.load(html);

  const searchpage_num = x.searchpage_num;
  const searchpage_url = x.searchpage_url;

  x.car_infos = [];
  $('li.li-result > section.complete-holder').each(function () {
    const car_info = { searchpage_num, searchpage_url };

    // car_detail_url or redirect_url
    let href = $(this).find('a[onclick="tracker.LeadLink(this);"]').attr('href');
    if (!href.includes('http')) { href = 'https://www.theparking.eu' + href; }

    car_info.car_detail_url = '';
    car_info.redirect_url = '';
    if (href.includes('/used-cars-detail/')) { car_info.car_detail_url = href ?? ''; }
    else if (href.includes('/tools/')) { car_info.redirect_url = href ?? ''; }
    else { echo.warn(`Bad href found: ${href}`); return; }

    // make
    car_info.make = $(this).find('h2>a>span:first-child').text() || '';

    // model
    car_info.model = $(this).find('h2>a>span:nth-of-type(2)').text() || '';

    // version
    let version = '';
    $(this).find('h2>a>span:nth-of-type(3)>span').each(function () {
      version += ' ' + $(this).text();
    });
    car_info.version = version.trim();

    // price and price_unit
    let price_and_unit = $(this).find('div.price-block > p.prix').text() || ''; // 1,872 €
    price_and_unit = lib_text.optimise(price_and_unit);
    const price_and_unit_splitted = price_and_unit.split(' ');
    car_info.price_unit = price_and_unit_splitted[1] ?? ''; // €
    car_info.price = price_and_unit_splitted[0] ? +price_and_unit_splitted[0].replace(',', '') : null; // 1872
    if (isNaN(car_info.price)) { car_info.price = null; }

    // image URL
    car_info.image_url = $(this).find('div.figure img[loading="lazy"]').attr('src') || '';


    // date_published
    car_info.date_published = $(this).find('p.btn-publication').text() || '';
    car_info.date_published = lib_time.convertToISO(car_info.date_published);

    // location
    car_info.location = $(this).find('div.location>span.upper').text()?.trim() || '';
    car_info.location = lib_text.capitalize(car_info.location);

    // fuel
    car_info.fuel = $(this).find('div.bigScreen>ul.info.clearfix>li:nth-of-type(1)').text() || '';
    car_info.fuel = lib_text.optimise(car_info.fuel).toLowerCase();

    // mileage
    let mileage = $(this).find('div.bigScreen>ul.info.clearfix>li:nth-of-type(2)').text() || '';
    mileage = lib_text.optimise(mileage); // 14,016 Km
    const mileage_splitted = mileage.split(' ');
    car_info.mileage_km = mileage_splitted[0] && /\d/.test(mileage_splitted[0]) ? +mileage_splitted[0].replace(',', '') : null;

    // year
    car_info.year = $(this).find('div.bigScreen>ul.info.clearfix>li:nth-child(3)').text() || '';
    car_info.year = car_info.year && /\d/.test(car_info.year) ? +lib_text.optimise(car_info.year) : null;

    // transmission
    car_info.transmission = $(this).find('div.bigScreen>ul.info.clearfix>li:nth-of-type(4)').text() || '';
    car_info.transmission = lib_text.optimise(car_info.transmission).toLowerCase();

    car_info.make && x.car_infos.push(car_info);
  });

  // debug
  let i = 1;
  for (const car_info of x.car_infos) {
    await echo.log(`${i}. ${car_info.make} | ${car_info.model} | ${car_info.version} | ${car_info.price} ${car_info.price_unit} | ${car_info.date_published} | ${car_info.location} | ${car_info.fuel} | ${car_info.mileage} | ${car_info.year} | ${car_info.transmission} | image_url: ${!!car_info.image_url} | car_detail_url: ${!!car_info.car_detail_url}`);
    i++;
  }


  // console.log(x.car_infos);

  return x;
};
