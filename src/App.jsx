import { Route, Switch, Link } from "wouter";
import CategoriaList from "./Components/CategoriaList";
import CategoriaForm from "./Components/CategoriaForm";
import CategoriaDetail from "./Components/CategoriaDetail";
import IngredienteList from "./Components/IngredienteList";
import IngredienteForm from "./Components/IngredienteForm";
import IngredienteDetail from "./Components/IngredienteDetail";
import EstadoList from "./Components/EstadoList";
import EstadoForm from "./Components/EstadoForm";
import EstadoDetail from "./Components/EstadoDetail";
import HeladoList from "./Components/HeladoList";
import HeladoForm from "./Components/HeladoForm";
import HeladoDetail from "./Components/HeladoDetail";

export default function App() {
  return (
    <div>
      <header>
        <h1>🍦 Heladería</h1>
        <nav>
          <Link href="/">Categorías</Link> |{" "}
          <Link href="/ingredientes">Ingredientes</Link> |{" "}
          <Link href="/estados">Estados</Link> |{" "}
          <Link href="/helados">Helados</Link>
        </nav>
      </header>

      <Switch>
        <Route path="/" component={CategoriaList} />
        <Route path="/categorias/new" component={CategoriaForm} />
        <Route path="/categorias/:id/edit" component={CategoriaForm} />
        <Route path="/categorias/:id" component={CategoriaDetail} />

        <Route path="/ingredientes" component={IngredienteList} />
        <Route path="/ingredientes/new" component={IngredienteForm} />
        <Route path="/ingredientes/:id/edit" component={IngredienteForm} />
        <Route path="/ingredientes/:id" component={IngredienteDetail} />

        <Route path="/estados" component={EstadoList} />
        <Route path="/estados/new" component={EstadoForm} />
        <Route path="/estados/:id/edit" component={EstadoForm} />
        <Route path="/estados/:id" component={EstadoDetail} />

        <Route path="/helados" component={HeladoList} />
        <Route path="/helados/new" component={HeladoForm} />
        <Route path="/helados/:id/edit" component={HeladoForm} />
        <Route path="/helados/:id" component={HeladoDetail} />
      </Switch>
    </div>
  );
}
