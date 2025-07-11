import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import axios from "axios";
import "../style.css";

export default function CategoriaDetail() {
  const params = useRoute("/categorias/:id")[1];
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7051/api/Categoria/${params?.id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error(err));
  }, [params?.id]);

  if (!item) {
    return (
      <div className="container">
        <p>Cargando categoría...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Detalle de Categoría</h2>
      <div className="detail-card">
        <p>
          <strong>Nombre:</strong> {item.nombre}
        </p>
        <p>
          <strong>ID:</strong> {item.id}
        </p>
      </div>
      <Link href="/categorias" className="btn-secondary">
        Volver
      </Link>
    </div>
  );
}
