import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import api from '../services/api';
import './Main.css';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';

export default function Main({ history }) {

    const [clients, setClients] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/clients');
            setClients(response.data);
        }

        loadUsers();
    });

    async function handleAdd(e) {
        e.preventDefault();
        history.push('/client/0');
    }

    async function handleEdit(id, e) {
        e.preventDefault();
        history.push(`/client/${id}`);
    }

    async function handleDel(id, e) {
        e.preventDefault();
        const response = await api.delete(`/clients/${id}`);
    }

    return (
        <div className='main-container'>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <Button variant="outline-secondary" onClick={handleAdd}>
                        <FaUserAlt />
                    </Button>
                </InputGroup.Prepend>
            </InputGroup>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>#</th>
                        <th style={{ width: '30%' }}>Nome</th>
                        <th style={{ width: '30%' }}>CPF</th>
                        <th style={{ width: '10%', textAlign: 'center' }}>Estado</th>
                        <th style={{ width: '20%', textAlign: 'center' }}>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.cpf}</td>
                            <td style={{ textAlign: 'center' }}>DF</td>
                            <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <button onClick={(e) => handleEdit(client.id, e)}>
                                    <MdModeEdit />
                                </button>
                                <button onClick={(e) => handleDel(client.id, e)}>
                                    <MdDeleteForever />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}