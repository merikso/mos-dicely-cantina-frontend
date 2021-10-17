export class Card {

    image: string;
    value: string;
    suit: string;
    code: string;
    state: string;

    constructor(image: string, value: string, suit: string, code: string) {
        this.image = image;
        this.value = value;
        this.suit = suit;
        this.code = code;
        this.state = 'test';
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