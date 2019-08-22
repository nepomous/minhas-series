import React, { useState, useEffect } from 'react';
import axios from 'axios' //axios puxa informaçoes do servidor (apis e etc)
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('EDIT')
    const [genres, setGenres] = useState([])

    const [data, setData] = useState({})
    useEffect(() => {
        axios
            .get('/api/series/' + match.params.id)            
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
    },[match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
            })
    })

    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px' ,
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value //entre colchetes, o campo fica dinâmico
        })
    }

    const save = () => {
        axios
            .post('/api/series',{
                form
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
        <header style={masterHeader}>
            <div className='h-100' style={{background: 'rgba(0,0,0,0.7)'}}>
                <div className='h-100 container'>
                    <div className='row h-100 align-items-center'>
                        <div className='col-3'>
                            <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                        </div>
                        <div className='col-8'>
                            <h1 className='font-weight-light text-white'>{data.name}</h1>
                            <div className='lead text-white'>
                                <Badge color='success'>teste</Badge>
                                Genero: {data.genre}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className='container'>
            <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
        </div>
        {
            mode === 'EDIT' &&
            <div className='container'>
                <h1>Editar Série</h1>
                <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar Ediçao</button>
                <form>
                    <div className='form-group'>
                        <label htmlFor='name'>Nome da Série</label>
                        <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da Série'/>                
                    </div>
                    <div className='form-group'>
                        <label htmlFor='name'>Comentários</label>
                        <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Nome da Série'/>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                </form>
            </div>
        }
        </div>
    ) 
  }

  //se eu quiser usar este recurso externamente, preciso dar export
export default InfoSerie