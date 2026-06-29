import logo from "./assets/logo.png";
import desenho from "./assets/desenho.png"

export default function App() {

  return (
    <div>
      <img src={logo} className="logo" />
      <img src={desenho} className="desenho" />
    </div>
  );
}
