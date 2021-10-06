export class Card {

    deck_id: string;
    image: string;
    value: string;
    suit: string;
    code: string;

    constructor(deck_id: string, image: string, value: string, suit: string, code: string) {
        this.deck_id = deck_id;
        this.image = image;
        this.value = value;
        this.suit = suit;
        this.code = code;
    }

}