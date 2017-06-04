import React from "react";
import FaIcon from "react-native-vector-icons/FontAwesome";

interface IProps {
    content?: string;
    placement: number;
}

const AwardIcons = (props: IProps) => {
    const { placement, content } = props;
    if (placement === 1) {
        return <FaIcon name={"star"} color={"gold"} size={20}>{content}</FaIcon>;
    } else if (placement === 2) {
        return <FaIcon name={"star"} color={"silver"} size={20}>{content}</FaIcon>;
    } else {
        return <FaIcon name={"star"} color={"#CD7F32"} size={20}>{content}</FaIcon>;
    }
};

export default AwardIcons;