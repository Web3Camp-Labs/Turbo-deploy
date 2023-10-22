import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../home";


function RouterLink() {
    return (
        <Routes>
            {/*<Route path="/" element={<Navigate to="/" />} />*/}
             <Route path="/" element={<Home />} />

        </Routes>
    );
}

export default RouterLink;
