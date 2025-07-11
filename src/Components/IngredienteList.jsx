import { Link } from "wouter";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";

export default function IngredienteList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7051/api/Ingredientes")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const eliminar = (id) => {
    if (!confirm("¿Seguro que quieres eliminar este ingrediente?")) return;
    axios
      .delete(`https://localhost:7051/api/Ingredientes/${id}`)
      .then(() => setItems(items.filter((i) => i.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h2>Ingredientes</h2>
      <div className="header">
        <Link href="/ingredientes/new" className="btn-primary">
          + Nuevo Ingrediente
        </Link>
      </div>
      <ul className="item-list">
        {items.length === 0 ? (
          <p>No hay ingredientes registrados.</p>
        ) : (
          items.map((i) => (
            <li key={i.id} className="item">
              <span className="item-name">{i.nombre}</span>
              <div className="actions">
                <Link
                  href={`/ingredientes/${i.id}/edit`}
                  className="btn-secondary"
                >
                  Editar
                </Link>
                <button onClick={() => eliminar(i.id)} className="btn-danger">
                  Eliminar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
