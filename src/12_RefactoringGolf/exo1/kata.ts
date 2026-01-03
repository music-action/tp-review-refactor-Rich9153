/* eslint-disable */

// read the code
export class Game {
  private _lastSymbol = " ";
  private _toto: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    //if first move
    this.FirstMove(symbol);
    //if not first move but player repeated
    this.NotFirstMoveButSamePlayer(symbol);

    //if not first move but play on an already played tile
    this.NotFirstMoveButPlayOnAlreadyTile(x, y);

    // update game state
    this.UpdatePlay(symbol, x, y);
  }

  private UpdatePlay(symbol: string, x: number, y: number) {
    this._lastSymbol = symbol;
    this._toto.AddTileAt(symbol, x, y);
  }

  private NotFirstMoveButPlayOnAlreadyTile(x: number, y: number) {
    if (!this.firstmove() && this._toto.TileAt(x, y).Symbol !== " ") {
      throw new Error("Invalid position");
    }
  }

  private FirstMove(symbol: string) {
    if (this.firstmove()) {
      //if player is 0
      this.ifPlayerIsFirstAllow(symbol);
    }
  }

  private NotFirstMoveButSamePlayer(symbol: string) {
    if (!this.firstmove() && symbol === this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private ifPlayerIsFirstAllow(symbol: string) {
    if (symbol == "O") {
      throw new Error("Invalid first player");
    }
  }

  private firstmove() {
    return this._lastSymbol == " ";
  }

  public Winner(): string {

    let rowWinner = " ";

    //if the positions in first row are taken
    rowWinner = this.checkRow(0);

    if (rowWinner !== " ") {
      return rowWinner
    }

    //if the positions in 2nd row are taken
    const secondRowWinner = this.checkRow(1);
    if (secondRowWinner !== " ") {
      return secondRowWinner;
    }

    //if the positions in 3rd row are taken
    const thirdRowWinner = this.checkRow(2);
    if (thirdRowWinner !== " ") {
      return thirdRowWinner;
    }

    return " ";
  }

  private checkRow(row: number): string {
    if (
        this._toto.TileAt(row, 0)!.Symbol !== " " &&
        this._toto.TileAt(row, 1)!.Symbol !== " " &&
        this._toto.TileAt(row, 2)!.Symbol !== " " &&
        this._toto.TileAt(row, 0)!.Symbol === this._toto.TileAt(row, 1)!.Symbol &&
        this._toto.TileAt(row, 2)!.Symbol === this._toto.TileAt(row, 1)!.Symbol
    ) {
      return this._toto.TileAt(row, 0)!.Symbol;
    }

    return " ";
  }
}


  interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: " " };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };

    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}

// create a PR,
// fix indentation first
//  commit and push
// make your comments,
// then refactor
// submit your PR for review
