import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import { useUser } from "./../../providers/user"
import api from '../../utils/api';
import "./index.css"

const Login = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    const history = useHistory();
    const redirectHome = () => history.push("/home")
    const redirectCadastro = () => history.push("/cadastro")

    const { user, setUser } = useUser()
    const [usuario, setUsuario] = useState({ mail: "", senha: ""})
    const [alertDiv, setAlertDiv] = useState([])

    
    const handleChange = (e) => {
        const value = e.target.value;
        setUsuario({
            ...usuario,
            [e.target.name]: value
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        api.post("/usuario/login", usuario).then((res) => {
            let token = res.data.token
            let perfil = res.data.perfil
            let idusuario = res.data.idusuario
            localStorage.setItem("token", token)
            localStorage.setItem("perfil", perfil)
            localStorage.setItem("idusuario", idusuario)

            setUser({ token: token, perfil: perfil, idusuario: idusuario })
            redirectHome()

        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
        })
    } 
    return (
        <div className="container-fluid" id="login" >
            <center id="alertLogin">
                {alertDiv.map(a => a)}
            </center>
            <br />
            <div  id="BoasVindas">
                <h1> Seja bem vindo!</h1> 
                <br/>
                <h2> Realize o login abaixo colocando seus dados:</h2>
                <br/><br/>
            </div>
            <br />
            <Form id="login-form" onSubmit={handleLogin}>
                <FormGroup>
                    <Label htmlFor="mail" className="h5">Email</Label>
                    <Input id="email" value={usuario.mail} onChange={handleChange} name="mail" placeholder="email@email.com" type="email" />
                </FormGroup>
                <br />
                <FormGroup>
                    <Label htmlFor="senha" className="h5">Senha</Label>
                    <Input id="senha" value={usuario.senha} onChange={handleChange} name="senha" placeholder="Sua senha" type="password" />
                </FormGroup>
                <br />
                
                <Button block color="primary" type="submit">Entrar</Button>
                <br />
                <Button block color="secondary" type="button" onClick={redirectCadastro}>Cadastro</Button>

            </Form>
        </div>
    )
}

export default Login;
