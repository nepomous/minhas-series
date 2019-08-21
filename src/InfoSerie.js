import React, { useState, useEffect } from 'react';
import axios from 'axios' //axios puxa informaçoes do servidor (apis e etc)
import { Redirect } from 'react-router-dom'

const InfoSerie = ({ match }) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    
    const [data, setData] = useState({})
    useEffect(() => {
        axios
            .get('/api/series/' + match.params.id)            
            .then(res => {
                setData(res.data)
            })
    },[match.params.id])

    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        axios
            .post('/api/series',{
                name
            })
            .then(res => {
                setSuccess(true)
            })
    }

    if(success) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <div className='container'>
                <h1>Nova Série</h1>
                <form>
                    <div className='form-group'>
                    <label htmlFor='name'>Nome da Série</label>
                    <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Nome da Série'/>                
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                </form>
            </div>
        </div>
    ) 
  }

  //se eu quiser usar este recurso externamente, preciso dar export
export default InfoSerie