import { Card } from '../../components/card';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import swal from 'sweetalert';
import './style.css'


export function Home() {
  const [userName, setUserName] = useState()
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: '' })

  
  function addStudent() {
    const inputStudents = document.getElementById('inputStudentsName')

    if(inputStudents.value === "") {
      return swal({
        title: "Aviso!",
        text: "É preciso informar um nome para adicionar a lista de presença!",
        icon: "warning",
        button: "Ok!",
      });
        
    } else if (inputStudents.value != '') {
      swal({
        title: "Adicionado com sucesso!",
        icon: "success",
      });
    }

    const newStudent = {
      name: userName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })

    };

    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    async function loadingUser () {
      const response = await fetch('https://api.github.com/users/daviaxs')
      const data = await response.json()
    
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    loadingUser()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>

      </header>

      <input 
      id='inputStudentsName'
      type="text" 
      placeholder='Digite o nome...'
      onChange={e => setUserName(e.target.value)}
      />

      <button 
      type="button"
      onClick={addStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card
            key={uuid()} 
            name={student.name} 
            time={student.time} />
        ))
      }

    </div>
  )
}