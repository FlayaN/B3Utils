import React from "react";

import {
    View,
    TextInput,
    Text
} from "react-native";

const FormTextInput = ({ input: { onChange, ...restInput }, meta }) => {
    return (
        <View style={{height: 60}}>
            <TextInput style={{flex: 1}} onChangeText={onChange} {...restInput} />
            {meta.touched && meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}
        </View>
    );
};

export default FormTextInput;