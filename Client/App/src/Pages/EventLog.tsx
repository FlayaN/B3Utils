import React from "react";
import { connect } from "react-redux";
import {
    View,
    SectionList,
    Text
} from "react-native";
import { baseStyles } from "../Base/Styles";

interface IStoreProps {
    events: IEvent[];
}

interface IProps {
    store: IStoreProps;
}

class EventLog extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        const { events } = this.props.store;
        return (
            <View style={{ flex: 1 }}>
                <SectionList
                    renderSectionHeader={({ section }) => <Text style={baseStyles.header}>{section.key}</Text>}
                    keyExtractor={(_item, index) => index.toString()}
                    renderItem={({ item }: { item: IEvent }) => (
                        <View style={{ flexDirection: "row", margin: 10 }}>
                            <Text style={[baseStyles.column, { color: item.type === EventType.Error ? "red" : "black" }]}>
                                {item.message}
                            </Text>
                        </View>
                    )}
                    sections={[
                        { data: events, key: "Events" }
                    ]} />
            </View>
        );
    }
}

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            events: state.base.eventLog
        } as IStoreProps
    } as IProps;
}

export default connect(mapStateToProps)(EventLog);