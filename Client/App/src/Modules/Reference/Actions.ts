import { ActionTypes } from "./Constants";
import { ActionCreatorsMapObject } from "redux";

export interface ActionsMap extends ActionCreatorsMapObject {
    setCompanies(ideas: CompanyReferenceViewModel[]): Action<CompanyReferenceViewModel[]>;
    setCompanyPersons(companyPersons: CompanyPersons): Action<CompanyPersons>;
}

export const Actions: ActionsMap = {
    setCompanies: (ideas: CompanyReferenceViewModel[]): Action<CompanyReferenceViewModel[]> => {
        return {
            type: ActionTypes.SET_COMPANIES,
            data: ideas
        };
    },
    setCompanyPersons: (companyPersons: CompanyPersons): Action<CompanyPersons> => {
        return {
            type: ActionTypes.SET_COMPANY_PERSONS,
            data: companyPersons
        };
    }
};