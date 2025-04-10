const fs = require('fs');

const localeID = process.argv[2] || 'en_US';
const languageCode = localeID.substring(0, 2);
console.log(`locale ID: ${localeID}`);
console.log(`language code: ${languageCode}`);

const filePath = './src/app/app.module.ts';

try {
  // Read the file synchronously
  let data = fs.readFileSync(filePath, 'utf-8');

  // Modify the data
  data = data
    // Replace "en_US" in "import { en_US } from 'ng-zorro-antd/i18n';"
    // /[a-z]{2,4}_[A-Z]{2}/ is regex for locale ID.
    .replace(/(import { )[a-z]{2,4}_[A-Z]{2}( } from)/, '$1' + localeID + '$2')
    // Replace "en_US" in "{ provide: NZ_I18N, useValue: en_US }"
    .replace(/({ provide: NZ_I18N, useValue: )[a-z]{2,4}_[A-Z]{2}( })/, '$1' + localeID + '$2')
    // Replace "en" in "import en from '@angular/common/locales/en';"
    // /[a-z]{2}/ is regex for language code.
    .replace(/(import )[a-z]{2}( from '@angular\/common\/locales\/)[a-z]{2}(';)/, '$1' + languageCode + '$2' + languageCode + '$3')
    // Replace "en" in "registerLocaleData(en);"
    .replace(/(registerLocaleData\()[a-z]{2}(\);)/, '$1' + languageCode + '$2');

  // Write the modified data back to the file synchronously
  fs.writeFileSync(filePath, data, 'utf-8');
  console.log('app.module.ts modified successfully for locale.');
} catch (err) {
  console.error('Error:', err);
}


