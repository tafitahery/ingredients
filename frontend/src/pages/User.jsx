import FormUser from '../components/FormUser';

function User() {
  // state

  // comportement

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
        </div>
      </div>
    </div>
  );
}

export default User;
