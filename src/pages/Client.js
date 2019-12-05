import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import api from '../services/api';
import './Client.css';
import InputGroup from 'react-bootstrap/InputGroup'
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import InputMask from 'react-input-mask';

export default function Client({ history, match }) {

    const [client, setClient] = useState({});
    const [email, setEmail] = useState({ email: "" });
    const [phone, setPhone] = useState({ number: "" });
    const [emails, setEmails] = useState([]);
    const [phones, setPhones] = useState([]);
    const [teste, setTeste] = useState("");

    useEffect(() => {
        async function loadClient() {
            const response = await api.get(`/clients/${match.params.id}`);
            setClient(response.data);
            setEmails(response.data.emails);
            setPhones(response.data.phones);
            console.log(client);
        }
        loadClient();
    }, [match.params.id]);

    function handleAddEmail(email, e) {
        e.preventDefault();
        let temp = [...emails, email];
        setEmails(temp);
        console.log(temp);
    }

    function handleAddPhone(newPhone, e) {
        e.preventDefault();
        let phone = newPhone.number.replace(/[()]|[-]|\s+/g,"");
        let temp = [...phones, {number: phone}];
        setPhones(temp);
        console.log(temp);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setClient({...client, emails, phones });
        await api.post('/clients', client);
        history.push('/main');
    }

    async function searchCep(cep, e) {
        e.preventDefault();
        if (cep.length === 9) {
            const response = await api.get(`http://viacep.com.br/ws/${cep}/json/`);
            setClient({
                ...client,
                logradouro: response.data.logradouro,
                complemento: response.data.complemento,
                uf: response.data.uf,
                localidade: response.data.localidade,
                bairro: response.data.bairro,
            });
        }
    }

    return (
        <div className='client-container'>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group md='8' as={Col} controlId="formGridNome" value={client.name} onChange={e => setClient({ ...client, name: e.target.value })}>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control defaultValue={client.name} placeholder="Nome completo" />
                    </Form.Group>

                    <Form.Group md='4' as={Col} controlId="formGridCPF" style={{ marginTop: 20 }}>
                        <Form.Label>CPF</Form.Label>
                        <InputMask mask="999.999.999-99" maskChar={null} value={client.cpf} onChange={e => setClient({ ...client, cpf: e.target.value })} />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail" onChange={e => setEmail({ email: e.target.value })}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Insira o email" />
                        <InputGroup.Prepend style={{ marginTop: 5, marginBottom: 5 }}>
                            <Button variant="outline-secondary" onClick={(e) => handleAddEmail(email, e)}>
                                <FaPlus />
                            </Button>
                        </InputGroup.Prepend>
                        {emails.length > 0 ?
                        emails.map(email => (
                            <table style={{ width: '50%'}}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '80%'}}></th>
                                        <th style={{ width: '20%'}}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{ email.email }</td>
                                        <td>
                                            <Button variant="outline-secondary" onClick={searchCep}>
                                                <MdDeleteForever />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ))
                        :
                        <div></div>
                    }
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail" style={{ marginTop: 30 }}>
                        <Form.Label>Telefone</Form.Label>
                        <InputMask mask="(99) 99999-9999" maskChar={null} onChange={e => setPhone({ number: e.target.value })} />
                        <InputGroup.Prepend style={{ marginTop: 5, marginBottom: 5 }}>
                            <Button variant="outline-secondary" onClick={(e) => handleAddPhone(phone, e)}>
                                <FaPlus />
                            </Button>
                        </InputGroup.Prepend>
                        {phones.length > 0 ?
                            phones.map(phone => (
                                <table style={{ width: '50%'}}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '80%'}}></th>
                                            <th style={{ width: '20%'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{ phone.number }</td>
                                            <td>
                                                <Button variant="outline-secondary" onClick={searchCep}>
                                                    <MdDeleteForever />
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))
                            :
                            <div></div>
                        }
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCEP">
                        <Form.Label>CEP</Form.Label>
                        <InputMask mask="99999-999" maskChar={null} onChange={e => searchCep(e.target.value, e)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control as="select">
                            <option>Escolha...</option>
                            <option>{client.uf}</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCidade">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control defaultValue={client.localidade} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBairro">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control as="select">
                            <option>Escolha...</option>
                            <option>{client.bairro}</option>
                        </Form.Control>
                    </Form.Group>

                </Form.Row>

                <Form.Group controlId="formGridEndereco">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control defaultValue={client.logradouro} placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group controlId="formGridComp">
                    <Form.Label>Complemento</Form.Label>
                    <Form.Control defaultValue={client.complemento} placeholder="Apartamento, prédio, andar..." />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </div>
    );
}