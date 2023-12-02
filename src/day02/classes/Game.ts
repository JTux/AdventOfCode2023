export default class Game {
  private _id: number;
  private _maxRed: number = 0;
  private _maxGreen: number = 0;
  private _maxBlue: number = 0;
  private _red: number = 0;
  private _green: number = 0;
  private _blue: number = 0;

  /**
   * @param input Corresponding line that matches format Game ID: XR1, YG1, ZB1; XR2, YG2, ZB2; XR3, YG3, ZB3
   */
  constructor(input: string, maxRed = 12, maxGreen = 13, maxBlue = 14) {
    this._maxRed = maxRed;
    this._maxGreen = maxGreen;
    this._maxBlue = maxBlue;

    const segments = input.split(":");

    this._id = Number(segments[0].split(" ")[1]);

    const rounds = segments[1].trim().split(";");

    rounds.forEach(round => {
      const pulls = round.split(",");

      pulls.forEach(pull => {
        if (pull.includes("red")) {
          const redPull = Number(pull.replace("red", ""));
          if (redPull > this._red)
            this._red = redPull;
        } else if (pull.includes("green")) {
          const greenPull = Number(pull.replace("green", ""));
          if (greenPull > this._green)
            this._green = greenPull;
        } else if (pull.includes("blue")) {
          const bluePull = Number(pull.replace("blue", ""));
          if (bluePull > this._blue)
            this._blue = bluePull;
        }
      })
    })
  }

  public get id() {
    return this._id;
  }

  public get red() {
    return this._red;
  }

  public get green() {
    return this._green;
  }

  public get blue() {
    return this._blue;
  }

  public get isValid() {
    return (
      this._red <= this._maxRed &&
      this._green <= this._maxGreen &&
      this._blue <= this._maxBlue
    );
  }
}