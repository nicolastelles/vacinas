import React from 'react'
import { useHistory } from "react-router-dom";
import { useUser } from '../../providers/user';
import "./index.css"
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, NavbarToggler } from 'reactstrap';

const Menu = () => {
    const { user } = useUser()

    const history = useHistory();

    const redirectAdicionarVacina = () => history.push("/adicionar-vacina")
    const redirectHome = () => history.push("/home")
    const redirectAdicionarRegistro = () => history.push("/adicionar-registro")
    const redirectPerfil = () => history.push("/perfil")
    const redirectDados = () => history.push("/meus-dados")
    const logout = () => {
        localStorage.clear()
        history.push("/")

    }

    const mostrarMenu = () => {
        let menu = document.getElementById("collapseNavBar")
        let classes = menu.classList
        if (classes.contains("show")) {
            menu.classList.remove("show")
        } else {
            menu.classList.add("show")
        }
    }

    return (
        <div>
            <Navbar className="menu" expand="md" full dark>     
                <NavbarToggler id="hamburguer" onClick={mostrarMenu} />
                <Collapse id="collapseNavBar" navbar>
                    <Nav className="me-auto" id="navbar" navbar>
                        <NavItem >
                            <NavLink className="btn-menu" onClick={redirectHome}>Home</NavLink>
                        </NavItem>
                        
                        {user.perfil === "admin" &&
                            <>
                                <NavItem >
                                    <NavLink className="btn-menu" onClick={redirectPerfil}>Perfil</NavLink>
                                </NavItem>
                                <NavItem >
                                    <NavLink className="btn-menu" onClick={redirectAdicionarVacina} >  Vacinas  </NavLink>
                                </NavItem>
                            </>
                        }
                        <NavItem >
                            <NavLink className="btn-menu" onClick={redirectDados}>  Seus dados  </NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className="btn-menu" onClick={redirectAdicionarRegistro}>  Registros  </NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className="btn-menu" onClick={logout}>  Logout  </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
         
    )
}

export default Menu
