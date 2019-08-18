import * as React from 'react';
import {Action, Dispatch} from 'redux';
import {connect} from "react-redux";
import {IState} from "../../setup/IState";
import {IdModal, ModalRegistry} from "./IdModalRegistry";
import {selectModalActive} from "../../selector/selectModal";
import {actionModalClose} from "./actionModal";
import "./modal.scss";

interface IModalState {
    modalIds: Array<IdModal>
}

interface IModalDispatch {
    onModalClose: () => Action<any>
}

interface IModalProps extends IModalState, IModalDispatch {
}

class ModalDOM extends React.Component<IModalProps> {
    render () {
        const {modalIds, onModalClose} = this.props;

        if (modalIds.length === 0) {
            return null;
        }

        return (
            <div className="modal">

                {modalIds.map((modalId: IdModal, _key: number) => {
                    const {[modalId]: ModalContent} = ModalRegistry;
                    return (
                        <div className="modal-content" key={_key}>
                            <span className="close" onClick={onModalClose}>&times;</span>
                            <div className="modal-body">
                                <ModalContent/>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }
};

const mapState = (state: IState): IModalState => ({
    modalIds: selectModalActive(state)
});
const mapDispatch = (dispatch: Dispatch): IModalDispatch => ({
    onModalClose: () => dispatch(actionModalClose())
});

export const Modal = connect(mapState, mapDispatch)(ModalDOM);
