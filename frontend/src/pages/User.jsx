import { useState } from 'react';

function User() {
  // state
  const [user, setUser] = useState({
    name: '',
    password: '',
    confirm: '',
  });

  // comportement
  const handleChange = (event) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.password || user.password !== user.confirm) {
      alert('Veuiller bien remplir les champs');
    } else {
    }
  };

  // affichage (render)
  return (
    <div className="page">
      <h1>Utilisateur</h1>
      <div className="container">
        <div className="item">
          <h2>Nouvel utilisateur</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              placeholder="nom..."
              value={user.name}
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
              <span className="error">
                La confirmation mot ne correspond pas
              </span>
            )}{' '}
            <br />
            <button>Valider</button>
          </form>
        </div>
        <div className="item">
          <h2>Liste des utilisateurs</h2>
        </div>
      </div>
    </div>
  );
}

export default User;
