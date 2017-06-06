import React from "react";

import { StackNavigator, TabNavigator } from "react-navigation";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import { Pages } from "./Constants";
import {
    MainMenu,
    Fitness,
    EventLog,
    FitnessUser,
    Profile,
    Ideas,
    NewIdea,
    Idea,
    Companies,
    Company,
    NewCompany,
    NewPerson
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
    },
    [Pages.COMPANIES]: {
        screen: Companies,
        navigationOptions: {
            title: "Kontaktnät"
        }
    },
    [Pages.NEWCOMPANY]: {
        screen: NewCompany,
        navigationOptions: {
            title: "Skapa nytt företag"
        }
    },
    [Pages.COMPANY]: {
        screen: Company,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name}`
        })
    },
    [Pages.NEWPERSON]: {
        screen: NewPerson,
        navigationOptions: ({ navigation }) => ({
            title: `Skapa ny person på ${navigation.state.params.name}`
        })
    }
});

export const TabNav = connect()(TabNavigator({
    B3Utils: {
        screen: AppWithNavigationState,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="home" size={35} color={tintColor} />
        }
    },
    Logg: {
        screen: EventLog,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="list-alt" size={35} color={tintColor} />
        }
    },
    Profil: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="user-circle" size={35} color={tintColor} />
        }
    }
}));