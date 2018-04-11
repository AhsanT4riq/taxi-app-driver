import { createStore, applyMiddleware, compose } from "redux";
import devTools from "remote-redux-devtools";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { autoRehydrate, persistStore, createTransform } from "redux-persist";
import { createBlacklistFilter } from "redux-persist-transform-filter";
import { AsyncStorage } from "react-native";
import reducer from "./reducers";
import promise from "./promise";

const blacklistFilter = createBlacklistFilter("driver", [
  "tripRequest",
  "trip",
  "rideCardPayment",
  "paymentOption",
  "appState.loadingStatus"
]);

export default function configureStore(onCompletion): any {
  const logger = createLogger();
  const enhancer = compose(
    applyMiddleware(thunk, promise), //(thunk, promise, logger),
    autoRehydrate(),
    devTools({
      name: 'StrapTaxiApp-Driver',
      realtime: true,
    })
  );

  const store = createStore(reducer, enhancer);
  persistStore(
    store,
    {
      storage: AsyncStorage,
      blacklist: [
        "socialLogin",
        "entrypage",
        "form",
        "route",
        "trip",
        "viewStore",
        "rideCardPayment"
      ]
      // transforms: [blacklistFilter]
    },
    onCompletion
  );

  return store;
}
