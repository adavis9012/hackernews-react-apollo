import React from 'react';
import {AUTH_TOKEN} from "../constants";
import {History}  from 'history';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";

interface HeaderProps {
    history: History
}

const Header: React.FC<HeaderProps> = (({history}) => {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    function handleLogout() {
        localStorage.removeItem(AUTH_TOKEN);
        history.push('/');
    }

    return <div className="flex pal justify-between nowrap orange">
        <div className="flex flex-fixed black">
            <div className="fw7 mr1">
                Hacker News
            </div>
            <Link to="/" className={"ml1 no-underline black"}>
                new
            </Link>
            {authToken ? (
                <div>
                    <div className="ml1">|</div>
                    <Link to="/create" className="ml1 no-underline black">
                        submit
                    </Link>
                </div>
            ) : null}
        </div>
        <div className="flex flex-fixed">
            {authToken ? (
                <div className="ml1 pointer black"  onClick={handleLogout} >
                    logout
                </div>
            ) : (
                <Link to="/login" className={"ml1 no-underline black"}>
                    login
                </Link>
            )}
        </div>
    </div>;
});

export default withRouter(Header);
