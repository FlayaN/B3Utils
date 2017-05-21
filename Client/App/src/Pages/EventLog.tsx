import React from "react";
import { connect } from "react-redux";

import {
    View,
    SectionList,
    Text,
    StyleSheet
} from "react-native";

interface IStoreProps {
    events: IEvent[];
}

interface IListItem {
    index: number;
    item: IEvent;
}

interface IProps {
    store: IStoreProps;
}

class EventLog extends React.Component<IProps, {}> {
    static navigationOptions = {
        title: "EventLog"
    };
    constructor(props: IProps) {
        super(props);
    }
    render() {
        const events = this.props.store.events.map((item, index) => { return {...item, key: index}; });
        return (
            <View>
                <SectionList
                    renderSectionHeader={({ section }) => <Text style={styles.header}>{section.key}</Text>}
                    renderItem={(item: IListItem) => (
                        <View style={styles.itemRow}>
                            <Text style={styles.column}>{item.item.message}</Text>
                        </View>
                    )}
                    sections={[
                        { data: events, key: "Events" }
                    ]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: "row",
        margin: 10
    },
    header: {
        fontWeight: "bold",
        fontSize: 18,
        margin: 10
    },
    column: {
        marginLeft: 10
    }
});

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            events: state.base.eventLog
        } as IStoreProps
    } as IProps;
}

export default connect(mapStateToProps)(EventLog);