import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import axios from "axios";
import "../style.css";

export default function IngredienteForm() {
  const params = useRoute("/ingredientes/:id/edit")[1];
  const [, navigate] = useLocation();
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (params?.id) {
      axios
        .get(`https://localhost:7051/api/Ingredientes/${params.id}`)
        .then((res) => setNombre(res.data.nombre))
        .catch((err) => console.error(err));
    }
  }, [params?.id]);

  const submit = (e) => {
    e.preventDefault();
    const data = { nombre };
    const req = params?.id
      ? axios.put(`https://localhost:7051/api/Ingredientes/${params.id}`, data)
      : axios.post(`https://localhost:7051/api/Ingredientes`, data);

    req
      .then(() => navigate("/ingredientes"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h2>{params?.id ? "Editar Ingrediente" : "Nuevo Ingrediente"}</h2>
      <form onSubmit={submit} className="form">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
        <button type="submit" className="btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
}
