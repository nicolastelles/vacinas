import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { useUser } from "../../providers/user";
import api from "../../utils/api";
import Alert from "../../components/alert";
import "./index.css";

const Login = () => {
  api.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;
  const history = useHistory();
  const redirectHome = () => history.push("/home");
  const redirectCadastro = () => history.push("/cadastro");

  const { user, setUser } = useUser();
  const [usuario, setUsuario] = useState({ mail: "", senha: "" });
  const [alertDiv, setAlertDiv] = useState([]);

  // Modal open state
  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  const handleChange = (e) => {
    const value = e.target.value;
    setUsuario({
      ...usuario,
      [e.target.name]: value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    api
      .post("/usuario/login", usuario)
      .then((res) => {
        let token = res.data.token;
        let perfil = res.data.perfil;
        let idusuario = res.data.idusuario;
        localStorage.setItem("token", token);
        localStorage.setItem("perfil", perfil);
        localStorage.setItem("idusuario", idusuario);

        setUser({ token: token, perfil: perfil, idusuario: idusuario });
        redirectHome();
      })
      .catch((err) => {
        let errors = [];

        err.response.data.error.forEach((error) => {
          errors.push(<Alert tema="danger" conteudo={error} />);
        });
        setAlertDiv(errors);
      });
  };
  return (
    <div class="login-wrap">
      <div class="login-html">
        <form id="login-form" onSubmit={handleLogin}>
          <input id="tab-1" type="radio" name="tab" class="sign-in" checked />
          <label for="tab-1" class="tab">
            Sign In
          </label>
          <input id="tab-2" type="radio" name="tab" class="sign-up" />
          <label for="tab-2" class="tab">
            {/* Saiba mais */}
          </label>
          <div class="login-form">
            <div class="sign-in-htm">
              <div class="group">
                <label for="user" class="label">
                  Email
                </label>
                <input
                  id="user"
                  class="input"
                  type="email"
                  name="mail"
                  value={usuario.mail}
                  onChange={handleChange}
                  placeholder="email@email.com"
                />
              </div>
              <div class="group">
                <label for="pass" class="label">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  class="input"
                  data-type="password"
                  name="senha"
                  value={usuario.senha}
                  onChange={handleChange}
                  placeholder="Sua senha aqui"
                />
              </div>
              <br />
              <div class="group">
                <input type="submit" class="button" value="Sign In" />
              </div>
              <div class="hr"></div>
              <div class="foot-lnk">
                <a onClick={redirectCadastro}>Cadastre-se</a>
              </div>
            </div>
            <div class="sign-up-htm">
              <br />
              <Button onClick={toggle}>Disciplina Relacionada</Button>
              <Modal
                isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 250 }}
              >
                <ModalBody>
                  {" "}
                  <h1>Programação de Scripts FATEC</h1>
                </ModalBody>
              </Modal>
              <p>
                {" "}
                <br />
                Este site foi desenvolvido para a aula de programação de scripts
              </p>
              <p>
                Meu github:
                <a href="https://github.com/nicolastelles/"> nicolastelles</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
