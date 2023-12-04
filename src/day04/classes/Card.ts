export class Card {
  public readonly id: number;
  public readonly matches: number[];

  constructor(data: string) {
    const segments = data.split(": ");
    this.id = Number(segments[0].replace("Card ", ""));
    const numbers = segments[1].split(" | ");

    const winningNumbers = this.parseSet(numbers[0]);
    const givenNumbers = this.parseSet(numbers[1]);

    this.matches = givenNumbers.filter(n =>
      winningNumbers.some(w => w === n)
    );
  }

  public get pointValue() {
    let value = 0;
    for (let i = 0; i < this.matches.length; i++) {
      if (value == 0) {
        value++
      } else {
        value += value
      }
    }
    return value;
  }

  private parseSet = (set: string) => {
    return set.split(" ")
      .filter(n => n)
      .map(n => Number(n));
  }
}