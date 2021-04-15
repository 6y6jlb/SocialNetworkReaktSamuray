import React from "react";
import s from './Header.module.css'
import imageLogo from '../../images/5a3a185132ceb1.89894673151375675320812609.png'
import { NavLink } from "react-router-dom";

type HeaderPropsType ={
    isAuth:boolean
    login:string|null
}

export const Header = (props:HeaderPropsType) => (
    <header className={ s.wrapperHeader }>
        <div className={ s.circle }><img src={ imageLogo }/></div>
        <div className={ s.headerString }>Header</div>
        <div className={ s.loginBlock }>
            <NavLink to={ '/login' }>{ props.isAuth ?props.login :'Login' }</NavLink>
        </div>

    </header>
);
