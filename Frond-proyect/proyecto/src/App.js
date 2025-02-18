import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Estado para almacenar los usuarios
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [userToUpdate, setUserToUpdate] = useState({ id: '', name: '', email: '' });

  // Función para obtener todos los usuarios
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users'); // Ruta de la API para obtener usuarios
      setUsers(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Error al obtener los usuarios');
    }
  };

  // Función para crear un nuevo usuario
  const createUser = async () => {
    if (!newUser.name || !newUser.email) {
      setMessage('Por favor ingresa un nombre y un email.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', newUser); // Ruta de la API para crear usuario
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '' });
      setMessage('Usuario creado con éxito');
    } catch (error) {
      setMessage('Error al crear el usuario');
    }
  };

  // Función para actualizar un usuario
  const updateUser = async () => {
    if (!userToUpdate.name || !userToUpdate.email || !userToUpdate.id) {
      setMessage('Por favor ingresa el nombre, email y el id del usuario.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userToUpdate.id}`, userToUpdate); // Ruta de la API para actualizar usuario
      setUsers(users.map(user => user.id === userToUpdate.id ? response.data : user));
      setUserToUpdate({ id: '', name: '', email: '' });
      setMessage('Usuario actualizado con éxito');
    } catch (error) {
      setMessage('Error al actualizar el usuario');
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`); // Ruta de la API para eliminar usuario
      setUsers(users.filter(user => user.id !== id));
      setMessage('Usuario eliminado');
    } catch (error) {
      setMessage('Error al eliminar el usuario');
    }
  };

  return (
    <div className="App">
      <h1>Gestión de Usuarios</h1>

      {/* Mensaje de éxito o error */}
      {message && <p>{message}</p>}

      {/* Botón para obtener todos los usuarios */}
      <button onClick={getUsers}>Obtener Usuarios</button>

      {/* Lista de usuarios */}
      <div>
        {users.length > 0 && (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.name} - {user.email}
                <button onClick={() => deleteUser(user.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulario para agregar un nuevo usuario */}
      <h3>Crear nuevo usuario</h3>
      <input 
        type="text" 
        placeholder="Nombre" 
        value={newUser.name} 
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={newUser.email} 
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={createUser}>Crear Usuario</button>

      {/* Formulario para actualizar un usuario */}
      <h3>Actualizar un usuario</h3>
      <input 
        type="text" 
        placeholder="ID del Usuario" 
        value={userToUpdate.id} 
        onChange={(e) => setUserToUpdate({ ...userToUpdate, id: e.target.value })}
      />
      <input 
        type="text" 
        placeholder="Nombre" 
        value={userToUpdate.name} 
        onChange={(e) => setUserToUpdate({ ...userToUpdate, name: e.target.value })}
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={userToUpdate.email} 
        onChange={(e) => setUserToUpdate({ ...userToUpdate, email: e.target.value })}
      />
      <button onClick={updateUser}>Actualizar Usuario</button>
    </div>
  );
}

export default App;
