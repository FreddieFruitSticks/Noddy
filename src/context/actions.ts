import { ElfAdminColumn, ElfAdminColumns, Party, Utils } from "./reducer"

export enum ActionType {
    PARTY_FORM="PARTY_FORM",
    ADD_KID="ADD_KID",
    REMOVE_KID="REMOVE_KID",
    UTILS="UTILS",
    ELF_ADMIN_COLUMNS="ELF_ADMIN_COLUMNS",
    ELF_ADMIN_CHECK_KID="ELF_ADMIN_CHECK_KID"
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

export const addKidAction = ({}) : IAction<Party> => {
    return {
        type: ActionType.ADD_KID,
        payload: {}
    }
}

export const removeKidAction = (kidArrayIndex: number) : IAction<number> => {
    return {
        type: ActionType.REMOVE_KID,
        payload: kidArrayIndex
    }
}

export const utilsAction = (payload: Utils) : IAction<Utils> => {
    return {
        type: ActionType.UTILS,
        payload: payload
    }
}

export const elfAdminColumnsAction = (payload: ElfAdminColumns) : IAction<ElfAdminColumns> => {
    return {
        type: ActionType.ELF_ADMIN_COLUMNS,
        payload: payload
    }
}

export const elfAdminCheckKidAction = (payload: ICheckKidPayload) : IAction<ICheckKidPayload> => {
    return {
        type: ActionType.ELF_ADMIN_CHECK_KID,
        payload: payload
    }
}

interface ICheckKidPayload {
    rowId: number
    columnId: number
    childNumber: number
}