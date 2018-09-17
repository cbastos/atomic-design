import { Storage } from '../storage';
import './configureLocalStorageFake';

describe('The storage', () => {
    let the_session_storage;
    const SOME_KEY = 'some-key';

    beforeEach(() => {
        the_session_storage = new Storage(window.localStorage);
    });

    afterEach(() => {
        window.localStorage.removeItem(SOME_KEY);
    });

    it('should add to local storage some non-object value', () => {
        const SOME_VALUE = 'some-value';

        the_session_storage.set(SOME_KEY, SOME_VALUE);

        const value_of_localstorage = window.localStorage.getItem(SOME_KEY);
        expect(value_of_localstorage).toEqual(SOME_VALUE);
    });

    it('should add to local storage some object serialized', () => {
        const SOME_OBJECT_VALUE = { some: { object: 'value' } };

        the_session_storage.set(SOME_KEY, SOME_OBJECT_VALUE);

        const value_of_localstorage = JSON.parse(window.localStorage.getItem(SOME_KEY));
        expect(value_of_localstorage).toEqual(SOME_OBJECT_VALUE);
    });

    it('should get from local storage some non-object value', () => {
        const SOME_VALUE = 'irrelevant';
        window.localStorage.setItem(SOME_KEY, SOME_VALUE);

        const default_storage_value = the_session_storage.get(SOME_KEY);

        expect(default_storage_value).toEqual(SOME_VALUE);
    });

    it('should get from local storage some object deserialized', () => {
        const SOME_OBJECT_VALUE = { some: { object: 'value' } };
        window.localStorage.setItem(SOME_KEY, JSON.stringify(SOME_OBJECT_VALUE));

        const default_storage_value = the_session_storage.get(SOME_KEY);

        expect(default_storage_value).toEqual(SOME_OBJECT_VALUE);
    });

    it('should remove from local storage some entry', () => {
        const irrelevant_data = 'some irrelevant data';
        window.localStorage.setItem(SOME_KEY, irrelevant_data);

        the_session_storage.delete(SOME_KEY);

        const local_storage_value = window.localStorage.getItem(SOME_KEY);
        expect(local_storage_value).toBeNull();
    });
});
