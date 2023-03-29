import React, { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {MouseClickEvent} from "../../util/ReactEvent";

type LoginProps = {
    children?: ReactNode
}

const Login: React.FC<LoginProps> = ({ children }) => {
    const navigate = useNavigate();

    function handleClick(e: MouseClickEvent) {
        e.preventDefault();
        navigate("/home", { replace: true });
    }

    return (
        <div style={{ height: '100vh', display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link to={{}} onClick={handleClick}>Login</Link>
        </div>
    );
}

export default Login;