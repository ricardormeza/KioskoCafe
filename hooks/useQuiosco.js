import { useContext } from 'react';
import QuiscoContext from '../context/QuioscoProvider';

const useQuiosco = () => {
    return useContext(QuiscoContext);
}

export default useQuiosco;