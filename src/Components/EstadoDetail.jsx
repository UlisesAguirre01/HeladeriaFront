import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import axios from "axios";
import "../style.css";

export default function EstadoDetail() {
  const params = useRoute("/estados/:id")[1];
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7051/api/Estados/${params.id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error(err));
  }, [params.id]);

  if (!item) {
    return (
      <div className="container">
        <p>Cargando estado...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Detalle de Estado</h2>
      <div className="detail-card">
        <p>
          <strong>Nombre:</strong> {item.nombre}
        </p>
        <p>
          <strong>ID:</strong> {item.id}
        </p>
      </div>
      <Link href="/estados" className="btn-secondary">
        Volver
      </Link>
    </div>
  );
}
