import { IdModalRegistry } from './IdModalRegistry'
import { Action } from 'redux'

export enum TypeActionModal {
  Open = 'Modal > Open',
  Close = 'Modal > Close',
  CloseCurrent = 'Modal > Close > Current',
  CloseAll = 'Modal > Close > All'
}

export interface IActionModal extends Action {
  modalId?: IdModalRegistry
  type: TypeActionModal
}

export const actionModalOpen = (modalId: IdModalRegistry): IActionModal => ({
  modalId,
  type: TypeActionModal.Open
})

export const actionModalClose = (modalId: IdModalRegistry): IActionModal => ({
  modalId,
  type: TypeActionModal.Close
})

export const actionModalCloseCurrent = (): IActionModal => ({
  type: TypeActionModal.CloseCurrent
})

export const actionModalCloseAll = (): IActionModal => ({
  type: TypeActionModal.CloseAll
})
