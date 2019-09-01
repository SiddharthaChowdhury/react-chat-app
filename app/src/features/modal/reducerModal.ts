import { IdModalRegistry } from './IdModalRegistry'
import { IActionModal, TypeActionModal } from './actionModal'

export interface IReducerModal {
  activeModals: Array<IdModalRegistry>
}

export const initialModalState: IReducerModal = {
  activeModals: []
}

export function reducerModal (state: IReducerModal = initialModalState, action: IActionModal): IReducerModal {
  switch (action.type) {
    case TypeActionModal.Open:
      return reducerModalOpen(state, action.modalId!)
    case TypeActionModal.CloseCurrent:
      return reducerModalCloseCurrent(state)
    case TypeActionModal.Close:
      return reducerActionModalClose(state, action.modalId!)
    case TypeActionModal.CloseAll:
      return reducerActionModalCloseAll(state)
    default:
      return state
  }
}

const reducerModalOpen = (state: IReducerModal, modalId: IdModalRegistry): IReducerModal => ({
  ...state,
  activeModals: [modalId, ...state.activeModals]
})

const reducerModalCloseCurrent = (state: IReducerModal): IReducerModal => {
  const shiftedActiveModalArray: Array<IdModalRegistry> = [...state.activeModals]
  shiftedActiveModalArray.shift()

  return {
    ...state,
    activeModals: shiftedActiveModalArray
  }
}

const reducerActionModalClose = (state: IReducerModal, modalId: IdModalRegistry): IReducerModal => {
  const index: number = state.activeModals.indexOf(modalId)

  if (index > -1) {
    state.activeModals.splice(index, 1)
  }

  return {
    ...state,
    activeModals: [...state.activeModals]
  }
}

const reducerActionModalCloseAll = (state: IReducerModal): IReducerModal => ({
  ...state,
  activeModals: []
})
