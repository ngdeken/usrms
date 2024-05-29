import React from "react";
import "../../css/sidebars.css";
import Sidebar from "../Components/StaffSidebar";
import Navbar from "../Components/Navbar";

export default function StaffLayout(props) {
    const { children } = props;
    return (
        <>
            <main>
                <Sidebar />
                <div className="container-fluid px-0 overflow-auto">
                    <Navbar />
                    <div className="m-3">{children}</div>
                </div>
                {children}
            </main>
        </>
    );
}
