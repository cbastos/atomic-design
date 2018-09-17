export class Translator {
    constructor(currentCulture) {
        this.currentCulture = currentCulture;
    }
    /**
     * Translates with optional variable string interpolation
     * @param {string} key - translation key
     * @param {Object} variablesDictionary - Key-value pair dictionary with variable name and value
     * @example
     *  const culture = {
     *      translations: {
     *          "Some.Translation": "Are you sure you want to delete ${name} with id:${id}?"
     *      }
     *  };
     *  const translator = new Translator(culture);
     *  translator.translate('Some.Translation', { name: 'Petter', id: 1233 });
     *  // result should be: "Are you sure you want to delete Petter with id:1233?"
     */
    translate(key, variablesDictionary) {
        const variables = variablesDictionary ? Object.keys(variablesDictionary) : [];
        let translation = this.currentCulture.translations[key];

        variables.forEach(key =>
            translation = translation.replace(new RegExp(`\\\${${key}}`, 'g'), variablesDictionary[key])
        );

        return translation;
    }
}
