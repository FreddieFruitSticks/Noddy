import { Party } from "./reducer"

export enum ActionType {
    PARTY_FORM="PARTY_FORM"
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
