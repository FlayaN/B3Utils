import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import AppWithNavigationState, { AppNavigator } from "./AppNavigator";

import { User, Base } from "./modules";
import { Pages, Modules } from "./Constants";

// import codePush from "react-native-code-push";

const middleware = applyMiddleware(thunk);

const rootReducer = combineReducers<StoreDef>({
    [Modules.user]: User.Reducer,
    [Modules.base]: Base.Reducer
});

const firstAction = AppNavigator.router.getActionForPathAndParams(Pages.MAINMENU);
const tempNavState = AppNavigator.router.getStateForAction(firstAction);

const defaultStore: StoreDef = {
    user: {
        name: "User1"
    },
    base: {
        currPage: "start",
        navData: tempNavState
    }
};

declare var module: any;
const store = createStore<StoreDef>(rootReducer, defaultStore, middleware);

if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = rootReducer;
      store.replaceReducer(nextRootReducer);
    });
}

class App extends React.Component<{}, {}> {
    componentDidMount() {
        // Download update
        // codePush.sync();
    }
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

// export default codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })(App);
export default App;