import { Storage } from '../storage/storage';

/**
 * The local storage provides methods for get, set and delete items
 * from storage with user session life.
 */
export class SessionStorage extends Storage {
    constructor() {
        super(window.sessionStorage);
    }
}
