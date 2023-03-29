import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Outlet />
        </div>
    );
}

export default AppLayout;