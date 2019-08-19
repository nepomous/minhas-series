import React, { useState, useEffect } from 'react';

const NovoGenero = () => {
    return (
        <div className='container'>
            <h1>Novo Gênero</h1>
            <form>
                <div className='form-group'>
                <label for='name'>nome do Genero</label>
                <input type='text' className='form-control' id='name' placeholder='Nome do Genero'/>                
            </div>
            </form>
        </div>
    ) 
  }

  //se eu quiser usar este recurso externamente, preciso dar export
export default NovoGenero