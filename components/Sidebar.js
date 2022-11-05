import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
  const { categorias } = useQuiosco();

  return (
    <>
        <Image 
            src="/images/logo.svg"
            width={300}
            height={100}
            alt="logo de quisco"
        />

        {/* CONSUMIR API DESDE COMPONENT */}
        <nav className="mt-10">
          {categorias.map(categoria => (
            <Categoria 
              key={categoria.id}
              categoria={categoria}
            />
          ))}
        </nav>
    </>
  )
}

export default Sidebar