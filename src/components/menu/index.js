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

      {/* <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav class="navbar navbar-expand-lg navbar-light">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div class="navbar-nav">
                                    <button className="btn btn-primary" onClick={redirectHome}>Home</button>
                                    {user.perfil==="admin" && 
                                        <>
                                            <button className="btn btn-primary" onClick={redirectPerfil}>Perfil</button>
                                            <button className="btn btn-primary" onClick={redirectAdicionarVacina}>Vacinas</button>
                                        </>
                                    }
                                    <button className="btn btn-primary" onClick={redirectDados}>Seus dados</button>
                                    <button className="btn btn-primary" onClick={redirectAdicionarRegistro}>Registros</button>
                                    <button className="btn btn-primary" onClick={logout}>Logout</button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export default Menu;
