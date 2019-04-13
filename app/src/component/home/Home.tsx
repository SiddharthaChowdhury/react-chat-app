import * as React from "react";

interface IUserProps {
    userList: Array<any>
}

export class Home extends React.PureComponent<IUserProps> {
    public render = () => {
        const {userList} = this.props;

        if (userList.length === 0) {
            return (
                <div>No online users</div>
            )
        }

        return (
            <div>
                {
                    userList.map((user: any, _key: number) => {
                        return <div key={_key}>{user}</div>
                    })
                }
            </div>
        )
    }
}