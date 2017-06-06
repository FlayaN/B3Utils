/*import React from "react";

import {
    View,
    Text,
    Picker
} from "react-native";

const FormSelectInput = ({ input, meta: { touched, error } }) => {
    return (
        <View style={{ height: 60 }}>
            <Picker {...input}
                selectedValue={input.value}
                onValueChange={(value) => input.onChange(value)}
                children={children} {...custom} />
            {touched && error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
    );
};

export default FormSelectInput;*/

// const renderVehicleSelect = ({ input, label, meta: {touched, error}, children, ...custom }) => (

// <Picker {...input} selectedValue={input.value} onChange={(event, index, value) => input.onValueChange(value)}
// children={children} {...custom} />
// );