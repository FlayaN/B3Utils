import React from "react";
import { connect } from "react-redux";

import { View, Text } from "react-native";

interface IStoreProps {
    UserName: string;
}

interface IProps {
    store: IStoreProps;
}

class TestPage extends React.Component<IProps, {}> {
    static navigationOptions = {
        title: "Test page"
    };
    render() {
        return (
            <View>
                <Text>
                    TestPage
                </Text>
                <Text>
                    User: {this.props.store.UserName}
                </Text>
            </View>
        );
    }
}

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            UserName: state.user.googleUser.email
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(): IProps {
    return {
    } as IProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);