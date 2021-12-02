import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa"

import "./index.css"
import { Form, FormGroup, Label, Input, Button, Alert, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Menu from './../../../components/menu'

import api from '../../../utils/api';

const AdicionarVacina = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

    const [vacina, setVacina] = useState({ nomevacina: "" })
    const [vacinaList, setVacinaList] = useState([])
    const [showModalEditarVacina, setShowModalEditarVacina] = useState(false)
    const [idvacina, setIdVacina] = useState()
    const [alertDiv, setAlertDiv] = useState([])

    const handleShowModalEditarVacina = (v) => {
        setShowModalEditarVacina(true)
        setIdVacina(v)
    }
    const handleCloseModalEditarVacina = () => {
        setShowModalEditarVacina(false)
    }

    const handleUpdateVacina = async (e) => {
        e.preventDefault()
        let data = {
            idvacina:idvacina,
            nomevacina:document.getElementById("nomeVacinaUpdate").value
        }

        await api.put("/vacinas/update-vacina", data).then((res) => {
            handleCloseModalEditarVacina()
            setAlertDiv([<Alert color="success">Vacina atualizada com sucesso.</Alert>])
            loadVacinas()
            setTimeout(() => {setAlertDiv([])},4000)
 
        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
            setAlertDiv(errors)
        })
    }

    const handleRemoveVacina = async (idvacina) => {
        let data = { idvacina:idvacina }
        console.log(data)
        await api.delete("/vacinas/delete-vacina",{data:data}).then((res) => {
            setAlertDiv([<Alert color="success">Vacina removida com sucesso.</Alert>])
            loadVacinas()
            setTimeout(() => {setAlertDiv([])},4000)

        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
            setAlertDiv(errors)
        })
    }

    const handleAdicionarVacina = (e) => {
        e.preventDefault()
        api.post("/vacinas/create-vacina", vacina).then((res) => {
            setAlertDiv([<Alert color="success">Vacina criada com sucesso.</Alert>])
            loadVacinas()
            setTimeout(() => {setAlertDiv([])},4000)

        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}</Alert>)
            })
            setAlertDiv(errors)
        })
    }

    const loadVacinas = () => {
        api.get("/vacinas/lista-vacina").then((res) => {
            setVacinaList(res.data.vacinas)
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
        })
    }

    const converterData = (d) => {
        let data = d.split("T")[0].split("-")
        return `${data[2]}/${data[1]}/${data[0]}`
    }

    useEffect(() => {
        loadVacinas()
    }, [])
    
    return (
        <div>
            <Menu />

            <div className="container" id="adicionar-vacina">

                <Form id="adicionar-vacina-form" onSubmit={handleAdicionarVacina}>
                    <FormGroup>
                        <Label htmlFor="nomevacina" className="h5">Nome da vacina</Label><br />
                        <Input id="nome" name="nomevacina" onChange={(e) => { setVacina({ nomevacina: e.target.value }) }} placeholder="Nome da vacina" type="text" />
                    </FormGroup>
                    <br />
                    <Button block color="primary" type="submit">Adicionar</Button>
                </Form>
                <br />
                {alertDiv.map(a => a)}

                <Table id="table-list-vacina" >
                    <thead>
                        <tr>
                            <th>ID:</th>
                            <th>Nome:</th>
                            <th>Criada em:</th>
                            <th>Atualizada em:</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacinaList.map(vacina => (
                            <tr key={vacina.idvacina}>
                                <th scope="row">{vacina.idvacina}</th>
                                <td>{vacina.nomevacina}</td>
                                <td>{converterData(vacina.createdAt)}</td>
                                <td>{converterData(vacina.updatedAt)}</td>
                                <td className="iconTd"><center onClick={() => handleShowModalEditarVacina(vacina.idvacina)}><FaEdit className="iconTable" /></center></td>
                                <td className="iconTd"><center onClick={() => handleRemoveVacina(vacina.idvacina, vacina.nomevacina)}><FaTrashAlt className="iconTable" /></center></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <br />
                <br />

                {showModalEditarVacina &&


                    <Modal id="modal-editar-vacina" isOpen={handleShowModalEditarVacina}>
                        <ModalHeader  toggle={handleCloseModalEditarVacina}>
                            <span className="h3">Editar vacina</span>
                        </ModalHeader>
                        <ModalBody>
                            <Form id="update-vacina-form" onSubmit={handleUpdateVacina}>
                                <FormGroup>
                                    <Label htmlFor="nomevacina" className="h5">Nome da vacina</Label><br />
                                    <Input id="nomeVacinaUpdate" value={vacina.nomevacina} name="nomevacina" onChange={(e) => { setVacina({ nomevacina: e.target.value }) }} placeholder="Nome da vacina" type="text" />
                                </FormGroup>
                                <br />
                                <Button block color="primary" type="submit">Salvar</Button>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleCloseModalEditarVacina}>Voltar</Button>
                        </ModalFooter>
                    </Modal>
                }


            </div>
        </div>

    )
}

export default AdicionarVacina;
