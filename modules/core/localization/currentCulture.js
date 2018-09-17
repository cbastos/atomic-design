import defaultCulture from './translations/es-ES.json';

export class CurrentCulture {
    constructor() {
        this.culture = defaultCulture;
    }
    use(culture) {
        this.culture = culture;
    }
    get currency() {
        return this.culture.currency;
    }
    get date() {
        return this.culture.date;
    }
    get translations() {
        return this.culture.translations;
    }
}
