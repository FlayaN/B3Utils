import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    View,
    ViewStyle,
    StyleSheet
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import FaIcon from "react-native-vector-icons/FontAwesome";

import { SegmentedControls } from "react-native-radio-buttons";
import { Fitness } from "../Modules";

interface IStoreProps {
    fitnessMode: FitnessType;
    filterMode: FilterType;
}

interface IOwnProps {
    onChange: (fitnessMode: FitnessType, filterMode: FilterType) => void;
}

interface IProps extends IOwnProps {
    store?: IStoreProps;
    fitnessActions?: Fitness.Actions.ActionsMap;
}

class FitnessFilter extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            refreshing: false
        };
    }
    renderFitnessOption(option, selected) {
        const style = selected ? { fontWeight: "bold", textAlign: "center" } : { textAlign: "center" };

        if (option === FitnessType.Distance) {
            return <FaIcon style={style as any} name="road" size={20}></FaIcon>;
        } else {
            return <Icon style={style as any} name="md-walk" size={20}></Icon>;
        }
    }
    renderFilterOption(option, selected) {
        const style = selected ? { fontWeight: "bold", textAlign: "center" } : { textAlign: "center" };

        if (option === FilterType.All) {
            return <FaIcon style={style as any} name="calendar" size={20}>*</FaIcon>;
        } else if (option === FilterType.Month) {
            return <FaIcon style={style as any} name="calendar" size={20}>M</FaIcon>;
        } else {
            return <FaIcon style={style as any} name="calendar" size={20}>V</FaIcon>;
        }
    }
    setSelectedFitnessMode(selectedOption) {
        this.props.fitnessActions.setSelectedFitnessMode(selectedOption);
        this.props.onChange(selectedOption, this.props.store.filterMode);
    }
    setSelectedFilterMode(selectedOption) {
        this.props.fitnessActions.setSelectedFilterMode(selectedOption);
        this.props.onChange(this.props.store.fitnessMode, selectedOption);
    }
    render() {
        const { filterMode, fitnessMode } = this.props.store;
        return (
            <View style={{ flexDirection: "row" }}>
                <View style={styles.modePicker}>
                    <SegmentedControls
                        style={styles.itemRow}
                        options={[FitnessType.Distance, FitnessType.Steps]}
                        onSelection={this.setSelectedFitnessMode.bind(this)}
                        selectedOption={fitnessMode}
                        renderOption={this.renderFitnessOption}
                        renderContainer={(optionNodes) => <View>{optionNodes}</View>} />
                </View>
                <View style={styles.filterPicker}>
                    <SegmentedControls
                        style={styles.itemRow}
                        options={[FilterType.All, FilterType.Month, FilterType.Week]}
                        onSelection={this.setSelectedFilterMode.bind(this)}
                        selectedOption={filterMode}
                        renderOption={this.renderFilterOption}
                        renderContainer={(optionNodes) => <View>{optionNodes}</View>} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: "row",
        margin: 10
    } as ViewStyle,
    modePicker: {
        width: 100,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flex: 1
    } as ViewStyle,
    filterPicker: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flex: 1.5
    } as ViewStyle
});

function mapStateToProps(state: StoreDef, ownProps: IOwnProps): IProps {
    return {
        ...ownProps,
        store: {
            email: state.user.googleUser.email,
            users: state.fitness.users,
            userID: state.user.googleUser.userID,
            fitnessMode: state.fitness.selectedFitnessMode,
            filterMode: state.fitness.selectedFilterMode
        } as IStoreProps
    } as IProps;
}

function mapDispatchToProps(dispatch): IProps {
    return {
        fitnessActions: bindActionCreators(Fitness.Actions.Actions, dispatch)
    } as IProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(FitnessFilter);