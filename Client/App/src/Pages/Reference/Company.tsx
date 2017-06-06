import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";

import {
    View,
    Text,
    SectionList,
    RefreshControl,
    Button
} from "react-native";

import { GetCompanyPersons } from "../../Base/Utilities";
// import { Pages } from "../Base/Constants";
import { Reference, Base } from "../../Modules";
import { Pages } from "../../Base/Constants";
import { baseStyles } from "../../Base/Styles";

interface IStoreProps {
    company: CompanyReferenceViewModel;
    persons: CompanyPersonReferenceViewModel[];
    userId: string;
    userName: string;
}

interface IProps {
    store: IStoreProps;
    referenceActions: Reference.Actions.ActionsMap;
    navigation: NavigationScreenProp<NavigationRoute<CompanyReferenceViewModel>, any>;
    baseActions: Base.Actions.ActionsMap;
}

interface IState {
    refreshing: boolean;
}

class CompanyPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.state = {
            refreshing: false
        };
        // this.onSend = this.onSend.bind(this);
        // this.deleteIdea = this.deleteIdea.bind(this);
    }
    async updateData() {
        this.setState({ refreshing: true });
        const companyId = this.props.navigation.state.params.id;
        // console.log(messages);
        this.props.referenceActions.setCompanyPersons({ companyId, persons: await GetCompanyPersons(companyId) });
        this.setState({ refreshing: false });
    }
    async componentDidMount() {
        await this.updateData();
    }
    render() {
        const { company, persons } = this.props.store;
        if (company === undefined || persons === undefined) {
            // tslint:disable-next-line:no-null-keyword
            return null;
        }

        return (
            <View style={{ flex: 1 }}>
                <Text>{company.description}</Text>
                <Button title="Lägg till ny person" onPress={() => this.props.baseActions.navigate({ to: Pages.NEWPERSON, params: company })} />
                <SectionList
                    renderSectionHeader={({ section }) => <Text style={baseStyles.header}>{section.key}</Text>}
                    keyExtractor={(x: CompanyPersonReferenceViewModel) => x.id}
                    refreshControl={<RefreshControl
                        onRefresh={() => { this.updateData(); }}
                        refreshing={this.state.refreshing} />}
                    renderItem={({ item }: { item: CompanyPersonReferenceViewModel }) => (
                        <View style={baseStyles.itemRow}>
                            <Text style={baseStyles.column}>{item.name}</Text>
                            <Text style={baseStyles.column}>{item.position}</Text>
                        </View>
                    )}
                    sections={[
                        { data: persons, key: "Personer" }
                    ]} />
            </View>
        );
    }
}

function mapStateToProps(state: StoreDef, ownProps: IProps): IProps {
    return {
        store: {
            company: state.reference.companies.find((company) => company.id === ownProps.navigation.state.params.id),
            userId: state.user.googleUser.userID,
            persons: state.reference.companyPersons[ownProps.navigation.state.params.id],
            userName: state.user.googleUser.name
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch: any): IProps {
    return Object.assign({ dispatch: dispatch }, {
        referenceActions: bindActionCreators(Reference.Actions.Actions, dispatch),
        baseActions: bindActionCreators(Base.Actions.Actions, dispatch)
    } as IProps);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);