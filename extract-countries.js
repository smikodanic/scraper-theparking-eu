const fs = require('fs');

// Input string
const inputHtml = `
<ul class="clearfix left-hand">
                                                                                                                        <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_102" onclick="javascript:ctrl.set_criteria('id_pays',102,'ALBANIA', this)" type="checkbox">
                                                                                        <label for="id_pays_102"><span class="sprite al"></span> ALBANIA (39,115)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_46" onclick="javascript:ctrl.set_criteria('id_pays',46,'ANDORRA', this)" type="checkbox">
                                                                                        <label for="id_pays_46"><span class="sprite ad"></span> ANDORRA (1)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_52" onclick="javascript:ctrl.set_criteria('id_pays',52,'ARGENTINA', this)" type="checkbox">
                                                                                        <label for="id_pays_52"><span class="sprite ar"></span> ARGENTINA (12,820)
                                            </label>
                                        </li>
                                                                                                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_5" onclick="javascript:ctrl.set_criteria('id_pays',5,'AUSTRIA', this)" type="checkbox">
                                                                                        <label for="id_pays_5"><span class="sprite at"></span> AUSTRIA (34,691)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_6" onclick="javascript:ctrl.set_criteria('id_pays',6,'BELGIUM', this)" type="checkbox">
                                                                                        <label for="id_pays_6"><span class="sprite be"></span> BELGIUM (19,970)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_87" onclick="javascript:ctrl.set_criteria('id_pays',87,'BRASIL', this)" type="checkbox">
                                                                                        <label for="id_pays_87"><span class="sprite br"></span> BRASIL (131,629)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_9" onclick="javascript:ctrl.set_criteria('id_pays',9,'BULGARIA', this)" type="checkbox">
                                                                                        <label for="id_pays_9"><span class="sprite bg"></span> BULGARIA (27,555)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_94" onclick="javascript:ctrl.set_criteria('id_pays',94,'CAMEROUN', this)" type="checkbox">
                                                                                        <label for="id_pays_94"><span class="sprite cm"></span> CAMEROUN (22)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_10" onclick="javascript:ctrl.set_criteria('id_pays',10,'CANADA', this)" type="checkbox">
                                                                                        <label for="id_pays_10"><span class="sprite ca"></span> CANADA (13,964)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_98" onclick="javascript:ctrl.set_criteria('id_pays',98,'CHILE', this)" type="checkbox">
                                                                                        <label for="id_pays_98"><span class="sprite cl"></span> CHILE (702)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_68" onclick="javascript:ctrl.set_criteria('id_pays',68,'COLOMBIE', this)" type="checkbox">
                                                                                        <label for="id_pays_68"><span class="sprite co"></span> COLOMBIE (2,810)
                                            </label>
                                        </li>
                                                                                                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_34" onclick="javascript:ctrl.set_criteria('id_pays',34,'CZECH REPUBLIC', this)" type="checkbox">
                                                                                        <label for="id_pays_34"><span class="sprite cz"></span> CZECH REPUBLIC (19,216)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_12" onclick="javascript:ctrl.set_criteria('id_pays',12,'DENMARK', this)" type="checkbox">
                                                                                        <label for="id_pays_12"><span class="sprite dk"></span> DENMARK (9,701)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_15" onclick="javascript:ctrl.set_criteria('id_pays',15,'ESTONIA', this)" type="checkbox">
                                                                                        <label for="id_pays_15"><span class="sprite ee"></span> ESTONIA (2,776)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_17" onclick="javascript:ctrl.set_criteria('id_pays',17,'FINLAND', this)" type="checkbox">
                                                                                        <label for="id_pays_17"><span class="sprite fi"></span> FINLAND (9,644)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_18" onclick="javascript:ctrl.set_criteria('id_pays',18,'FRANCE', this)" type="checkbox">
                                                                                        <label for="id_pays_18"><span class="sprite fr"></span> FRANCE (82,427)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_1" onclick="javascript:ctrl.set_criteria('id_pays',1,'GERMANY', this)" type="checkbox">
                                                                                        <label for="id_pays_1"><span class="sprite de"></span> GERMANY (321,509)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_56" onclick="javascript:ctrl.set_criteria('id_pays',56,'GIBRALTAR', this)" type="checkbox">
                                                                                        <label for="id_pays_56"><span class="sprite gi"></span> GIBRALTAR (1)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_19" onclick="javascript:ctrl.set_criteria('id_pays',19,'GREECE', this)" type="checkbox">
                                                                                        <label for="id_pays_19"><span class="sprite gr"></span> GREECE (8,088)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_21" onclick="javascript:ctrl.set_criteria('id_pays',21,'HUNGARY', this)" type="checkbox">
                                                                                        <label for="id_pays_21"><span class="sprite hu"></span> HUNGARY (9,662)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_85" onclick="javascript:ctrl.set_criteria('id_pays',85,'ICELAND', this)" type="checkbox">
                                                                                        <label for="id_pays_85"><span class="sprite is"></span> ICELAND (748)
                                            </label>
                                        </li>
                                                                                                                                                                                                                                                                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_63" onclick="javascript:ctrl.set_criteria('id_pays',63,'ISRAEL', this)" type="checkbox">
                                                                                        <label for="id_pays_63"><span class="sprite il"></span> ISRAEL (1,671)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_24" onclick="javascript:ctrl.set_criteria('id_pays',24,'ITALY', this)" type="checkbox">
                                                                                        <label for="id_pays_24"><span class="sprite it"></span> ITALY (65,362)
                                            </label>
                                        </li>
                                                                                                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_79" onclick="javascript:ctrl.set_criteria('id_pays',79,'JERSEY', this)" type="checkbox">
                                                                                        <label for="id_pays_79"><span class="sprite je"></span> JERSEY (3)
                                            </label>
                                        </li>
                                                                                                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_26" onclick="javascript:ctrl.set_criteria('id_pays',26,'LATVIA', this)" type="checkbox">
                                                                                        <label for="id_pays_26"><span class="sprite lv"></span> LATVIA (3,339)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_51" onclick="javascript:ctrl.set_criteria('id_pays',51,'LIECHTENSTEIN', this)" type="checkbox">
                                                                                        <label for="id_pays_51"><span class="sprite li"></span> LIECHTENSTEIN (160)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_27" onclick="javascript:ctrl.set_criteria('id_pays',27,'LITHUANIA', this)" type="checkbox">
                                                                                        <label for="id_pays_27"><span class="sprite lt"></span> LITHUANIA (7,072)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_28" onclick="javascript:ctrl.set_criteria('id_pays',28,'LUXEMBOURG', this)" type="checkbox">
                                                                                        <label for="id_pays_28"><span class="sprite lu"></span> LUXEMBOURG (2,039)
                                            </label>
                                        </li>
                                                                                                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_74" onclick="javascript:ctrl.set_criteria('id_pays',74,'MAROCCO', this)" type="checkbox">
                                                                                        <label for="id_pays_74"><span class="sprite ma"></span> MAROCCO (10,954)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_59" onclick="javascript:ctrl.set_criteria('id_pays',59,'MEXICO', this)" type="checkbox">
                                                                                        <label for="id_pays_59"><span class="sprite mx"></span> MEXICO (7,727)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_101" onclick="javascript:ctrl.set_criteria('id_pays',101,'MOLDOVA', this)" type="checkbox">
                                                                                        <label for="id_pays_101"><span class="sprite md"></span> MOLDOVA (3,748)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_29" onclick="javascript:ctrl.set_criteria('id_pays',29,'MONACO', this)" type="checkbox">
                                                                                        <label for="id_pays_29"><span class="sprite mc"></span> MONACO (15)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_31" onclick="javascript:ctrl.set_criteria('id_pays',31,'NETHERLANDS', this)" type="checkbox">
                                                                                        <label for="id_pays_31"><span class="sprite nl"></span> NETHERLANDS (59,311)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_30" onclick="javascript:ctrl.set_criteria('id_pays',30,'NORWAY', this)" type="checkbox">
                                                                                        <label for="id_pays_30"><span class="sprite no"></span> NORWAY (8,189)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_111" onclick="javascript:ctrl.set_criteria('id_pays',111,'PEROU', this)" type="checkbox">
                                                                                        <label for="id_pays_111"><span class="sprite pe"></span> PEROU (313)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_32" onclick="javascript:ctrl.set_criteria('id_pays',32,'POLAND', this)" type="checkbox">
                                                                                        <label for="id_pays_32"><span class="sprite pl"></span> POLAND (42,618)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_33" onclick="javascript:ctrl.set_criteria('id_pays',33,'PORTUGAL', this)" type="checkbox">
                                                                                        <label for="id_pays_33"><span class="sprite pt"></span> PORTUGAL (7,559)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_44" onclick="javascript:ctrl.set_criteria('id_pays',44,'REPUBLIC OF MACEDONIA', this)" type="checkbox">
                                                                                        <label for="id_pays_44"><span class="sprite mk"></span> REPUBLIC OF MACEDONIA (11,459)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_35" onclick="javascript:ctrl.set_criteria('id_pays',35,'ROMANIA', this)" type="checkbox">
                                                                                        <label for="id_pays_35"><span class="sprite ro"></span> ROMANIA (29,458)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_36" onclick="javascript:ctrl.set_criteria('id_pays',36,'RUSSIA', this)" type="checkbox">
                                                                                        <label for="id_pays_36"><span class="sprite ru"></span> RUSSIA (18,035)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_95" onclick="javascript:ctrl.set_criteria('id_pays',95,'SENEGAL', this)" type="checkbox">
                                                                                        <label for="id_pays_95"><span class="sprite sn"></span> SENEGAL (30)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_38" onclick="javascript:ctrl.set_criteria('id_pays',38,'SLOVAKIA', this)" type="checkbox">
                                                                                        <label for="id_pays_38"><span class="sprite sk"></span> SLOVAKIA (7,881)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_39" onclick="javascript:ctrl.set_criteria('id_pays',39,'SLOVENIA', this)" type="checkbox">
                                                                                        <label for="id_pays_39"><span class="sprite si"></span> SLOVENIA (6,908)
                                            </label>
                                        </li>
                                                                                                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_14" onclick="javascript:ctrl.set_criteria('id_pays',14,'SPAIN', this)" type="checkbox">
                                                                                        <label for="id_pays_14"><span class="sprite es"></span> SPAIN (53,315)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_40" onclick="javascript:ctrl.set_criteria('id_pays',40,'SWEDEN', this)" type="checkbox">
                                                                                        <label for="id_pays_40"><span class="sprite se"></span> SWEDEN (16,157)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_41" onclick="javascript:ctrl.set_criteria('id_pays',41,'SWITZERLAND', this)" type="checkbox">
                                                                                        <label for="id_pays_41"><span class="sprite ch"></span> SWITZERLAND (28,829)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_42" onclick="javascript:ctrl.set_criteria('id_pays',42,'TURKEY', this)" type="checkbox">
                                                                                        <label for="id_pays_42"><span class="sprite tr"></span> TURKEY (55,321)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_48" onclick="javascript:ctrl.set_criteria('id_pays',48,'UKRAINE', this)" type="checkbox">
                                                                                        <label for="id_pays_48"><span class="sprite ua"></span> UKRAINE (25,299)
                                            </label>
                                        </li>
                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_66" onclick="javascript:ctrl.set_criteria('id_pays',66,'UNITED ARAB EMIRATES', this)" type="checkbox">
                                                                                        <label for="id_pays_66"><span class="sprite ae"></span> UNITED ARAB EMIRATES (1,943)
                                            </label>
                                        </li>
                                                                                                                                                                                                                                                <li class="facet not-checked">
                                                                                        <input class="left-hand-country" id="id_pays_16" onclick="javascript:ctrl.set_criteria('id_pays',16,'UNITED STATES', this)" type="checkbox">
                                                                                        <label for="id_pays_16"><span class="sprite us"></span> UNITED STATES (62,198)
                                            </label>
                                        </li>
                                                                                                                    </ul>`;

// Function to extract country data
function extractCountries(html) {
  const countryData = {};
  const regex = /id_pays_(\d+).+?set_criteria\('id_pays',\d+,'([^']+)'/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const id = parseInt(match[1], 10);
    const country = match[2].toUpperCase();
    countryData[country] = id;
  }

  return countryData;
}

// Generate JSON from the input
const countriesJson = extractCountries(inputHtml);

// Write the JSON to a file
fs.writeFileSync('countries.json', JSON.stringify(countriesJson, null, 2));

console.log(countriesJson);
