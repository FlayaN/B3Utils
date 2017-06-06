import React from "react";
import { reduxForm, FormProps, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationScreenProp } from "react-navigation";

import {
    View,
    Text,
    Button
} from "react-native";

import { AddCompany, GetCompanies } from "../../Base/Utilities";

import { FormTextInput } from "../../Components";

import { Base, Reference } from "../../Modules";

interface IStoreProps {
    userID: string;
    companies: CompanyReferenceViewModel[];
}

interface IProps extends FormProps<CompanyReferenceViewModel, void, void> {
    store: IStoreProps;
    baseActions: Base.Actions.ActionsMap;
    referenceActions: Reference.Actions.ActionsMap;
    navigation: NavigationScreenProp<any, any>;
}

class NewCompany extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(values: CompanyReferenceViewModel) {
        await AddCompany({
            city: values.city,
            name: values.name,
            description: values.description
        });
        this.props.referenceActions.setCompanies(await GetCompanies());
        this.props.reset();
        // tslint:disable-next-line:no-null-keyword
        this.props.navigation.goBack(null);
    }
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <View>
                <Text>Namn:</Text>
                <Field name="name" component={FormTextInput} />
                <Text>Stad:</Text>
                <Field name="city" component={FormTextInput} />
                <Text>Beskrivning:</Text>
                <Field name="description" component={FormTextInput} />
                <Button disabled={submitting} title="Skapa" onPress={handleSubmit(this.onSubmit) as any} />
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

export default reduxForm({
    form: "newCompany",
    validate: (values: CompanyReferenceViewModel) => {
        const errors: any = {};

        if (!values.name) {
            errors.name = "Namn krävs";
        } else {
            if (!values.name.trim().length) {
                errors.name = "Kräver mer än enbart \"whitespace\"";
            } else if (values.name.length > 35) {
                errors.name = "För långt namn, max 35 tecken";
            }
        }

        if (!values.city) {
            errors.city = "Stad krävs";
        } else {
            if (!values.city.trim().length) {
                errors.city = "Kräver mer än enbart \"whitespace\"";
            } else if (values.city.length > 35) {
                errors.city = "För lång stad, max 35 tecken";
            }
        }

        return errors;
    }
})(connect(mapStateToProps, mapDispatchToProps)(NewCompany));