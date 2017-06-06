import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationScreenProp } from "react-navigation";
import {
    View,
    Text,
    SectionList,
    TouchableOpacity,
    RefreshControl,
    Button
} from "react-native";

import { Base, Reference } from "../../Modules";
import { Pages } from "../../Base/Constants";
import { GetCompanies } from "../../Base/Utilities";
import { baseStyles } from "../../Base/Styles";

interface IStoreProps {
    userID: string;
    companies: CompanyReferenceViewModel[];
}

interface IProps {
    store: IStoreProps;
    baseActions: Base.Actions.ActionsMap;
    referenceActions: Reference.Actions.ActionsMap;
    navigation: NavigationScreenProp<any, any>;
}

interface IState {
    refreshing: boolean;
}

class Companies extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.state = {
            refreshing: false
        };
    }
    async updateData() {
        try {
            this.setState({ refreshing: true });
            this.props.referenceActions.setCompanies(await GetCompanies());
            // Load data here
        } catch (error) {
            this.props.baseActions.logError(error);
        }
        this.setState({ refreshing: false });
    }
    async componentDidMount() {
        await this.updateData();
    }
    render() {
        let { companies } = this.props.store;
        // ideas = ideas.map(item => { return { ...item, key: item.id }; });
        return (
            <View style={{ flex: 1 }}>
                <Button title="Lägg till nytt företag" onPress={() => this.props.baseActions.navigate({ to: Pages.NEWCOMPANY })} />
                <SectionList
                    renderSectionHeader={({ section }) => <Text style={baseStyles.header}>{section.key}</Text>}
                    keyExtractor={(item: CompanyReferenceViewModel) => item.id}
                    refreshControl={<RefreshControl
                        onRefresh={() => { this.updateData(); }}
                        refreshing={this.state.refreshing} />}
                    renderItem={({ item }: { item: CompanyReferenceViewModel }) => (
                        <TouchableOpacity onPress={() => { this.props.baseActions.navigate({ to: Pages.COMPANY, params: item }); }}>
                            <View style={baseStyles.itemRow}>
                                <Text style={[baseStyles.column, {fontWeight: "bold"}]}>{item.name}</Text>
                                <Text style={baseStyles.column}>{item.city}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    sections={[
                        { data: companies, key: "Företag" }
                    ]} />
            </View>
        );
    }
}

function mapStateToProps(state: StoreDef): IProps {
    return {
        store: {
            userID: state.user.googleUser.userID,
            companies: state.reference.companies
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch): IProps {
    return {
        baseActions: bindActionCreators(Base.Actions.Actions, dispatch),
        referenceActions: bindActionCreators(Reference.Actions.Actions, dispatch)
    } as IProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies);