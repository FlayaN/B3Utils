import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import codePush from "react-native-code-push";
import { composeWithDevTools } from "remote-redux-devtools";

import { StackNav, TabNav } from "./Router";
import { User, Base, Fitness, Idea } from "../Modules";
import {
    Pages,
    Modules
} from "./Constants";

import { reducer as formReducer } from "redux-form";

const middeWares = [
    thunk
];

const middleware = composeWithDevTools(applyMiddleware(...middeWares));

const rootReducer = combineReducers<StoreDef>({
    [Modules.user]: User.Reducer,
    [Modules.base]: Base.Reducer,
    [Modules.fitness]: Fitness.Reducer,
    [Modules.idea]: Idea.Reducer,
    form: formReducer
});

const firstAction = StackNav.router.getActionForPathAndParams(Pages.MAINMENU);
const tempNavState = StackNav.router.getStateForAction(firstAction);

const defaultStore: StoreDef = {
    user: {
        googleUser: {
            accessToken: "",
            email: "",
            familyName: "",
            givenName: "",
            idToken: "",
            name: "",
            photoUrlTiny: "",
            serverAuthCode: "",
            userID: ""
        },
        avatarUrl: ""
    },
    base: {
        currPage: "start",
        navData: tempNavState,
        eventLog: []
    },
    fitness: {
        users: [],
        initialized: false,
        activitiesData: {},
        selectedFitnessMode: "Avstånd"
    },
    idea: {
        ideas: [],
        ideaMessages: {}
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
        // codePush.sync({
        //     installMode: codePush.InstallMode.IMMEDIATE
        // });
    }
    render() {
        return (
            <Provider store={store}>
                <TabNav />
            </Provider>
        );
    }
}

export default codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })(App);