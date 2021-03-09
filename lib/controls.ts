import { ControlEvent, ControlCallbacks } from "./types";
import { KEYS } from "./constants";

// used by the Control class toggleFromEvent() method to turn on and off controls
// based off of keyup / keydown events and if a keydown is repeated
function togglePredicate(up: boolean, repeat: boolean): boolean {
  return up && !repeat ? false : true;
}

export default class Controls {
  private _green: boolean;
  private _red: boolean;
  private _yellow: boolean;
  private _blue: boolean;
  private _orange: boolean;
  private _strum: boolean;
  private _callbacks: ControlCallbacks;

  constructor(callbacks: ControlCallbacks) {
    this._green = false;
    this._red = false;
    this._yellow = false;
    this._blue = false;
    this._orange = false;
    this._strum = false;
    this._callbacks = callbacks;
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

  public toggleFromEvent(event: ControlEvent, up: boolean): void {
    const { code, repeat } = event;
    const { onBadStrum, onPause } = this._callbacks;

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
        onBadStrum();
        break;
      case KEYS.PAUSE:
        if (!up) onPause();
        break;
      default:
        break;
    }
  }

  // returns true if no note controls are pressed
  public emptyControls(): boolean {
    return !(this.green || this.red || this.yellow || this.blue || this.orange);
  }
}
