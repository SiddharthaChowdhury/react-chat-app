import * as React from "react";
import {connect} from "react-redux";
import {IState} from "../../../../setup/IState";
import {Action, Dispatch} from "redux";
import "./people.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ScrollSection} from "../../../../generic/scrollBar/ScrollSection";
import {actionPeopleGetList} from "./actionPeople";
import {IPeopleInfo} from "./IPeopleInfo";
import {selectPeopleAll} from "../../../../selector/selectPeople";
import {actionModalOpen} from "../../../../generic/modal/actionModal";
import {IdModal} from "../../../../generic/modal/IdModalRegistry";

interface IPeopleState {
    allPeople: Array<IPeopleInfo>
}
interface IPeopleDispatch {
    onGetAllUsers: () => Action<any>;
    onAddPeople: () => Action<any>;
}
interface IPeopleProps extends IPeopleState, IPeopleDispatch {
    handlePeopleMore: any;
    peopleMoreOpen: boolean;
    channelMoreOpen: boolean;
    deviceVariant: string
}

class PeopleDOM extends React.Component<IPeopleProps> {
    render () {
        const {allPeople} = this.props;
        const people = {
            important: allPeople.length > 5 ? allPeople.slice(0, 4): allPeople,
            more:  allPeople.length > 5 ? allPeople.slice(5, allPeople.length): allPeople
        };

        return (
            <>
                <div className={"sideNav-section-heading"}>
                    <label>PEOPLE</label>
                    <span onClick={this.props.onAddPeople}><FontAwesomeIcon className={"section-icon"} icon={faPlus} /></span>
                </div>
                <ScrollSection className={"sideNav-sections"}>
                    <div className={"sideNav-section-important"}>
                        {people.important.map((person: IPeopleInfo, index: number) => {
                            const {firstName, lastName, id} = person;

                            return (
                                <div className={"section-element"} key={index} data-id={id}>
                                    <FontAwesomeIcon className={"section-icon icon-online"} icon={faCircle} />
                                    <div>{this.getLengthFilteredName(firstName + ' ' + lastName)}</div>
                                </div>
                            )
                        })}
                    </div>
                    {this.props.peopleMoreOpen && !this.props.channelMoreOpen && people.more.map((person: any, index: number) =>
                        <div className={"section-element"} key={index}>
                            <FontAwesomeIcon className={"section-icon icon-offline"} icon={faCircle} />
                            <div>{this.getLengthFilteredName(person)}</div>
                        </div>
                    )}
                </ScrollSection>
                {people.more.length > 0 && <small className={"more"} onClick={this.props.handlePeopleMore}>{this.props.peopleMoreOpen ? 'Less' : 'More'}</small>}
            </>
        )
    }

    public componentDidMount(): void {
        this.props.onGetAllUsers();
    }

    private getLengthFilteredName = (name: string): string => {
        if (this.props.deviceVariant !== 'LaptopSmall') {
            return name;
        }

        return name.length > 18 ? name.substr(0, 18) + '...' : name;
    }
}

const mapState = (state: IState): IPeopleState => ({
    allPeople: selectPeopleAll(state)
});
const mapDispatch = (dispatch: Dispatch): IPeopleDispatch => ({
    onGetAllUsers: () => dispatch(actionPeopleGetList()),
    onAddPeople: () => dispatch(actionModalOpen(IdModal.AddNewPeople))
});

export const People = connect(mapState, mapDispatch)(PeopleDOM);