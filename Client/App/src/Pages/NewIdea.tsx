import React from "react";
import { reduxForm, FormProps, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import moment from "moment";

import {
    View,
    Text,
    Button
} from "react-native";

import { AddIdea } from "../Base/Utilities";
import { Pages } from "../Base/Constants";

import { FormTextInput } from "../Components";

import { Base } from "../Modules";

interface IStoreProps {
    userID: string;
}

interface IProps extends FormProps<IdeaViewModel, void, void> {
    store: IStoreProps;
    baseActions: Base.Actions.ActionsMap;
}

class NewIdea extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(values: IdeaViewModel) {
        await AddIdea({
            id: "00000000-0000-0000-0000-000000000000",
            userId: this.props.store.userID,
            userName: "",
            header: values.header,
            detail: values.detail,
            messageCount: 0,
            timeStamp: moment().format()
        });

        this.props.reset();

        this.props.baseActions.navigate({to: Pages.IDEAS});
    }
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <View>
                <Text>Rubrik:</Text>
                <Field name="header" component={FormTextInput} />
                <Text>Detaljer:</Text>
                <Field multiline={true} name="detail" component={FormTextInput} />
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
        baseActions: bindActionCreators(Base.Actions.Actions, dispatch)
    } as IProps;
}


export default reduxForm({
    form: "newIdea",
    validate: (values: IdeaViewModel) => {
        const errors: any = {};

        if (!values.header) {
            errors.header = "Rubrik krävs";
        }

        if (values.header && values.header.length > 35) {
            errors.header = "För lång rubrik, max 35 tecken";
        }

        if (!values.detail) {
            errors.detail = "Detailjer krävs";
        }
        return errors;
    }
})(connect(mapStateToProps, mapDispatchToProps)(NewIdea));