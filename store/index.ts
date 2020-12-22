import { createStore, applyMiddleware, combineReducers } from "redux";
import { MakeStore, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducers/app";
import gameReducer from "./reducers/game";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// create a makeStore function
const makeStore: MakeStore<RootState> = () =>
  createStore(combineReducers({ app: appReducer, game: gameReducer }), bindMiddleware([thunkMiddleware]));

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
