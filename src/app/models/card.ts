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

export class Draw {

    success: boolean;
    cards: Card[];
    deck_id: string;
    remaining: number;

    constructor(success: boolean, cards: Card[], deck_id: string, remaining: number) {
        this.success = success;
        this.cards = cards;
        this.deck_id = deck_id;
        this.remaining = remaining;
    }
}