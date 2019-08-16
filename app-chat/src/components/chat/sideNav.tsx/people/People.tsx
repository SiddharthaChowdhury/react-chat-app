import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../../../setup/IState";
import { Dispatch } from "redux";
import "./people.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircle } from "@fortawesome/free-solid-svg-icons";
import { ScrollSection } from "../../../../generic/scrollBar/ScrollSection";

interface IPeopleState {}
interface IPeopleDispatch {}
interface IPeopleProps extends IPeopleState, IPeopleDispatch {
    handlePeopleMore: any;
    peopleMoreOpen: boolean;
    channelMoreOpen: boolean;
    deviceVariant: string
}

class PeopleDOM extends React.Component<IPeopleProps> {
    render () {
        const people = {
            important: ["Siddhartha Chowdhury","Super Man", "Tony Stark", "Captain Marvel", "Hawk Eye"],
            more: ["Stan Lee", "Robin", "Dr Ben", "Super Man", "Tony Stark", "Captain Marvel"]
        };

        return (
            <>
                <div className={"sideNav-section-heading"}>
                    <label>PEOPLE</label>
                    <FontAwesomeIcon className={"section-icon"} icon={faPlus} />
                </div>
                <ScrollSection className={"sideNav-sections"}>
                    <div className={"sideNav-section-important"}>
                        {people.important.map((person: any, index: number) =>
                            <div className={"section-element"} key={index}>
                                <FontAwesomeIcon className={"section-icon icon-online"} icon={faCircle} />
                                <div>{this.getLengthFilteredName(person)}</div>
                            </div>
                        )}
                    </div>
                    {this.props.peopleMoreOpen && !this.props.channelMoreOpen && people.more.map((person: any, index: number) =>
                        <div className={"section-element"} key={index}>
                            <FontAwesomeIcon className={"section-icon icon-offline"} icon={faCircle} />
                            <div>{this.getLengthFilteredName(person)}</div>
                        </div>
                    )}
                </ScrollSection>
                {people.more && <small className={"more"} onClick={this.props.handlePeopleMore}>{this.props.peopleMoreOpen ? 'Less' : 'More'}</small>}
            </>
        )
    }

    private getLengthFilteredName = (name: string): string => {
        if (this.props.deviceVariant !== 'LaptopSmall') {
            return name;
        }

        return name.length > 18 ? name.substr(0, 18) + '...' : name;
    }
}

const mapState = (state: IState): IPeopleState => ({})
const mapDispatch = (dispatch: Dispatch): IPeopleState => ({})

export const People = connect(mapState, mapDispatch)(PeopleDOM);