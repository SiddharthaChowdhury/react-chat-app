export const enum IdPersistence {
    auth = 'auth',
}

export type PersistenceData = {[id in IdPersistence]: any};
