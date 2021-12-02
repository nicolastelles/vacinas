import React from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../providers/user";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import "./index.css";

const Menu = () => {
  const { user } = useUser();

  const history = useHistory();

  const redirectAdicionarVacina = () => history.push("/adicionar-vacina");
  const redirectHome = () => history.push("/home");
  const redirectAdicionarRegistro = () => history.push("/adicionar-registro");
  const redirectPerfil = () => history.push("/perfil");
  const redirectDados = () => history.push("/meus-dados");
  const logout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      localStorage.clear();
      history.push("/");
    }
  };

  return (
    <div className="menu">
      <div>
        <Navbar color="light" expand="md" light>
          <NavbarBrand onClick={redirectHome}>Home</NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink onClick={redirectAdicionarVacina}>Vacinas</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={redirectPerfil}> Perfil</NavLink>
              </NavItem>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  + opções
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={redirectDados}>
                    Seus Dados
                  </DropdownItem>
                  <DropdownItem onClick={redirectAdicionarRegistro}>
                    Registros
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>VACINAS-FATEC</NavbarText>
          </Collapse>
        </Navbar>
      </div>
     
    </div>
  );
};

export default Menu;
