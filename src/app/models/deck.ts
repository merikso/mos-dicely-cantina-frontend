import { Card } from "./card";


export class Deck {

    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;
   

    constructor(success: boolean, deck_id: string, shuffled: boolean, remaining: number) {
        this.success = success;
        this.deck_id = deck_id;
        this.shuffled= shuffled;
        this.remaining = remaining;
    }
}

export class DeckPile {

    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;
    piles: Pile[]
    cards: Card[]
   

    constructor(success: boolean, deck_id: string, shuffled: boolean, remaining: number, piles: Pile[], cards: Card[]) {
        this.success = success;
        this.deck_id = deck_id;
        this.shuffled= shuffled;
        this.remaining = remaining;
        this.piles = piles
        this.cards = cards
    }
}

export class Pile {

    name: string
    remaining: number

    constructor(name: string, remaining:  number) {
        this.name = name,
        this.remaining = remaining
    }

}

