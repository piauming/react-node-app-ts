import React, { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

type DashboardProps = {
    children?: ReactNode
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: '100%'}}>
            <Link to={{}}>Dashboard</Link>
        </div>
    );
}

export default Dashboard;