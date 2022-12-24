import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";

const QuiscoContext = createContext();

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual ] = useState({});
    const [producto, setProducto ] = useState({});
    const [modal, setModal ] = useState(false);
    const [pedido, setPedido ] = useState([]);
    const [paso, setPaso ] = useState([]);
    const [nombre, setNombre ] = useState('');
    const [total, setTotal] = useState(0);

    const router = useRouter()

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

    useEffect( () => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);

        setTotal(nuevoTotal);
    },[pedido])

    const handleClickCategoria = id => {
        // console.log(id)
        const categoria = categorias.filter( cat => cat.id === id);
        console.log(categoria);
        setCategoriaActual(categoria[0])
    }
    
    const handleSetProducto = producto => {
        setProducto(producto)
    }
    
    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        // console.log(producto)
        if(pedido.some(productoState => productoState.id === producto.id )){
            // Actualizar cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)

            setPedido(pedidoActualizado);

            toast.success('Guardado correctamente.')
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido.')
        }
        
        setModal(false)
    }

    // const handleChangePaso = paso => {
    //     setPaso(paso)
    // }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])

        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();

        try{
            const {data} = await axios.post('/api/ordenes',{pedido, nombre, total, fecha: Date.now().toString()});
            // console.log(data)

            //RESETEAR LA APP
            
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido realizado correctamente');

            setTimeout(()=> {
                router.push('/');
            }, 3000)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <QuiscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total,
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
