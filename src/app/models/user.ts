export class User {

    id: number;
    username: string;
    password: string;
    chips: number;

    constructor(id: number, username: string, password: string, chips: number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.chips = chips;
    }
}

type Overwrite<T1, T2> = Pick<T1, Exclude<keyof T1, keyof T2>> & T2;

export type UserWithId = Overwrite<User, { id: number }>;

