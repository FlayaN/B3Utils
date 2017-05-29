import { StackNavigator, TabNavigator, TabNavigatorConfig } from "react-navigation";
import { connect } from "react-redux";

import { Pages } from "./Constants";
import {
    MainMenu,
    Fitness,
    EventLog,
    FitnessUser,
    Profile,
    Ideas,
    NewIdea,
    Idea
} from "../Pages";
import AppWithNavigationState from "./AppNavigator";

export const StackNav = StackNavigator({
    [Pages.MAINMENU]: {
        screen: MainMenu,
        navigationOptions: {
            title: "Start"
        }
    },
    [Pages.FITNESS]: {
        screen: Fitness,
        navigationOptions: {
            title: "Hälsa"
        }
    },
    [Pages.FITNESS_USER]: {
        screen: FitnessUser,
        navigationOptions: ({ navigation }) => ({
            title: `Aktiviteter för ${navigation.state.params.name}`
        })
    },
    [Pages.IDEAS]: {
        screen: Ideas,
        navigationOptions: {
            title: "Idéer"
        }
    },
    [Pages.NEWIDEA]: {
        screen: NewIdea,
        navigationOptions: {
            title: "Skapa ny idé"
        }
    },
    [Pages.IDEA]: {
        screen: Idea,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.header}`
        })
    }
});

export const TabNav = connect()(TabNavigator({
    B3Utils: {
        screen: AppWithNavigationState
    },
    Logg: {
        screen: EventLog
    } as TabNavigatorConfig,
    Profil: {
        screen: Profile
    }
}));