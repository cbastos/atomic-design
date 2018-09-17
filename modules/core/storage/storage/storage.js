/**
 * The local storage provides methods for get, set and delete items
 * from an storage mechanism.
 */
export class Storage {
    constructor(storageMechanism) {
        this.storageMechanism = storageMechanism;
    }

    /**
     * Saves some resource value using the configured storage mechanism.
     * @param key resource key
     * @param value resource value
     */
    set(key, value) {
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
        this.storageMechanism.setItem(key, stringValue);
    }

    /**
     * Retrieves a value by key using the storage mechanism.
     * @param key resource key to retrieve
     */
    get(key) {
        const value = this.storageMechanism.getItem(key);
        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    }

    /**
     * Deletes some resource by key.
     * @param key resource key to delete
     */
    delete(key) {
        this.storageMechanism.removeItem(key);
    }
}
