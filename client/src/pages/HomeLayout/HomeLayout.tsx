import React, { useEffect } from "react";
import { Link, useOutlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
    const outlet = useOutlet();
    const navigate = useNavigate();

    useEffect(() => {
        if (!outlet) {
            navigate("main", { replace: true });
        }
    }, []);

    return (
        <>
            <div style={{ position: 'fixed', backgroundColor: 'aliceblue', height: 60, width: '100%', zIndex: 99 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingLeft: 30, paddingRight: 30 }}>
                    <div style={{ fontWeight: 'bolder' }}>Home</div>
                    <div>Logout</div>
                </div>
            </div>
            <div style={{ paddingTop: 60, backgroundColor: 'antiquewhite', top: 0, position: 'relative', overflowX: 'hidden', minHeight: 'calc(100vh - 60px)', display: "flex" }}>
                {outlet}
            </div>
        </>
    );
}

export default HomeLayout;