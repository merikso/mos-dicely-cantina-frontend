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