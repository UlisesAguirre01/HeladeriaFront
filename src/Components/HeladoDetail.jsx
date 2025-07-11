import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import axios from "axios";
import "../style.css";

export default function HeladoDetail() {
  const params = useRoute("/helados/:id")[1];
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7051/api/helados/${params?.id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error(err));
  }, [params?.id]);

  if (!item) {
    return (
      <div className="container">
        <p>Cargando helado...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Detalle del Helado</h2>
      <div className="detail-card">
        <p>
          <strong>Nombre:</strong> {item.nombre}
        </p>
        <p>
          <strong>Descripción:</strong> {item.descripcion || "Sin descripción"}
        </p>
        <p>
          <strong>Precio:</strong> ${item.precio}
        </p>
        <p>
          <strong>Estado:</strong> {item.estado?.nombre || "Sin estado"}
        </p>
        <p>
          <strong>Ingredientes:</strong>{" "}
          {item.ingredientes && item.ingredientes.length > 0
            ? item.ingredientes.map((i) => i.nombre).join(", ")
            : "Sin ingredientes"}
        </p>
      </div>

      <Link href="/helados" className="btn-secondary">
        Volver
      </Link>
    </div>
  );
}
