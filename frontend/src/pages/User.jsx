import axios from 'axios';
import { useState, useEffect } from 'react';
import FormUser from '../components/FormUser';
import ListUser from '../components/ListUser';

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

  const handleEdit = (id) => {};

  const handleDelete = (id) => {
    if (window.confirm('Voulez vous supprimer cet utilisateur ?')) {
      axios
        .delete('http://localhost:4000/api/auth/' + id)
        .then(() => getData());
    }
  };

  // affichage (render)
  return (
    <div className="page">
      <h1>Utilisateur</h1>
      <div className="container">
        <div className="item">
          <h2>Nouvel utilisateur</h2>
          <FormUser getData={getData} />
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
                <ListUser
                  key={user._id}
                  user={user}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
