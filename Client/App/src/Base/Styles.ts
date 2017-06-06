import {
    StyleSheet,
    ViewStyle,
    TextStyle
} from "react-native";

export const baseStyles = StyleSheet.create({
    itemRow: {
        flexDirection: "row",
        margin: 10,
        maxHeight: 60
    } as ViewStyle,
    header: {
        fontWeight: "bold",
        fontSize: 18,
        margin: 10,
        marginTop: 0
    } as TextStyle,
    column: {
        marginLeft: 10,
        flex: 1
    } as TextStyle
});