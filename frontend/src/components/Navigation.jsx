import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';

export default function Navigation() {
  // state

  // comportement

  // affichage (render)
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Acceuil</NavLink>
        </li>
        <li>
          <NavLink to="/ingredient">Ingredient</NavLink>
        </li>
        <li>
          <NavLink to="/product">Produit</NavLink>
        </li>
        <li>
          <NavLink to="/inReport">Rapport d' entrée</NavLink>
        </li>
        <li>
          <NavLink to="/outReport">Rapport de sortie</NavLink>
        </li>
      </ul>
    </nav>
  );
}
