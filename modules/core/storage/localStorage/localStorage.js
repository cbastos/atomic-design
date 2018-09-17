import { Storage } from '../storage/storage';

/**
 * The local storage provides methods for get, set and delete items
 * from storage with local life.
 */
export class LocalStorage extends Storage {
    constructor() {
        super(window.localStorage);
    }
}
