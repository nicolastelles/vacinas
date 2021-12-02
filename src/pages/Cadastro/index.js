import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import api from '../../utils/api';

import "./index.css"
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

const Cadastro = () => {
    const history = useHistory();
    const redirectLogin = () => history.push("/")
    const [usuario, setUsuario] = useState({ mail: "", senha: "", perfil: "" })
    const [alertDiv, setAlertDiv] = useState([])
 
    const handleChange = (e) => {
        const value = e.target.value;
        setUsuario({
            ...usuario,
            [e.target.name]: value
        })
    }
    const handleCadastro = (e) => {
        e.preventDefault()
        let data = { ...usuario }
        data.perfil = "user"
        api.post("/usuario/create", data).then((res) => {
            if (res.status === 200) {
                setAlertDiv([<Alert tema="success" conteudo="Usuário cadastrado com sucesso." />])
                setTimeout(() => {redirectLogin()},4000)
            }

        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
        })
    }

    return (
        <div className="container" id="cadastro">


            <Form id="cadastro-form" onSubmit={handleCadastro}>
                <FormGroup>
                    <Label htmlFor="email" className="h5">Email</Label>
                    <Input id="email" value={usuario.mail} onChange={handleChange} name="mail" placeholder="email@email.com" type="email"/>
                </FormGroup>
                <br />
                <FormGroup>
                    <Label htmlFor="senha" className="h5">Senha</Label>
                    <Input id="senha" value={usuario.senha} onChange={handleChange} name="senha" placeholder="Sua senha" type="password"/>
                </FormGroup>
                {alertDiv.map(a => a)}
                <Button block color="primary" type="submit">Cadastrar</Button>
                <br />
                <Button block color="secondary" type="button" onClick={redirectLogin}>Voltar para o login</Button>

            </Form>
        </div>
    )
}

export default Cadastro;
