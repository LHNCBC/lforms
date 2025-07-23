const fs = require('fs');

const localeID = process.argv[2] || 'en_US';
const languageCode = localeID.split('_')[0];
console.log(`locale ID: ${localeID}`);
console.log(`language code: ${languageCode}`);

const filePath = './src/app/app.module.ts';
try {
  let data = fs.readFileSync(filePath, 'utf-8');
  data = data
    // Replace "en_US" in "import { en_US } from 'ng-zorro-antd/i18n';"
    // /[a-z]{2,4}_[A-Z]{2}/ is regex for locale ID.
    .replace(/(import\s+{\s*)[a-z]{2,4}_[A-Z]{2}(\s*}\s+from)/, '$1' + localeID + '$2')
    // Replace "en_US" in "{ provide: NZ_I18N, useValue: en_US }"
    .replace(/({\s*provide:\s*NZ_I18N,\s*useValue:\s*)[a-z]{2,4}_[A-Z]{2}(\s*})/, '$1' + localeID + '$2')
    // Replace "en" in "import en from '@angular/common/locales/en';"
    // /[a-z]{2}/ is regex for language code.
    .replace(/(import\s+)[a-z]{2}(\s+from\s+'@angular\/common\/locales\/)[a-z]{2}('\s*;)/, '$1' + languageCode + '$2' + languageCode + '$3')
    // Replace "en" in "registerLocaleData(en);"
    .replace(/(registerLocaleData\s*\(\s*)[a-z]{2}(\s*\)\s*;)/, '$1' + languageCode + '$2');
  fs.writeFileSync(filePath, data, 'utf-8');
  console.log('app.module.ts modified successfully for locale.');
} catch (err) {
  console.error('Error modifying app.module.ts:', err);
}

// Copy the language config file to language-config.json (overwrite if exists).
try {
  fs.copyFileSync(`src/languages/${localeID}.json`, 'language-config.json');
  console.log('Language config file copied successfully');
} catch (err) {
  console.error("An error occurred copying language config file:", err);
}


