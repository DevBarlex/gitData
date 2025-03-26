// src/components/GitHubUser.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '../redux/fetchSlice';

export const GitHubUser = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.githubUser);

  const fetchGitHubUser = async (username) => {
    dispatch(fetchUserStart());
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('Usuario no encontrado');
      const data = await response.json();
      dispatch(fetchUserSuccess(data));
    } catch (err) {
      dispatch(fetchUserFailure(err.message));
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Busca algún usuario</h2>
      <input
        type="text"
        placeholder="GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => fetchGitHubUser(username)}>Buscar</button>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {user && (
        <div>
          <img src={user.avatar_url} alt={user.login} width={100} />
          <h2>{user.name || 'Nombre no disponible'}</h2>
          <p>Usuario: {user.login}</p>
          <p>Seguidores: {user.followers}</p>
          <p>Repositorios públicos: {user.public_repos}</p>
        </div>
      )}
    </div>
  );
};