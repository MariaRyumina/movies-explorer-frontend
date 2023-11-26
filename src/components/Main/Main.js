import React from 'react';
import Promo from "../../components/Promo/Promo";
import AboutProject from "../../components/AboutProject/AboutProject";
import Techs from "../../components/Techs/Techs";

export default function Main() {
    return (
        <main className="content">
            <Promo />
            <AboutProject />
            <Techs />
        </main>
    )
}
