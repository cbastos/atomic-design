import moment from 'moment';

export class CurrentDateFormatter {
    constructor(currentCulture) {
        this.currentCulture = currentCulture;
    }
    format(date, format = this.currentCulture.date) {
        return moment(date).format(format);
    }
}
