fs = require('fs');
path = require('path');

const getUrlFriendlyName = input => {
  if (!input) {
    throw new Error('Invalid input - Country name cannot be undefined or null');
  } else {
    return input.toLowerCase().replace(/ /g, '_');
  }
}

const getPaddedNumStr = (inp) => {
  return (inp < 10) ? `0${inp}` : inp;
}

const getDateString = () => {
  const dt = new Date();
  return `${dt.getFullYear()}-${getPaddedNumStr(dt.getMonth() + 1)}-${getPaddedNumStr(dt.getDate())}`;
}

const getSitemapCountrySnippet = (country1, country2) => {
  const urlFriendlyCountry1 = getUrlFriendlyName(country1);
  const urlFriendlyCountry2 = getUrlFriendlyName(country2);
  const url = `https://nomadcouple.vinaygopinath.me/search/${urlFriendlyCountry1}/${urlFriendlyCountry2}`;
  const timestamp = getDateString();
  return `  <url>
    <loc>${encodeURI(url)}</loc>
    <lastmod>${getDateString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

const sitemapTop = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://nomadcouple.vinaygopinath.me/</loc>
    <lastmod>${getDateString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>`;

const sitemapBottom = `
</urlset>
`;

fs.readFile(path.join(__dirname, '../src/assets', 'countries.json'), 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    throw new Error('Failed to read countries.json');
  }

  const countries = JSON.parse(data);
  const sitemapArr = [];
  countries.forEach(country1 => {
    countries.forEach(country2 => {
      sitemapArr.push(getSitemapCountrySnippet(country1, country2));
    });
  });

  const output = `${sitemapTop}
${sitemapArr.join('\n')}
${sitemapBottom}
`;

  fs.writeFile(path.join(__dirname, '../', 'sitemap.xml'), output, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      throw new Error('Failed to write to sitemap.xml');
    }
  });
});
