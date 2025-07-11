import { Link } from "wouter";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";

export default function HeladoList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7051/api/Helados")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const eliminar = (id) => {
    if (!confirm("¿Seguro que quieres eliminar este helado?")) return;
    axios
      .delete(`https://localhost:7051/api/Helados/${id}`)
      .then(() => setItems(items.filter((i) => i.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h2>Helados</h2>
      <div className="header">
        <Link href="/helados/new" className="btn-primary">
          + Nuevo Helado
        </Link>
      </div>
      <ul className="item-list">
        {items.length === 0 ? (
          <p>No hay helados registrados.</p>
        ) : (
          items.map((i) => (
            <li key={i.id} className="item">
              <span className="item-name">{i.nombre}</span>
              <div className="actions">
                <Link href={`/helados/${i.id}/edit`} className="btn-secondary">
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
