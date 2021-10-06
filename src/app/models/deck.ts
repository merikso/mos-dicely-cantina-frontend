export class Deck {

    deckId: string;
    shuffled: boolean;
    remaining: number;

    constructor(deckId: string, shuffled: boolean, remaining: number) {
        this.deckId = deckId;
        this.shuffled= shuffled;
        this.remaining = remaining;
    }
}