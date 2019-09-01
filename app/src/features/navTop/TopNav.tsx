import React from 'react';
import {IState} from '../../setup/IState';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import "./topNav.scss";
import {IUserInfo} from '../../types/IUser';
import {Grid} from "@material-ui/core";
import {IReducerActive} from "../activity/reducerActive";
import {IdActiveType} from "../activity/IdActiveType";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from "@fortawesome/free-solid-svg-icons";

interface ITopNavState {
    loggedInUser: IUserInfo
    active: IReducerActive
}
interface ITopNavDispatch {}
interface ITopNavProps extends ITopNavState, ITopNavDispatch {}

class TopNavDOM extends React.Component<ITopNavProps> {
    render () {
        const {loggedInUser, active:{type, selectedChannel, selectedUser}} = this.props;
        const [loggedInName] = loggedInUser.name.split(" ");
        let style: React.CSSProperties = {};
        if(type === IdActiveType.Individual) {
            style = {
                backgroundImage: `url(${selectedUser!.avatar})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center, center'
            }
        }

        const user = selectedUser ? selectedUser.name.split(" ") : [];
        return (
            <Grid item className={"content-top"}>
                {type === IdActiveType.Individual &&
                    <>
                        <div className="user-avatar" style={style}/>
                        <div className={"user-name"}>
                            <div className={"user-name-f"}>{user[0]}</div>
                            <div className={"user-name-l"}>{user[1] || null}</div>
                        </div>
                    </>
                }{type === IdActiveType.Channel &&
                    <div className={"channel-name"}>
                        {'# ' + selectedChannel!.name}
                    </div>
                }
                <div className={"logged-in-as"}>
                    <div className={"logged-name"}>Logged in as
                        <div className={"name-tag"}>
                            {loggedInName}
                            <FontAwesomeIcon className={"section-icon"} icon={faCog} />
                        </div>
                    </div>
                </div>
            </Grid>
        )
    }
}

const mapState = (state: IState): ITopNavState => ({
    loggedInUser: state.auth.userInfo!,
    active: state.active
});
const mapDispatch = (state: Dispatch): ITopNavDispatch => ({})

export const TopNav = connect(mapState, mapDispatch)(TopNavDOM);
