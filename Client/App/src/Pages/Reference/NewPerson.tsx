import React from "react";
import { reduxForm, FormProps, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";

import {
    View,
    Text,
    Button
} from "react-native";

import { AddCompanyPerson, GetCompanyPersons } from "../../Base/Utilities";

import { FormTextInput, FormSliderInput } from "../../Components";

import { Base, Reference } from "../../Modules";

interface IStoreProps {
    userID: string;
}

interface IProps extends FormProps<CompanyPersonReferenceViewModel, void, void> {
    store: IStoreProps;
    baseActions: Base.Actions.ActionsMap;
    referenceActions: Reference.Actions.ActionsMap;
    navigation: NavigationScreenProp<NavigationRoute<CompanyReferenceViewModel>, any>;
}

class NewPerson extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(values: CompanyPersonReferenceViewModel) {
        const companyId = this.props.navigation.state.params.id;
        await AddCompanyPerson({
            name: values.name,
            position: values.position,
            relation: values.relation,
            description: values.description,
            companyId: companyId,
            userId: this.props.store.userID
        });
        this.props.referenceActions.setCompanyPersons({ companyId, persons: await GetCompanyPersons(companyId) });
        this.props.reset();
        // tslint:disable-next-line:no-null-keyword
        this.props.navigation.goBack(null);
    }
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <View>
                <Text>Namn på person:</Text>
                <Field name="name" component={FormTextInput} />
                <Text>Position på företag:</Text>
                <Field name="position" component={FormTextInput} />
                <Text>Relation till person:</Text>
                <Field name="relation" component={FormSliderInput} minimumValue={1} maximumValue={5} step={1} defaultValue={3} />
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
            userID: state.user.googleUser.userID
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
    form: "newPerson",
    validate: (values: CompanyPersonReferenceViewModel) => {
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

        if (!values.position) {
            errors.position = "Position krävs";
        } else {
            if (!values.position.trim().length) {
                errors.position = "Kräver mer än enbart \"whitespace\"";
            } else if (values.position.length > 35) {
                errors.position = "För lång position, max 35 tecken";
            }
        }
        if (!values.companyId) {
            errors.companyId = "Företag krävs";
        }

        return errors;
    },
    initialValues: {
        relation: 3
    }
})(connect(mapStateToProps, mapDispatchToProps)(NewPerson));