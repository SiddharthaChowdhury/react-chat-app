import React from 'react';
import { IState } from '../../setup/IState';
import { IUserInfo } from '../../types/IUser';
import { actionActiveUserUpdate } from '../activity/actionActive';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import "./userList.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ScrollSection} from "../generic/scrollWrapper/ScrollSection";
import {IdActiveType} from "../activity/IdActiveType";
import {IReducerActive} from "../activity/reducerActive";
import {IUserDetails} from "../users/reducerUsers";
import {actionUsersPendingReset} from "../users/actionUsers";

interface IUserListState {
    allUsers: Array<IUserDetails>;
    selectedUser: IUserInfo;
    loggedInUser: IUserInfo;
    active: IReducerActive;
}
interface IUserListDispatch { 
    onUserMakeActive: (user: IUserInfo) => Action<any>;
    onResetPendingMsg: (userId: number) => Action<any>;
}
interface IUserListProps extends IUserListState, IUserListDispatch {
    handlePeopleMore: any;
    peopleMoreOpen: boolean;
    channelMoreOpen: boolean;
    deviceVariant: string;
}

class UserListDOM extends React.Component<IUserListProps> {
    public render () {
        const {active} = this.props;
        const {type, selectedUser} = active;
        const sortedUsers = this.sortByOnline();
        const people = {
            important: sortedUsers.length > 5 ? sortedUsers.slice(0, 4): sortedUsers,
            more:  sortedUsers.length > 5 ? sortedUsers.slice(5, sortedUsers.length): []
        };

        return (
            <>
                <div className={"sideNav-section-heading"}>
                    <label>PEOPLE</label>
                    <span ><FontAwesomeIcon className={"section-icon"} icon={faPlus} /></span>
                </div>
                <ScrollSection className={"sideNav-sections"}>
                    <div className={"sideNav-section-important-people"}>
                        {people.important.map((person: IUserDetails, index: number) => {
                            const { id, name, pendingMessageCount, isOnline} = person;
                            const fullName = this.getLengthFilteredName(name);
                            const isSelectedClass = type === IdActiveType.Individual && selectedUser && selectedUser.id === id ? 'selected' : '';

                            return (
                                <div className={"section-element"} key={index} data-id={id} onClick={() => this.handleUserClick(person)}>
                                    <FontAwesomeIcon className={`section-icon ${isOnline ? 'icon-online': 'icon-offline'}`} icon={faCircle} />
                                    <div className={isSelectedClass}>{fullName}</div>
                                    {(pendingMessageCount && pendingMessageCount > 0) ?
                                        <div className={"new-message-tag"}>{pendingMessageCount === 1 ? 'New': pendingMessageCount}</div>
                                        : null
                                    }
                                </div>
                            )
                        })}
                    </div>
                    {this.props.peopleMoreOpen && !this.props.channelMoreOpen && people.more.map((person: IUserDetails, index: number) => {
                        const { id, name, pendingMessageCount, isOnline} = person;
                        const fullName = this.getLengthFilteredName(name);
                        const isSelectedClass = type === IdActiveType.Individual && selectedUser && selectedUser.id === id ? 'selected' : '';

                        return (
                            <div className={"section-element"} key={index} onClick={() => this.handleUserClick(person)}>
                                <FontAwesomeIcon className={`section-icon ${isOnline ? 'icon-online': 'icon-offline'}`} icon={faCircle} />
                                <div className={isSelectedClass}>{fullName}</div>
                                {(pendingMessageCount && pendingMessageCount > 0) ?
                                    <div className={"new-message-tag"}>{pendingMessageCount === 1 ? 'New': pendingMessageCount}</div>
                                    : null
                                }
                            </div>
                        )
                    })}
                </ScrollSection>
                {people.more.length > 0 && <small className={"more"} onClick={this.props.handlePeopleMore}>{this.props.peopleMoreOpen ? 'Less' : 'More'}</small>}
            </>
        )
    }

    private handleUserClick = (user: IUserInfo) => {
        const {onUserMakeActive, onResetPendingMsg} = this.props;
        onUserMakeActive(user);
        onResetPendingMsg(user.id);
    };

    private getLengthFilteredName = (name: string): string => {
        if (this.props.deviceVariant !== 'LaptopSmall') {
            return name;
        }

        return name.length > 18 ? name.substr(0, 18) + '...' : name;
    };

    private sortByOnline = () => {
        const {allUsers} = this.props;
        const sortedUsers = [...allUsers];
        sortedUsers.sort(function(a: any,b: any){ return b.isOnline - a.isOnline });

        return sortedUsers;
    }
}

const mapState = (state: IState): IUserListState => ({
    allUsers: Object.values(state.users.allUsers),
    selectedUser: state.active.selectedUser!,
    loggedInUser: state.auth.userInfo!,
    active: state.active
});

const mapDispatch = (dispatch: Dispatch): IUserListDispatch => ({
    onUserMakeActive: (user: IUserInfo) => dispatch(actionActiveUserUpdate(user)),
    onResetPendingMsg: (userId: number) => dispatch(actionUsersPendingReset(userId))
});
export const UserList = connect(mapState, mapDispatch)(UserListDOM);