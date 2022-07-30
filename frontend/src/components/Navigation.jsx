import { Link } from 'react-router-dom';

export default function Navigation() {
  // state

  // comportement

  // affichage (render)
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Acceuil</Link>
        </li>
        <li>
          <Link to="/in">Entrée</Link>
        </li>
        <li>
          <Link to="/out">Sortie</Link>
        </li>
        <li>
          <Link to="/ingredient">Ingredient</Link>
        </li>
        <li>
          <Link to="/product">Produit</Link>
        </li>
        <li>
          <Link to="/inReport">Rapport d' entrée</Link>
        </li>
        <li>
          <Link to="/outReport">Rapport de sortie</Link>
        </li>
      </ul>
    </nav>
  );
}
