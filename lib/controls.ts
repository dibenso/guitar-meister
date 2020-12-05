import { KEYS } from "./constants";

// used by the Control class toggleFromEvent() method to turn on and off controls
// based off of keyup / keydown events and if a keydown is repeated
function togglePredicate(up: boolean, repeat: boolean): boolean {
  return up && !repeat ? false : true;
}

// like keyboard event but only contains what we need
// makes testing this functionality a little easier
export interface ControlEvent {
  code: string;
  repeat: boolean;
}

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

  public toggleFromEvent(event: ControlEvent, up: boolean, badStrumCallback: () => void): void {
    const { code, repeat } = event;

    switch (code) {
      case KEYS.GREEN:
        this._green = togglePredicate(up, repeat);
        break;
      case KEYS.RED:
        this._red = togglePredicate(up, repeat);
        break;
      case KEYS.YELLOW:
        this._yellow = togglePredicate(up, repeat);
        break;
      case KEYS.BLUE:
        this._blue = togglePredicate(up, repeat);
        break;
      case KEYS.ORANGE:
        this._orange = togglePredicate(up, repeat);
        break;
      case KEYS.STRUM:
        this._strum = up || repeat ? false : true;
        badStrumCallback();
        break;
    }
  }

  // returns true if no note controls are pressed
  private emptyControls(): boolean {
    return !(this.green || this.red || this.yellow || this.blue || this.orange);
  }
}
