# scraper-theparking-eu
> Extract car details from theparking.eu


## Requirements
- NodeJS v20.11.0
- Chrome browser Version 128.0.6613.137
- puppeteer-core v23.4.0
- dex8-cli - https://www.npmjs.com/package/dex8-cli


## Installation
```bash
$ npm install -g dex8-cli

$ cd /project-folder
$ npm install
```

## Start the scraper
Starting the scraper is straightforward using the DEX8 CLI command from the terminal.
```bash
$ cd /project-folder
$ dex8 start -i input.json -is inputSecret.json
```
Explanation: The command starts the scraper with parameters defined in the input.json and inputSecret.json. The input.json contains common parameters and inputSecret.json contains secret parameters like passwords, db URLs etc.


### input.json
The scaper is using input parameters:
```json
{
  "headless": false,
  "search_term": "VW golf",
  "max_search_pages": 100
}
```
- **headless** -- puppeteer's headless parameter https://pptr.dev/guides/headless-modes/ - 'old', 'new', false  - use false to show the browser window
- **search_term** -- the search term which scraper will initially enter in theparking.eu search form
- **max_search_pages** -- max pagination, it determine how many search result pages the scraper will open

NOTICE: The user can create different input.json files and use it with dex8 cli command. For example if user create input2.json the scraper should be started with **dex8 start -i input2.json -is inputSecret.json**.


### inputSecret.json
The purpose of this file is to store secret parameters, credentials, passwords, DB links, etc.
generally it's same as input.json
```json
{
  "PG_USERNAME": "carfinder",
  "PG_PASSWORD":"xyz",
  "PG_HOST":"95.11.29.12",
  "PG_PORT":"5432",
  "PG_DATABASE": "autocars"
}
```


## How scraper works ?
1. The scraper navigates to parking.eu and closes all pop-ups.
2. It enters the input.search_term and lists all vehicles.
3. The scraper extracts data from the search results and stores it in the x.car_infos array of objects.
4. Next, it opens each car's detail page to gather additional information like color, category, seats, and ad title, then updates the x.car_infos array.
5. The extracted data in the x.car_infos array is saved to a MongoDB collection named theparking_eu.
6. The scraper proceeds to the next pagination page and repeats the extraction process from steps 3 to 5.




## DB doc example
Here is the example of the saved data in the "the parking_eu" collection:
```json
{ 
    "_id" : ObjectId("66f3c676e90052f97da5c53b"), 
    "redirect_url" : "https://www.theparking.eu/tools/6FRV7SPC/0/t.html", 
    "__v" : NumberInt(0), 
    "ad_title" : "vw golf vii 7 r line, letnik 2015, 138000 km, diesel 2.0 110kw deli", 
    "car_detail_url" : "https://www.theparking.eu/used-cars-detail/volkswagen-golf/vw-golf-vii-7-r-line-letnik-2015-138000-km-diesel-2-0-110kw-deli/6FRV7SPC.html", 
    "category" : "compact", 
    "color" : "white", 
    "created_at" : ISODate("2024-09-25T08:14:45.985+0000"), 
    "date_published" : ISODate("2023-03-21T00:00:00.000+0000"), 
    "doors" : "5", 
    "fuel" : "diesel", 
    "location" : "Slovenia", 
    "make" : "Volkswagen", 
    "mileage" : "138,000 Km", 
    "model" : "Golf", 
    "searchpage_num" : NumberInt(1), 
    "searchpage_url" : "https://www.theparking.eu/#!/used-cars/VW-golf.html", 
    "transmission" : "manual", 
    "updated_at" : ISODate("2024-09-25T08:14:45.985+0000"), 
    "version" : "2.0 R LINE", 
    "year" : NumberInt(2015)
}
```


## External URL examples
The "redirect_url" is usually redirected to other web site pages such as:
- https://www.willhaben.at/iad/gebrauchtwagen/d/auto/X-1687644496/
- https://www.autoscout24.at/angebote/-b523c6ea-6c69-428a-8ead-a7e88ad715b4
- https://hey.car/vehicle/04ae689b-dab6-4f55-bb0c-e4e74810b03d?utm_medium=meta&utm_source=leparking&utm_campaign=de_met_pro_cls_leparking_listing&utm_content=RENAULT_EXPRESS
- https://www.zweispurig.at/x/details-1304341
- https://www.njuskalo.hr/auti/vw-golf-7-variant-1.6-tdi-teretno-n1-1-vlasnik-garancija-12-mjeseci-oglas-41875494
- https://www.autohero.com/it/v1/x/id/9e83db12-dbfa-44da-8a73-2e9e2f0730a7/?MID=IT_COP_14-236_1_3_2-0-0-0_0_0&utm_expid=.rB2JTcj8iP4w1fzniRQxso.0
- https://www.bolha.com/avto-oglasi/vw-golf-vii-7-r-line-letnik-2015-138000-km-diesel-2.0-110kw-deli-oglas-1579642
