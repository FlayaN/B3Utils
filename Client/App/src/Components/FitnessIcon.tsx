import React from "react";

import Icon from "react-native-vector-icons/Ionicons";
import FaIcon from "react-native-vector-icons/FontAwesome";

interface IProps {
    fitnessMode: FitnessType;
    amount: number;
}

const FitnessIcon = (props: IProps) => {
    if (props.fitnessMode === FitnessType.Distance) {
        return <FaIcon name={"road"} size={20}>{(props.amount / 1000).toFixed(2)}km</FaIcon>;
    } else {
         return <Icon name="md-walk" size={20}>{props.amount}</Icon>;
    }
};

export default FitnessIcon;