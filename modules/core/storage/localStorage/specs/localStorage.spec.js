import { LocalStorage } from '../localStorage';
import { Storage } from '../../storage/storage';

describe('The local storage', () => {
    let the_local_storage;

    beforeEach(() => {
        the_local_storage = new LocalStorage();
    });

    it('should inherits from storage', () => {
        expect(the_local_storage instanceof Storage).toBeTruthy();
    });

    it('should set browser window local storage mechanism', () => {
        expect(the_local_storage.storageMechanism).toBe(window.localStorage);
    });
});
