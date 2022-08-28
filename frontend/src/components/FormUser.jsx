import axios from 'axios';
import { useState } from 'react';

export default function FormUser() {
  // state
  const [user, setUser] = useState({
    userName: '',
    password: '',
    confirm: '',
  });

  // comportement
  const handleChange = (event) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.userName || !user.password || user.password !== user.confirm) {
      alert('Veuiller bien remplir les champs');
    } else {
      const data = {
        userName: user.userName,
        password: user.password,
      };
      axios.post('http://localhost:4000/api/auth/signup', data).then(() =>
        setUser((prev) => ({
          ...prev,
          userName: '',
          password: '',
          confirm: '',
        }))
      );
    }
  };

  // affichage (render)
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nom</label>
      <input
        type="text"
        name="userName"
        placeholder="nom..."
        value={user.userName}
        onChange={handleChange}
      />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        placeholder="mot de passe..."
        value={user.password}
        onChange={handleChange}
      />
      <label htmlFor="confirm">Confirmation</label>
      <input
        type="password"
        name="confirm"
        placeholder="confirmation mot de passe..."
        value={user.confirm}
        onChange={handleChange}
      />{' '}
      <br />
      {user.password !== user.confirm && (
        <span className="error">La confirmation mot ne correspond pas</span>
      )}{' '}
      <br />
      <button>Valider</button>
    </form>
  );
}
