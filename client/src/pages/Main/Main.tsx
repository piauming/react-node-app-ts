import React, { ReactNode } from "react";
import { Link, useNavigate, useOutlet } from "react-router-dom";
import { Dashboard } from "../../pages";

import './Main.css';

type MainProps = {
    children?: ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
    const outlet = useOutlet();

    return (
        <div style={{ display: "flex", flexDirection: 'row', width: '100%' }}>
            <div style={{minWidth:200, backgroundColor: "#f8f9fd" }}>
                <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 30, paddingTop: 15 }}>
                    <Link to="dashboard">Dashboard</Link>
                    <Link to="about">About</Link>
                </ul>
            </div>
            <div style={{ width: '100%', display: 'flex', backgroundColor: 'white' }}>
                {outlet || <Dashboard />}
            </div>
        </div>

    );
}

export default Main;