import { ICart } from "@/interfaces";

const useLocalStorageCart = () => {
    const getStoredOrder = () => {
        const storedOrder = localStorage.getItem('order');
        return storedOrder ? JSON.parse(storedOrder) : { products: [] };
    };

    const setStoredOrder = (order: ICart) => {
        localStorage.setItem('order', JSON.stringify(order));
    };

    return { order1: getStoredOrder(), setOrder1: setStoredOrder };
};

export default useLocalStorageCart;