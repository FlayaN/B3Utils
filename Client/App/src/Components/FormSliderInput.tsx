import React from "react";

import {
    View,
    Slider,
    Text
} from "react-native";

const FormSliderInput = ({ defaultValue, input: { onChange, value }, meta, ...props }) => {
    return (
        <View style={{height: 60}}>
            <Text>{value}</Text>
            <Slider style={{flex: 1}} onValueChange={onChange} {...props} value={defaultValue} />
            {meta.touched && meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}
        </View>
    );
};

export default FormSliderInput;