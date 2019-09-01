import * as React from 'react'
import { IdModalRegistry } from './IdModalRegistry';
import { Action, Dispatch } from 'redux';
import { IState } from '../../setup/IState';
import { actionModalClose } from './actionModal';
import { connect } from 'react-redux';
import { IdModalContent } from './IdModalContent';
import './modal.scss';

interface IDialogState {
  activeModals: Array<IdModalRegistry>
}

interface IDialogDispatch {
  onClose: (modalId: IdModalRegistry) => Action<any>
}

interface IDialogProps extends IDialogState, IDialogDispatch {
}

class ModalDOM extends React.Component<IDialogProps> {

  public render = () => {
    const dialogs: Array<IdModalRegistry> = this.props.activeModals

    if (dialogs.length > 0) {
      return (
        <div className="modal">
          {
            dialogs.map((dialog: IdModalRegistry, dialogKey: number) => {
              if (!dialog) {
                return null
              }

              const ModalContent = IdModalContent[dialog]

              return (
                <div key={dialogKey} className="modal-content">
                    <span className="close">&times;</span>
                    <div>
                      <ModalContent/>       
                    </div>
                </div>
              )
            })
          }
        </div>
      )
    }

    return null
  }
}

const mapState = (state: IState): IDialogState => ({
  activeModals: state.modal.activeModals
})

const mapDispatch = (dispatch: Dispatch): IDialogDispatch => ({
  onClose: (modalId: IdModalRegistry) => dispatch(actionModalClose(modalId))
})

export default connect(mapState, mapDispatch)(ModalDOM)
