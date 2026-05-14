-- Seed 80 varied guests for user id = 'demo'.
-- Safe to re-run: guests are upserted by unique email.

DELETE FROM "Guest"
WHERE "userId" = 'demo'
  AND EXISTS (SELECT 1 FROM "User" WHERE id = 'demo');

INSERT INTO "Guest" (
  id,
  name,
  surname,
  "plusOneId",
  status,
  "group",
  side,
  "alcoholFree",
  "isChild",
  "staysOvernight",
  "needsTransportation",
  "dietaryRestrictions",
  email,
  phone,
  "addressCountry",
  "addressCity",
  "addressStreet",
  "addressZipCode",
  notes,
  "userId"
)
SELECT
  gen_random_uuid()::text,
  seed.name,
  seed.surname,
  NULL,
  seed.status,
  seed.guest_group,
  seed.side,
  seed.alcohol_free,
  seed.is_child,
  seed.stays_overnight,
  seed.needs_transportation,
  seed.dietary_restrictions,
  seed.email,
  seed.phone,
  seed.address_country,
  seed.address_city,
  seed.address_street,
  seed.address_zip,
  seed.notes,
  'demo'
FROM (
  VALUES
    ('Taylor','Swift','confirmed','friends','bride','no',FALSE,'yes','no','none','taylor.swift@guestmail.com',NULL,'USA','Nashville','Willow Ave 12','37201','Will arrive two days early.'),
    ('Beyonce','Knowles','confirmed','friends','bride','yes',FALSE,'yes','no','gluten free','beyonce.knowles@guestmail.com','+12025550101','USA','Houston','Lemonade St 8','77002','Prefers sparkling water.'),
    ('Jay','Z','not yet invited','friends','groom','no',FALSE,'no','no','none','jay.z@guestmail.com',NULL,'USA','New York','Empire Blvd 44','10001',NULL),
    ('Rihanna','Fenty','confirmed','friends','both','no',FALSE,'yes','yes','vegetarian','rihanna.fenty@guestmail.com',NULL,'Barbados','Bridgetown','Ocean View 3','BB11000','Needs pickup from airport.'),
    ('Adele','Adkins','invited','friends','bride','no',FALSE,'not sure yet','no','none','adele.adkins@guestmail.com',NULL,'UK','London','Camden Road 15','NW10AA',NULL),
    ('Ed','Sheeran','confirmed','friends','groom','no',FALSE,'yes','no','none','ed.sheeran@guestmail.com',NULL,'UK','London','Suffolk Lane 4','EC2R8AH','Can perform a short set if needed.'),
    ('Harry','Styles','not yet invited','friends','both','no',FALSE,'no','not sure yet','vegan','harry.styles@guestmail.com',NULL,'UK','Manchester','Cherry St 21','M11AA',NULL),
    ('Zendaya','Coleman','confirmed','friends','bride','yes',FALSE,'yes','yes','vegetarian','zendaya.coleman@guestmail.com',NULL,'USA','Oakland','Grand Ave 7','94612','Arriving with stylist team.'),
    ('Tom','Holland','not yet invited','friends','groom','no',FALSE,'not sure yet','yes','none','tom.holland@guestmail.com',NULL,'UK','London','Queensway 88','W21HB',NULL),
    ('Emma','Stone','confirmed','friends','bride','no',FALSE,'yes','no','none','emma.stone@guestmail.com',NULL,'USA','Scottsdale','Desert Bloom 5','85251',NULL),
    ('Ryan','Gosling','not yet invited','friends','groom','no',FALSE,'no','no','unknown','ryan.gosling@guestmail.com',NULL,'Canada','Toronto','Maple Crescent 14','M5H2N2',NULL),
    ('Margot','Robbie','confirmed','friends','both','not sure yet',FALSE,'yes','no','unknown','margot.robbie@guestmail.com',NULL,'Australia','Gold Coast','Sunrise Dr 2','4217',NULL),
    ('Chris','Hemsworth','invited','friends','groom','no',FALSE,'no','no','unknown','chris.hemsworth@guestmail.com',NULL,'Australia','Melbourne','Harbor Rd 77','3000',NULL),
    ('Scarlett','Johansson','confirmed','friends','bride','no',FALSE,'yes','not sure yet','unknown','scarlett.johansson@guestmail.com',NULL,'USA','New York','Madison St 33','10010',NULL),
    ('Robert','Downey','not yet invited','friends','groom','no',FALSE,'not sure yet','no','unknown','robert.downey@guestmail.com',NULL,'USA','Los Angeles','Pacific View 19','90028',NULL),
    ('Jennifer','Lawrence','confirmed','friends','bride','no',FALSE,'yes','yes','none','jennifer.lawrence@guestmail.com',NULL,'USA','Louisville','Bluegrass Ave 11','40202',NULL),
    ('Brad','Pitt','declined','friends','groom','no',FALSE,'no','no','none','brad.pitt@guestmail.com',NULL,'USA','Springfield','Oak Street 41','62701','Out of the country that week.'),
    ('Angelina','Jolie','declined','friends','bride','no',FALSE,'no','no','none','angelina.jolie@guestmail.com',NULL,'USA','Los Angeles','Mulholland Dr 101','90068','Travel conflict.'),
    ('Leonardo','DiCaprio','invited','friends','groom','no',FALSE,'not sure yet','no','unknown','leonardo.dicaprio@guestmail.com',NULL,'USA','Los Angeles','Sunset Blvd 500','90028',NULL),
    ('Kate','Winslet','confirmed','friends','bride','no',FALSE,'yes','not sure yet','none','kate.winslet@guestmail.com',NULL,'UK','Reading','Riverbank 18','RG17AA',NULL),

    ('George','Clooney','not yet invited','coworkers','groom','no',FALSE,'no','no','none','george.clooney@guestmail.com',NULL,'USA','Lexington','Main St 90','40507',NULL),
    ('Julia','Roberts','confirmed','coworkers','bride','no',FALSE,'yes','no','none','julia.roberts@guestmail.com',NULL,'USA','Smyrna','Peachtree Ave 27','30080',NULL),
    ('Sandra','Bullock','not yet invited','coworkers','both','no',FALSE,'not sure yet','yes','none','sandra.bullock@guestmail.com',NULL,'USA','Arlington','Rosewood Ln 9','76010',NULL),
    ('Keanu','Reeves','confirmed','coworkers','groom','no',FALSE,'yes','no','none','keanu.reeves@guestmail.com',NULL,'Canada','Toronto','King St 301','M5V1J5',NULL),
    ('Carrie','Coon','invited','coworkers','bride','no',FALSE,'no','not sure yet','vegetarian','carrie.coon@guestmail.com',NULL,'USA','Copley','Summit Road 6','44321',NULL),
    ('Pedro','Pascal','confirmed','coworkers','both','no',FALSE,'yes','yes','none','pedro.pascal@guestmail.com',NULL,'Chile','Santiago','Andes Ave 31','8320000','Flying in morning of rehearsal dinner.'),
    ('Anya','TaylorJoy','invited','coworkers','bride','not sure yet',FALSE,'not sure yet','yes','none','anya.taylorjoy@guestmail.com',NULL,'UK','London','Crown St 12','SW1A1AA',NULL),
    ('Cillian','Murphy','confirmed','coworkers','groom','no',FALSE,'yes','no','none','cillian.murphy@guestmail.com',NULL,'Ireland','Cork','Lee Quay 4','T12AA00',NULL),
    ('Florence','Pugh','invited','coworkers','both','yes',FALSE,'no','yes','vegetarian','florence.pugh@guestmail.com',NULL,'UK','Oxford','Magdalen St 17','OX11AA',NULL),
    ('Timothee','Chalamet','confirmed','coworkers','groom','no',FALSE,'yes','not sure yet','none','timothee.chalamet@guestmail.com',NULL,'USA','New York','Broadway 250','10007',NULL),
    ('Saoirse','Ronan','invited','coworkers','bride','no',FALSE,'not sure yet','no','none','saoirse.ronan@guestmail.com',NULL,'Ireland','Dublin','Trinity Lane 3','D02X285',NULL),
    ('Austin','Butler','confirmed','coworkers','groom','no',FALSE,'yes','no','none','austin.butler@guestmail.com',NULL,'USA','Anaheim','Orange Blvd 61','92805',NULL),
    ('Lupita','Nyongo','invited','coworkers','bride','yes',FALSE,'no','yes','vegan','lupita.nyongo@guestmail.com',NULL,'Kenya','Nairobi','Savannah Rd 20','00100',NULL),
    ('Daniel','Kaluuya','confirmed','coworkers','groom','no',FALSE,'yes','yes','none','daniel.kaluuya@guestmail.com',NULL,'UK','London','Brixton Hill 91','SW22QJ',NULL),
    ('Regina','King','invited','coworkers','both','no',FALSE,'not sure yet','no','none','regina.king@guestmail.com',NULL,'USA','Los Angeles','Olive St 52','90013',NULL),
    ('Mahershala','Ali','confirmed','coworkers','groom','no',FALSE,'yes','not sure yet','none','mahershala.ali@guestmail.com',NULL,'USA','Oakland','Lakeview Dr 10','94610',NULL),
    ('Viola','Davis','invited','coworkers','bride','no',FALSE,'no','yes','none','viola.davis@guestmail.com',NULL,'USA','St Matthews','Elm Court 14','40207',NULL),
    ('Denzel','Washington','confirmed','coworkers','groom','no',FALSE,'yes','no','none','denzel.washington@guestmail.com',NULL,'USA','Mount Vernon','Hudson Rd 6','10550',NULL),
    ('Meryl','Streep','invited','coworkers','bride','not sure yet',FALSE,'not sure yet','no','none','meryl.streep@guestmail.com',NULL,'USA','Summit','Hilltop Ave 8','07901',NULL),
    ('Matt','Damon','confirmed','coworkers','groom','no',FALSE,'yes','no','none','matt.damon@guestmail.com',NULL,'USA','Boston','Charles St 76','02108',NULL),

    ('David','Beckham','confirmed','friends','groom','no',FALSE,'yes','no','none','david.beckham@guestmail.com',NULL,'UK','London','Knightsbridge 5','SW1X7LX',NULL),
    ('Victoria','Beckham','confirmed','friends','bride','yes',FALSE,'yes','no','vegan','victoria.beckham@guestmail.com',NULL,'UK','London','Knightsbridge 5','SW1X7LX','No dairy please.'),
    ('Serena','Williams','invited','friends','bride','no',FALSE,'not sure yet','yes','none','serena.williams@guestmail.com',NULL,'USA','Palm Beach','Ocean Blvd 70','33480',NULL),
    ('Roger','Federer','invited','friends','groom','no',FALSE,'not sure yet','no','none','roger.federer@guestmail.com',NULL,'Switzerland','Basel','Rhine St 2','4051',NULL),
    ('Lionel','Messi','confirmed','friends','groom','no',FALSE,'yes','yes','none','lionel.messi@guestmail.com',NULL,'Argentina','Rosario','Liberty Ave 11','S2000',NULL),
    ('Cristiano','Ronaldo','confirmed','friends','groom','no',FALSE,'yes','yes','none','cristiano.ronaldo@guestmail.com',NULL,'Portugal','Funchal','Madeira Rd 9','9000-001',NULL),
    ('Neymar','Junior','invited','friends','groom','no',FALSE,'not sure yet','yes','none','neymar.junior@guestmail.com',NULL,'Brazil','Santos','Praia St 14','11010-000',NULL),
    ('Kylian','Mbappe','invited','friends','both','no',FALSE,'not sure yet','yes','none','kylian.mbappe@guestmail.com',NULL,'France','Paris','Rue de Seine 40','75006',NULL),
    ('Megan','Rapinoe','confirmed','friends','bride','yes',FALSE,'yes','no','vegetarian','megan.rapinoe@guestmail.com',NULL,'USA','Redding','Shasta Rd 23','96001',NULL),
    ('LeBron','James','invited','friends','groom','no',FALSE,'not sure yet','yes','none','lebron.james@guestmail.com',NULL,'USA','Akron','Summit Ave 1','44308',NULL),
    ('Stephen','Curry','confirmed','friends','groom','no',FALSE,'yes','no','none','stephen.curry@guestmail.com',NULL,'USA','Charlotte','Mint St 52','28202',NULL),
    ('Ariana','Grande','confirmed','friends','bride','no',FALSE,'yes','no','none','ariana.grande@guestmail.com',NULL,'USA','Boca Raton','Palm Dr 16','33432',NULL),
    ('Billie','Eilish','invited','friends','bride','yes',FALSE,'not sure yet','yes','vegan','billie.eilish@guestmail.com',NULL,'USA','Los Angeles','Valley View 18','90046',NULL),
    ('Bruno','Mars','confirmed','friends','groom','no',FALSE,'yes','no','none','bruno.mars@guestmail.com',NULL,'USA','Honolulu','Aloha Rd 12','96815',NULL),
    ('Selena','Gomez','invited','friends','bride','not sure yet',FALSE,'not sure yet','yes','none','selena.gomez@guestmail.com',NULL,'USA','Grand Prairie','Lone Star 7','75050',NULL),
    ('Justin','Bieber','invited','friends','groom','no',FALSE,'no','yes','none','justin.bieber@guestmail.com',NULL,'Canada','London','Huron St 4','N6A2K2',NULL),
    ('Shakira','Mebarak','confirmed','friends','both','no',FALSE,'yes','yes','none','shakira.mebarak@guestmail.com',NULL,'Colombia','Barranquilla','Caribe Ave 22','080001',NULL),
    ('Enrique','Iglesias','invited','friends','groom','no',FALSE,'not sure yet','no','none','enrique.iglesias@guestmail.com',NULL,'Spain','Madrid','Gran Via 90','28013',NULL),
    ('Camila','Cabello','confirmed','friends','bride','no',FALSE,'yes','yes','none','camila.cabello@guestmail.com',NULL,'Cuba','Havana','Malecon 5','10400',NULL),
    ('The','Weeknd','invited','friends','groom','no',FALSE,'yes','yes','none','the.weeknd@guestmail.com',NULL,'Canada','Toronto','King West 45','M5H2K2','Plus one for Ariana.'),

    ('Dwayne','Johnson','confirmed','family','groom','no',FALSE,'yes','no','none','dwayne.johnson@guestmail.com',NULL,'USA','Miami','Palm Island 10','33139',NULL),
    ('Gal','Gadot','confirmed','family','bride','no',FALSE,'yes','no','none','gal.gadot@guestmail.com',NULL,'Israel','Tel Aviv','Jaffa Rd 20','61000',NULL),
    ('Gisele','Bündchen','invited','family','bride','no',FALSE,'yes','no','none','gisele.bundchen@guestmail.com',NULL,'Brazil','São Paulo','Rua Oscar 20','01310-100','Plus one for Gal.'),
    ('Henry','Cavill','invited','family','groom','no',FALSE,'not sure yet','no','none','henry.cavill@guestmail.com',NULL,'UK','Saint Helier','Harbor Way 1','JE24WD',NULL),
    ('Anne','Hathaway','confirmed','family','bride','yes',FALSE,'yes','not sure yet','vegetarian','anne.hathaway@guestmail.com',NULL,'USA','Brooklyn','Prospect Ave 24','11215',NULL),
    ('Natalie','Portman','invited','family','bride','no',FALSE,'not sure yet','yes','vegan','natalie.portman@guestmail.com',NULL,'Israel','Jerusalem','Olive St 9','91000',NULL),
    ('Hugh','Jackman','confirmed','family','groom','no',FALSE,'yes','no','none','hugh.jackman@guestmail.com',NULL,'Australia','Sydney','Harbor St 66','2000',NULL),
    ('Charlize','Theron','invited','family','bride','no',FALSE,'no','yes','none','charlize.theron@guestmail.com',NULL,'South Africa','Benoni','Acacia Rd 11','1501',NULL),
    ('Idris','Elba','confirmed','family','groom','no',FALSE,'yes','yes','none','idris.elba@guestmail.com',NULL,'UK','London','Docklands 30','E145AB',NULL),
    ('Nick','Jonas','invited','family','groom','no',FALSE,'not sure yet','yes','none','nick.jonas@guestmail.com',NULL,'USA','Dallas','Elm Fork 12','75201',NULL),
    ('Sophie','Turner','confirmed','family','bride','not sure yet',FALSE,'yes','no','none','sophie.turner@guestmail.com',NULL,'UK','Northampton','Guildhall 4','NN11AA',NULL),
    ('Joe','Jonas','confirmed','family','groom','no',FALSE,'yes','no','none','joe.jonas@guestmail.com',NULL,'USA','Casa Grande','Desert Trail 22','85122',NULL),
    ('Gigi','Hadid','invited','family','bride','yes',FALSE,'not sure yet','yes','vegetarian','gigi.hadid@guestmail.com',NULL,'USA','Los Angeles','Bel Air Rd 101','90077',NULL),
    ('Zayn','Malik','invited','family','groom','no',FALSE,'not sure yet','yes','none','zayn.malik@guestmail.com',NULL,'UK','Bradford','Canal St 17','BD11AA',NULL),
    ('Bella','Hadid','confirmed','family','bride','yes',FALSE,'yes','yes','vegetarian','bella.hadid@guestmail.com',NULL,'USA','Washington','Capitol Ave 5','20001',NULL),
    ('Travis','Scott','invited','family','groom','no',FALSE,'not sure yet','yes','none','travis.scott@guestmail.com',NULL,'USA','Houston','Astroworld Ln 9','77003',NULL),
    ('Stormi','Webster','invited','family','both','no',TRUE,'not sure yet','yes','none','stormi.webster@guestmail.com',NULL,'USA','Los Angeles','Hidden Hills 2','91302','Plus one for Travis and child.'),
    ('Chris','Pratt','invited','family','groom','no',FALSE,'not sure yet','no','none','chris.pratt@guestmail.com',NULL,'USA','Virginia','Bay St 28','23451',NULL),
    ('Anna','Faris','declined','family','bride','no',FALSE,'no','no','none','anna.faris@guestmail.com',NULL,'USA','Baltimore','Harbor Place 7','21202','Family trip already planned.'),

    ('Macaulay','Culkin','confirmed','other','both','no',TRUE,'yes','yes','none','macaulay.culkin@guestmail.com',NULL,'USA','New York','Broadway 17','10002','Travelling with guardian.'),
    ('Millie','BobbyBrown','confirmed','other','both','no',TRUE,'yes','yes','none','millie.bobbybrown@guestmail.com',NULL,'UK','Bournemouth','Sea Cliff 13','BH11AA','Child guest table preferred.'),
    ('Noah','Schnapp','invited','other','both','no',TRUE,'not sure yet','yes','none','noah.schnapp@guestmail.com',NULL,'USA','Scarsdale','Park View 6','10583',NULL),
    ('Finn','Wolfhard','invited','other','both','no',TRUE,'not sure yet','yes','none','finn.wolfhard@guestmail.com',NULL,'Canada','Vancouver','Granville 89','V6C1S4',NULL),
    ('Jacob','Tremblay','confirmed','other','both','yes',TRUE,'yes','yes','gluten free','jacob.tremblay@guestmail.com',NULL,'Canada','Vancouver','Burrard 42','V6Z2H5',NULL),
    ('Mark','Wahlberg','invited','other','groom','no',FALSE,'not sure yet','yes','none','mark.wahlberg@guestmail.com',NULL,'USA','Los Angeles','Hollywood Blvd 60','90028','Plus one for child guests group.'),
    ('Iain','Armitage','confirmed','other','both','no',TRUE,'yes','yes','none','iain.armitage@guestmail.com',NULL,'USA','Savannah','River St 3','31401',NULL),
    ('Marsai','Martin','invited','other','both','yes',TRUE,'not sure yet','yes','vegan','marsai.martin@guestmail.com',NULL,'USA','Plano','Preston Rd 14','75024',NULL),
    ('Jenna','Ortega','confirmed','other','both','no',FALSE,'yes','yes','none','jenna.ortega@guestmail.com',NULL,'USA','Coachella','Palm Ave 8','92236',NULL),
    ('Asa','Butterfield','invited','other','both','no',FALSE,'not sure yet','yes','none','asa.butterfield@guestmail.com',NULL,'UK','London','Baker St 221','NW16XE',NULL),
    ('Elle','Fanning','confirmed','other','both','yes',FALSE,'yes','yes','vegetarian','elle.fanning@guestmail.com',NULL,'USA','Conyers','Georgia Rd 31','30012',NULL),
    ('Dakota','Fanning','invited','other','both','no',FALSE,'not sure yet','yes','none','dakota.fanning@guestmail.com',NULL,'USA','Conyers','Georgia Rd 31','30012',NULL),
    ('Hailee','Steinfeld','confirmed','other','both','no',FALSE,'yes','yes','none','hailee.steinfeld@guestmail.com',NULL,'USA','Tarzana','Ventura Blvd 61','91356',NULL),
    ('Joey','King','invited','other','both','not sure yet',FALSE,'not sure yet','yes','none','joey.king@guestmail.com',NULL,'USA','Los Angeles','Mulberry Ln 12','90026',NULL),
    ('Kiernan','Shipka','confirmed','other','both','yes',FALSE,'yes','yes','gluten free','kiernan.shipka@guestmail.com',NULL,'USA','Chicago','Lake Shore 5','60611',NULL),
    ('Mckenna','Grace','invited','other','both','yes',TRUE,'not sure yet','yes','vegetarian','mckenna.grace@guestmail.com',NULL,'USA','Grapevine','Main St 10','76051',NULL),
    ('Walker','Scobell','confirmed','other','both','no',TRUE,'yes','yes','none','walker.scobell@guestmail.com',NULL,'USA','Virginia Beach','Atlantic Ave 2','23451',NULL),
    ('Gaten','Matarazzo','invited','other','both','no',FALSE,'not sure yet','yes','none','gaten.matarazzo@guestmail.com',NULL,'USA','Little Egg Harbor','Bay Shore 15','08087',NULL),
    ('Caleb','McLaughlin','confirmed','other','both','no',FALSE,'yes','yes','none','caleb.mclaughlin@guestmail.com',NULL,'USA','Carmel','Forest Rd 9','10512',NULL),
    ('Sadie','Sink','invited','other','both','yes',FALSE,'not sure yet','yes','vegetarian','sadie.sink@guestmail.com',NULL,'USA','Brenham','Bluebonnet 4','77833',NULL)
) AS seed(
  name,
  surname,
  status,
  guest_group,
  side,
  alcohol_free,
  is_child,
  stays_overnight,
  needs_transportation,
  dietary_restrictions,
  email,
  phone,
  address_country,
  address_city,
  address_street,
  address_zip,
  notes
)
WHERE EXISTS (SELECT 1 FROM "User" WHERE id = 'demo')
ON CONFLICT (email) DO UPDATE
SET
  name = EXCLUDED.name,
  surname = EXCLUDED.surname,
  "plusOneId" = EXCLUDED."plusOneId",
  status = EXCLUDED.status,
  "group" = EXCLUDED."group",
  side = EXCLUDED.side,
  "alcoholFree" = EXCLUDED."alcoholFree",
  "isChild" = EXCLUDED."isChild",
  "staysOvernight" = EXCLUDED."staysOvernight",
  "needsTransportation" = EXCLUDED."needsTransportation",
  "dietaryRestrictions" = EXCLUDED."dietaryRestrictions",
  phone = EXCLUDED.phone,
  "addressCountry" = EXCLUDED."addressCountry",
  "addressCity" = EXCLUDED."addressCity",
  "addressStreet" = EXCLUDED."addressStreet",
  "addressZipCode" = EXCLUDED."addressZipCode",
  notes = EXCLUDED.notes,
  "userId" = EXCLUDED."userId";

