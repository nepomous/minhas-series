import React, { useState, useEffect } from 'react';
import axios from 'axios' //axios puxa informaçoes do servidor (apis e etc)
import { Redirect } from 'react-router-dom'

const NovoGenero = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        axios
            .post('/api/genres',{
                name
            })
            .then(res => {
                setSuccess(true)
            })
    }

    if(success) {
        return <Redirect to='/generos' />
    }

    return (
        <div className='container'>
            <h1>Novo Gênero</h1>
            <form>
                <div className='form-group'>
                <label htmlFor='name'>nome do Genero</label>
                <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Nome do Genero'/>                
            </div>
            <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    ) 
  }

  //se eu quiser usar este recurso externamente, preciso dar export
export default NovoGenero