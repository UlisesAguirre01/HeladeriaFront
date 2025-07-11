import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import axios from "axios";
import "../style.css";

export default function HeladoForm() {
  const params = useRoute("/helados/:id/edit")[1];
  const [, navigate] = useLocation();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [isArtesanal, setIsArtesanal] = useState(false);
  const [estadoId, setEstadoId] = useState(0);
  const [ingredientesIds, setIngredientesIds] = useState([]);

  const [estados, setEstados] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7051/api/estados")
      .then((res) => setEstados(res.data));
    axios
      .get("https://localhost:7051/api/ingredientes")
      .then((res) => setIngredientes(res.data));

    if (params?.id) {
      axios
        .get(`https://localhost:7051/api/helados/${params?.id}`)
        .then((res) => {
          const h = res.data;
          setNombre(h.nombre);
          setDescripcion(h.descripcion);
          setPrecio(h.precio);
          setIsArtesanal(h.isArtesanal);
          setEstadoId(h.estadoId);
          setIngredientesIds(h.ingredientes.map((i) => i.id));
        })
        .catch((err) => console.error(err));
    }
  }, [params?.id]);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      nombre,
      descripcion,
      precio,
      isArtesanal,
      estadoId,
      ingredientesIds,
      fechaCreacion: new Date().toISOString(),
    };

    const request = params?.id
      ? axios.put(`https://localhost:7051/api/helados/${params?.id}`, data)
      : axios.post(`https://localhost:7051/api/helados`, data);

    request.then(() => navigate("/helados")).catch((err) => console.error(err));
  };

  const toggleIngrediente = (id) => {
    setIngredientesIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <form className="form-container" onSubmit={submit}>
      <h2>{params?.id ? "Editar Helado" : "Nuevo Helado"}</h2>

      <label>
        Nombre
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
      </label>

      <label>
        Descripción
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
        />
      </label>

      <label>
        Precio
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Precio"
        />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isArtesanal}
          onChange={(e) => setIsArtesanal(e.target.checked)}
        />
        Artesanal
      </label>

      <label>
        Estado
        <select value={estadoId} onChange={(e) => setEstadoId(e.target.value)}>
          <option>Seleccione Estado</option>
          {estados.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend>Ingredientes</legend>
        <div className="ingredientes-grid">
          {ingredientes.map((i) => (
            <label key={i.id}>
              <input
                type="checkbox"
                checked={ingredientesIds.includes(i.id)}
                onChange={() => toggleIngrediente(i.id)}
              />
              {i.nombre}
            </label>
          ))}
        </div>
      </fieldset>

      <button className="btn-primary" type="submit">
        Guardar
      </button>
    </form>
  );
}