WITH ranked_guests AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY email ASC) AS row_num
  FROM "Guest"
  WHERE "userId" = 'demo'
    AND email LIKE '%@guestmail.com'
)
DELETE FROM "Guest" g
USING ranked_guests r
WHERE g.id = r.id
  AND r.row_num > 80;

-- Set up plus one relationships by pairing guests by email
UPDATE "Guest" g1
SET "plusOneId" = g2.id
FROM "Guest" g2
WHERE g1."userId" = 'demo'
  AND g2."userId" = 'demo'
  AND (
    (g1.email = 'ed.sheeran@guestmail.com' AND g2.email = 'harry.styles@guestmail.com') OR
    (g1.email = 'harry.styles@guestmail.com' AND g2.email = 'ed.sheeran@guestmail.com') OR
    (g1.email = 'zendaya.coleman@guestmail.com' AND g2.email = 'tom.holland@guestmail.com') OR
    (g1.email = 'tom.holland@guestmail.com' AND g2.email = 'zendaya.coleman@guestmail.com') OR
    (g1.email = 'margot.robbie@guestmail.com' AND g2.email = 'ryan.gosling@guestmail.com') OR
    (g1.email = 'ryan.gosling@guestmail.com' AND g2.email = 'margot.robbie@guestmail.com') OR
    (g1.email = 'serena.williams@guestmail.com' AND g2.email = 'roger.federer@guestmail.com') OR
    (g1.email = 'roger.federer@guestmail.com' AND g2.email = 'serena.williams@guestmail.com') OR
    (g1.email = 'keanu.reeves@guestmail.com' AND g2.email = 'carrie.coon@guestmail.com') OR
    (g1.email = 'carrie.coon@guestmail.com' AND g2.email = 'keanu.reeves@guestmail.com') OR
    (g1.email = 'julia.roberts@guestmail.com' AND g2.email = 'sandra.bullock@guestmail.com') OR
    (g1.email = 'sandra.bullock@guestmail.com' AND g2.email = 'julia.roberts@guestmail.com') OR
    (g1.email = 'beyonce.knowles@guestmail.com' AND g2.email = 'rihanna.fenty@guestmail.com') OR
    (g1.email = 'rihanna.fenty@guestmail.com' AND g2.email = 'beyonce.knowles@guestmail.com')
  );
