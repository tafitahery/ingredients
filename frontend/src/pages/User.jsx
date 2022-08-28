import axios from 'axios';
import { useState, useEffect } from 'react';
import FormUser from '../components/FormUser';

function User() {
  // state
  const [users, setUsers] = useState([]);

  // comportement
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('http://localhost:4000/api/auth')
      .then(({ data }) => setUsers(data));
  };

  // affichage (render)
  return (
    <div className="page">
      <h1>Utilisateur</h1>
      <div className="container">
        <div className="item">
          <h2>Nouvel utilisateur</h2>
          <FormUser />
        </div>
        <div className="item">
          <h2>Liste des utilisateurs</h2>
          <table className="tableIn">
            <thead>
              <tr>
                <th>Nom</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.userName}</td>
                  <td>
                    <button>Modifier</button> <button>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
