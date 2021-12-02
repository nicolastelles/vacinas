import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import "./index.css"

import Menu from './../../../components/menu';
import { Form, FormGroup, Label, Input, Button, Alert, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import api from './../../../utils/api';


const Registro = () => {
    api.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

    const [registro, setRegistro] = useState({ data: null, idvacina: null, idregistro: null})
    const [registroList, setRegistroList] = useState([])
    const [vacinaList, setVacinaList] = useState([])
    const [showtable, setShowtable] = useState(false)
    const [idregistro, setIdRegistro] = useState()
    const [alertDiv, setAlertDiv] = useState([])

    const [showModalEditarVacina, setShowModalEditarRegistro] = useState(false)

    const handleShowModalEditarRegistro = (r) => {
        setShowModalEditarRegistro(true)
        setRegistro(r)
    }
    const handleCloseModalEditarRegistro = () => {
        setShowModalEditarRegistro(false)
    }

    const handleUpdateRegistro = async (e) => {
        e.preventDefault()

        await api.put("/registro/registro-update", registro).then((res) => {
            handleCloseModalEditarRegistro()
            setAlertDiv([<Alert color="success">Registro atualizado com sucesso.</Alert>])
            loadRegistros()
            setTimeout(() => {setAlertDiv([])},4000)

        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}.</Alert>)
            })
            setAlertDiv(errors)
        })
    }

    const handleRemoveRegistro = async (idregistro) => {
        let data = { idregistro: idregistro }
        await api.delete("/registro/registro-delete", { data: data }).then((res) => {
            setAlertDiv([<Alert color="success">Registro removido com sucesso.</Alert>])
            loadRegistros()
            setTimeout(() => {setAlertDiv([])},4000)

        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}.</Alert>)
            })
            setAlertDiv(errors)

        })
    }


    const handleAdicionarRegistro = async (e) => {
        e.preventDefault()
        await api.post("/registro/registro-create", registro).then(async (res) => {
            setAlertDiv([<Alert color="success">Registro adicionado com sucesso.</Alert>])
            await loadRegistros()
            setTimeout(() => {setAlertDiv([])},4000)

        }).catch(err => {
            let errors = []
            err.response.data.error.forEach(error => {
                errors.push(<Alert color="danger">{error}.</Alert>)
            })
            setAlertDiv(errors)
        })
    }

    const loadRegistros = async () => {
        await api.get("/registro/registro-list").then(async (res) => {
            await loadRegistrotable(res.data.registros)
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
        })
    }

    const loadRegistrotable = async (registros) => {
        let registrostable = []
        await registros.forEach(async (registro) => {
            vacinaList.forEach(vacina => {
                if (vacina.idvacina === registro.idvacina) {
                    let r = {
                        idvacina: vacina.idvacina,
                        nomevacina: vacina.nomevacina,
                        idregistro: registro.idregistro,
                        data: registro.data
                    }
                    registrostable.push(r)
                }
            })


        })
        setRegistroList(registrostable)
    }

    const loadVacinas = () => {
        api.get("/vacinas/lista-vacina").then((res) => {
            setVacinaList(res.data.vacinas)
        }).catch(err => {
            let errors = [...err.response.data.error]
            console.log(errors)
        })
    }


    const handleChange = (e) => {
        const value = e.target.value;
        setRegistro({
            ...registro,
            [e.target.name]: value
        })
    }

    const converterData = (d) => {
        let data = d.split("T")[0].split("-")
        return `${data[2]}/${data[1]}/${data[0]}`
    }

    useEffect(() => {
        loadVacinas()

    }, [])

    useEffect(() => {
        loadRegistros()
    }, [vacinaList])

    useEffect(() => {
        setShowtable(true)
    }, [registroList])
    
    return (
        <div>
            <Menu />
            <div className="container" id="adicionar-registro">

                <Form id="adicionar-registro-form" onSubmit={handleAdicionarRegistro}>
                    <FormGroup>
                        <Label htmlFor="data" className="h5">Data:</Label><br />
                        <Input id="data" value={registro.data} required onChange={handleChange} name="data" type="date" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="idvacina" className="h5">Vacina:</Label>
                        <Input required onChange={handleChange} id="idVacina" name="idvacina" type="select">
                            <option disabled selected value="">Selecione uma vacina</option>
 
                            {vacinaList.map(vacina => (
                                <option key={"registro_" + vacina.idvacina} value={vacina.idvacina}>{vacina.nomevacina}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <Button block color="primary" type="submit">Adicionar</Button>
                </Form>
                <br />

                {alertDiv.map(a => a)}
                {showtable &&
                    <Table id="table-list-registro" >
                        <thead>
                            <tr>
                                <th>ID do registro:</th>
                                <th>Data:</th>
                                <th>Vacina:</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registroList.map((reg) => (
                                <tr key={"registro_" + reg.idregistro}>
                                    <td>{reg.idregistro}</td>
                                    <td>{converterData(reg.data)}</td>
                                    <td>{reg.nomevacina}</td>
                                    <td><center onClick={() => handleShowModalEditarRegistro(reg)}><FaEdit className="iconTable" /></center></td>
                                    <td><center onClick={() => handleRemoveRegistro(reg.idregistro)}><FaTrashAlt className="iconTable" /></center></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }

                {showModalEditarVacina &&


                    <Modal id="modal-editar-registro" isOpen={handleShowModalEditarRegistro}>
                        <ModalHeader toggle={handleCloseModalEditarRegistro}>
                            <span className="h3">Editar registro</span>
                        </ModalHeader>
                        <ModalBody>
                            <Form id="update-registro-form" onSubmit={handleUpdateRegistro}>
                                <FormGroup>
                                    <Label htmlFor="data" className="h5">Data:</Label><br />
                                    <Input id="data" value={registro.data} required onChange={handleChange} name="data" type="date" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="idvacina" className="h5">Vacina:</Label>
                                    <Input required onChange={handleChange} id="idVacina" name="idvacina" type="select">
                                        <option disabled selected value="">Selecione uma vacina</option>

                                        {vacinaList.map(vacina => (
                                            <option key={"registro_update_" + vacina.idvacina} value={vacina.idvacina}>{vacina.nomevacina}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                                <Button block color="primary" type="submit">Atualizar</Button>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleCloseModalEditarRegistro}>Voltar</Button>
                        </ModalFooter>
                    </Modal>
                }
            </div>
        </div>
    )
}

export default Registro;
