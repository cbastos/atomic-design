import { SessionStorage } from '../sessionStorage';
import { Storage } from '../../storage/storage';

describe('The session storage', () => {
    let the_session_storage;

    beforeEach(() => {
        the_session_storage = new SessionStorage();
    });

    it('should inherits from storage', () => {
        expect(the_session_storage instanceof Storage).toBeTruthy();
    });

    it('should set browser window session storage mechanism', () => {
        expect(the_session_storage.storageMechanism).toBe(window.sessionStorage);
    });
});

