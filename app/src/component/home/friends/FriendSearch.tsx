import {IUserInfo} from "../../../types/Types";
import {Action, Dispatch} from "redux";
import * as React from "react";
import {IState} from "../../../config/IState";
import {selectFriendsSearch} from "../../../selector/selectFriends";
import {connect} from "react-redux";
import {thunkActionFriendsSearch} from "./thunkActionFriendsSearch";
import {Subject, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

interface IFriendSearchInnerState {
    input: string;
    loading: boolean;
}

interface IFriendSearchState {
    searchedFriends: Array<IUserInfo>;
}

interface IFriendsSearchDispatch {
    onFriendSearch: (str: string) => Action<any>;
}

interface IFriendProps extends IFriendSearchState, IFriendsSearchDispatch {}

class FriendSearchDOM extends React.PureComponent<IFriendProps> {
    state: IFriendSearchInnerState = {input: '', loading: false};
    private onSearch$: Subject<any>;
    private searchSubscription: Subscription;

    constructor (props: IFriendProps) {
        super(props);

        const {onFriendSearch} = this.props;

        this.onSearch$ = new Subject();
        this.searchSubscription = this.onSearch$.pipe(
            distinctUntilChanged(),
            debounceTime(400),
        ).subscribe((value: string) => {
            this.setState({loading: true});
            onFriendSearch(value);
        })
    }

    componentWillUnmount(): void {
        this.searchSubscription.unsubscribe();
    }

    componentWillUpdate(nextProps: Readonly<IFriendProps>, nextState: Readonly<{}>, nextContext: any): void {
        this.setState({loading: false});
        console.log('loading: '+ this.state.loading)
    }

    render() {
        const {searchedFriends} = this.props;
        const {loading} = this.state;

        return (
            <div>
                <div>
                    <div>
                        <div>
                            <span>Email</span>
                            <input type="email" placeholder="Search by Email" onChange={this.handleSearchInput} value={this.state.input} />
                        </div>
                    </div>
                </div>
                <div>
                    {loading && <small>Loading...</small>}
                    {(!searchedFriends || searchedFriends.length === 0) &&
                        <div><i>Nothing to show</i></div>
                    }
                    {searchedFriends.map(({id, name, email}, _key) => {
                        return(
                            <div key={_key} data-friendid={id}>{name} - {email}</div>
                        );
                    })}
                </div>
            </div>
        );
    }

    private handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({input: event.target.value});
        this.onSearch$.next(event.target.value);
    }
}

const mapState = (state: IState): IFriendSearchState => ({
    searchedFriends: selectFriendsSearch(state),
});

const mapDispatch = (dispatch: Dispatch): IFriendsSearchDispatch => ({
    onFriendSearch: (query: string) => dispatch(thunkActionFriendsSearch(query))
});

export const FriendSearch = connect(mapState, mapDispatch)(FriendSearchDOM);