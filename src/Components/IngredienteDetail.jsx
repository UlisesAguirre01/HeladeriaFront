import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import axios from "axios";

export default function IngredienteDetail() {
  const params = useRoute("/ingredientes/:id")[1];
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7051/api/ingredientes/${params.id}`)
      .then((res) => setItem(res.data));
  }, [params.id]);

  if (!item) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{item.nombre}</h2>
      <p>ID: {item.id}</p>
    </div>
  );
}
