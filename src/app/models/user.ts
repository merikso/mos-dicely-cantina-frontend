export class User {

    id: number;
    chips: number;
    username: string;
    password: string;
    
    constructor(id: number, chips: number, username: string, password: string) {
        this.id = id;
        this.chips = chips;
        this.username = username;
        this.password = password;
    }
}
        
type Overwrite<T1, T2> = Pick<T1, Exclude<keyof T1, keyof T2>> & T2;

export type UserWithId = Overwrite<User, { id: number }>;

