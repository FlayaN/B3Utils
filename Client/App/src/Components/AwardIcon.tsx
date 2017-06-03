import React from "react";
import FaIcon from "react-native-vector-icons/FontAwesome";

interface IProps {
    count: number;
}

const AwardIcon = (props: IProps) => {
    const { count } = props;
    if (count === 0) {
        // tslint:disable-next-line:no-null-keyword
        return null;
    }
    return <FaIcon name={"star"} color={"gold"} size={20}>{count}</FaIcon>;
    // return <Text>{award.extra}</Text>;
};

export default AwardIcon;