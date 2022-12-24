import { useRouter } from "next/router"


const pasos = [
    {paso: 1, nombre: 'Menu', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Datos y Total', url: '/total'},
]

export default function Pasos() {
    
    const router = useRouter();

    // console.log(paso);

    const calcularProgreso = () => {
        // const porcentaje = (paso / 3) * 100;
        // return porcentaje;
        let valor;
        if(router.pathname === '/'){
            valor = 2;
        }else if(router.pathname === '/resumen'){
            valor = 50;
        }else{
            valor = 100;
        }
        return valor;
    }

  return (
    <>
        <div className='flex justify-between mb-5'>
            {pasos.map(paso => (
                <button
                className="font-bold text-2xl text-yellow-500"
                key={paso.paso}
                onClick={() => {
                    router.push(paso.url);
                    
                }}
                >
                    {paso.nombre}
                </button>
            ))}
        </div>
        <div className="bg-gray-100 mb-10">
            <div className="rounded-full bg-amber-500 
            text-sm leading-none h-2 
            text-center text-white"
            style={{ width: `${calcularProgreso()}%` }}
            ></div>
        </div>
    </>

  )
}
