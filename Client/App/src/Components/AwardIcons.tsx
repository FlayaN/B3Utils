import React from "react";
import { View } from "react-native";
import { AwardIcon } from "./index";

interface IProps {
    awards: AwardViewModel[];
}

const AwardIcons = (props: IProps) => {
    const { awards } = props;
    if (awards.length === 0) {
        // tslint:disable-next-line:no-null-keyword
        return null;
    }

    const goldAwardCount = awards.filter(x => x.placement === 1).length;
    const silverAwardCount = awards.filter(x => x.placement === 2).length;
    const bronzeAwardCount = awards.filter(x => x.placement === 3).length;

    return (
        <View style={{flexDirection: "row"}}>
            {bronzeAwardCount > 0 && <AwardIcon content={bronzeAwardCount.toString()} placement={3} />}
            {silverAwardCount > 0 && <AwardIcon content={silverAwardCount.toString()} placement={2} />}
            {goldAwardCount > 0 && <AwardIcon content={goldAwardCount.toString()} placement={1} />}
        </View>
    );
};

export default AwardIcons;