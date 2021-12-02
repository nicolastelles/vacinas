import React, { useState, useEffect } from 'react'
import Menu from '../../components/menu';
import api from '../../utils/api';
import {Input, Alert, Table } from 'reactstrap';

import "./index.css"

const Perfil = () => {
    const [usuarios, setUsuarios] = useState([])
    const [showtable, setShowtable] = useState(false)
    const [alertDiv, setAlertDiv] = useState([])

    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`


    const handleMudarPerfil = async (perfil, idusuario) => {
        let data = { perfil: perfil, idusuario: idusuario }
        await api.put("/usuario/update/perfil", data).then((res) => {
            setAlertDiv([<Alert tema="success" conteudo="Perfil atualizado com sucesso." />])
            setTimeout(() => {setAlertDiv([])},4000)
            
            loadUsuarios()
        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
        })

    }

    const loadUsuarios = async () => {
        await api.get("/usuario/usuario-list").then((res) => {
            setUsuarios(res.data.usuarios)
        }).catch((err) => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert tema="danger" conteudo={error} />)
            }) 
        })
    }

    useEffect(() => {
        loadUsuarios()
    }, [])

    useEffect(() => {
        console.log(usuarios)
        setShowtable(true)
    }, [usuarios])
    
    return (
        <div>
            <Menu />

            <div className="container" id="mudar-perfil" >
                {alertDiv.map(a => a)}
                {showtable &&
                    <Table id="table-list-usuarios" >
                        <thead>
                            <tr >
                                <th>ID</th>
                                <th>Email</th>
                                <th>Perfil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.idusuario}>
                                    <th scope="row">{usuario.idusuario}</th>
                                    <td>{usuario.mail}</td>
                                    <td>
                                        <center>
                                                <Input value={usuario.perfil}  onChange={(e) => { handleMudarPerfil(e.target.value, usuario.idusuario) }} id={usuario.idusuario} name="usuarioPerfil" type="select">
                                                    <option value="admin">Administrador</option>
                                                    <option value="user">Usuário</option>
                                                </Input>
                                        </center>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                }
            </div>
        </div>
    )
} 

export default Perfil;
