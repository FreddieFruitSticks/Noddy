import { Party, Utils } from "./reducer"

export enum ActionType {
    PARTY_FORM="PARTY_FORM",
    UTILS="UTILS"
}

export interface IAction<T> {
    type: ActionType;
    payload: T
}

export const partyAction = (payload: Party) : IAction<Party> => {
    return {
        type: ActionType.PARTY_FORM,
        payload: payload
    }
}

export const utilsAction = (payload: Utils) : IAction<Utils> => {
    return {
        type: ActionType.UTILS,
        payload: payload
    }
}
