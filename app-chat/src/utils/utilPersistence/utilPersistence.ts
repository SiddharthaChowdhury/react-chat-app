const PersistenceStorageKey = 'dockety';
export enum PersistenceMode {
    Write = 1,
    Update = 2
}

class UtilStorageParent<TStorageInfo extends any> {
    protected setValueFiltered = <TData extends object>(
        id: IdLocalStorage | IdSessionStorage,
        newData: TData,
        currentData: TStorageInfo,
        mode: PersistenceMode = PersistenceMode.Update
    ) => {
        switch (mode) {
            case PersistenceMode.Write:
                currentData[id] = newData;
                break;
            case PersistenceMode.Update:
                currentData[id] = { ...currentData[id], ...(newData as any) };
                break;
        }
    };

    protected getDataFromStorage = <TData extends {}>(
        defaultValue: TData,
        storage: any
    ): TData => {
        const storageData = storage.getItem(PersistenceStorageKey);
        const value = this.deserialize(storageData) || defaultValue;

        return value as TData
    };

    protected setDataToStorage = (
        data: TStorageInfo,
        storage: any,
        force: boolean
    ) => {
        const serializedData = this.serialize(data);
        if (serializedData) {
            if (force) {
                storage.setItem(PersistenceStorageKey, serializedData);

                return null
            } else {
                return setTimeout(storage.setItem(PersistenceStorageKey, serializedData), 300) as any
            }
        }
    };

    private serialize = <TData extends {}> (data: TData | undefined) => {
        if (!data) {
            return undefined
        }
        try {
            return JSON.stringify(data)
        } catch {
            return undefined
        }
    };

    private deserialize = <TData extends {}> (serializedData: string | null): TData | undefined => {
        if (!serializedData) {
            return undefined
        }
        try {
            return JSON.parse(serializedData) as TData
        } catch {
            return undefined
        }
    }
}

/*
* ----------------- LOCAL STORAGE Stuff ------------------
* */
export enum IdLocalStorage {
    token
}
type TypeLocalStorageInfo = { [id in IdLocalStorage]: any }
const initialLocalStorageData: TypeLocalStorageInfo = {
    [IdLocalStorage.token]: null
};

class UtilLocalStorage extends UtilStorageParent<TypeLocalStorageInfo> {
    private readonly data: TypeLocalStorageInfo;
    private setStorageHandle: number | undefined;

    constructor () {
        super();
        this.data = this.getDataFromStorage(initialLocalStorageData, window.localStorage);
    }

    public getValue = <TData> (id: IdLocalStorage, defaultValue?: TData): TData => {
        return this.data[id] || defaultValue
    };

    public setValue = <TData extends {}> (
        id: IdLocalStorage,
        data: TData,
        mode: PersistenceMode = PersistenceMode.Update,
        force: boolean = false
    ) => {
        this.setValueFiltered(id, data, this.data, mode);

        if (this.setStorageHandle) {
            clearTimeout(this.setStorageHandle)
        }

        this.setStorageHandle = this.setDataToStorage(this.data, window.localStorage, force)
    }
}
/*
* ----------------- SESSION STORAGE stuff ------------------
*/
export enum IdSessionStorage {
}
type TypeSessionStorageInfo = { [id in IdSessionStorage]: any }
const initialSessionStorageData: TypeSessionStorageInfo = {
};

class UtilSessionStorage extends UtilStorageParent<TypeSessionStorageInfo> {
    private readonly data: TypeSessionStorageInfo;
    private setStorageHandle: number | undefined;

    constructor () {
        super();
        this.data = this.getDataFromStorage(initialSessionStorageData, window.sessionStorage);
    }

    public getValue = <TData> (id: IdSessionStorage, defaultValue?: TData): TData => {
        // @ts-ignore
        return this.data[id] || defaultValue
    };

    public setValue = <TData extends {}> (
        id: IdSessionStorage,
        data: TData,
        mode: PersistenceMode = PersistenceMode.Update,
        force: boolean = false
    ) => {
        this.setValueFiltered(id, data, this.data, mode)

        if (this.setStorageHandle) {
            clearTimeout(this.setStorageHandle)
        }

        this.setStorageHandle = this.setDataToStorage(this.data, window.sessionStorage, force)
    };

    public clear = (key: IdSessionStorage) => {
        this.setValue(key, {}, PersistenceMode.Write, true)
    }
}

export const utilStorage = {
    session: new UtilSessionStorage(),
    local: new UtilLocalStorage()
};
