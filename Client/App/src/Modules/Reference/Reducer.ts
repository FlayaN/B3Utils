import { handleActions } from "redux-actions";
import { ActionTypes } from "./Constants";
import { update } from "../../Base/Utilities";

const Reducer = handleActions({
    [ActionTypes.SET_COMPANIES]: (state: ReferenceDef, action: Action<CompanyReferenceViewModel[]>) => {
        return update(state, { companies: action.data });
    },
    [ActionTypes.SET_COMPANY_PERSONS]: (state: ReferenceDef, action: Action<CompanyPersons>) => {
        const companyPersons = { ...state.companyPersons, [action.data.companyId]: action.data.persons };
        return update(state, { companyPersons });
    }
}, {});

export default Reducer;