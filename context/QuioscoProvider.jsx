import { useState, useEffect, createContext } from "react";
import axios from "axios";

const QuiscoContext = createContext();

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual ] = useState({});

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }
    useEffect( () => {
        obtenerCategorias()
    }, [])

    //SELECCIONANDO CATEGORIA MOSTRADA POR DEFAULT
    useEffect( () => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    const handleClickCategoria = id => {
        // console.log(id)
        const categoria = categorias.filter( cat => cat.id === id);
        console.log(categoria);
        setCategoriaActual(categoria[0])
    }

    return(
        <QuiscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
            }}
        >
            {children}
        </QuiscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuiscoContext
