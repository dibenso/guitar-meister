import { KEYS } from "./constants";

export default class Controls {
  private _green: boolean;
  private _red: boolean;
  private _yellow: boolean;
  private _blue: boolean;
  private _orange: boolean;
  private _strum: boolean;

  constructor() {
    this._green = false;
    this._red = false;
    this._yellow = false;
    this._blue = false;
    this._orange = false;
    this._strum = false;
  }

  get green(): boolean {
    return this._green;
  }

  get red(): boolean {
    return this._red;
  }

  get yellow(): boolean {
    return this._yellow;
  }

  get blue(): boolean {
    return this._blue;
  }

  get orange(): boolean {
    return this._orange;
  }

  get strum(): boolean {
    return this._strum;
  }
}
