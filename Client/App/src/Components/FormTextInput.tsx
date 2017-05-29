import React from "react";

import {
    View,
    TextInput,
    Text
} from "react-native";

const FormTextInput = ({ input: { onChange, ...restInput }, meta }) => {
    return (
        <View>
            <TextInput onChangeText={onChange} {...restInput} />
            {meta.visited && !meta.active && meta.invalid && <Text style={{ color: "red" }}>{meta.error}</Text>}
        </View>
    );
};

export default FormTextInput;