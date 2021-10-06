export class Card {

    image: string;
    value: string;
    suit: string;
    code: string;

    constructor(image: string, value: string, suit: string, code: string) {
        this.image = image;
        this.value = value;
        this.suit = suit;
        this.code = code;
    }

}