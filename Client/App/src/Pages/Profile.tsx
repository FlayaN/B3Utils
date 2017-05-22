import React from "react";
import { connect } from "react-redux";

import {
    View,
    Text,
    StyleSheet
} from "react-native";

interface IStoreProps {
    name: string;
}

interface IProps {
    store: IStoreProps;
}

class Profile extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return (
            <View style={{flex: 1}}>
                 <Text style={styles.text}>{this.props.store.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        flexDirection: "row",
        margin: 10
    }
});

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            name: state.user.googleUser.name
        } as IStoreProps
    } as IProps;
}

export default connect(mapStateToProps)(Profile);