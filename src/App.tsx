import "./App.scss";
import { Button, Checkbox, Input } from "@components/Atoms";

function App() {
  return (
    <>
      <Button variant="danger">Primary</Button>
      <Checkbox label="Pruebas" />
      <Input label="Hail Bootstrap" suffix="Adiós" prefix="Hola" />
    </>
  );
}

export default App;
