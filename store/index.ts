import { createStore, applyMiddleware, AnyAction } from "redux";
import { MakeStore, createWrapper, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export interface State {
  tick: string;
}

// create your reducer
const reducer = (state: State = { tick: "init" }, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case "TICK":
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore: MakeStore<State> = () => createStore(reducer, bindMiddleware([thunkMiddleware]));

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true });
