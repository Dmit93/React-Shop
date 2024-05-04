import { useState, useContext, useEffect } from 'react'
import { CartContext } from '../../contexts/CartContext'

export default function CartPopup() {

    const { cartItems, setCartItems, viewCartPopup, viewCartClick, removeCart } = useContext(CartContext);

    const [priceCart, setPriceCart] = useState(0);

    const updateCountItem = (id: number, count: number) => {
        if (count <= 0) {
            removeCart(id);
            return false;
        }
        setCartItems(cartItems.map(item => item.id === id ? { ...item, count: count } : item));
    }


    useEffect(() => {
        setPriceCart(cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.count, 0))
    }, [cartItems]);


    return (
        <div className={viewCartPopup ? "fixed inset-0 z-40 overflow-y-auto" : "relative -z-10 opacity-0"} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden" >
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Корзина</h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={viewCartClick}>
                                                <span className="absolute -inset-0.5"></span>
                                                <span className="sr-only">Close panel</span>
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((product) => (
                                                    <li key={product.id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center" />
                                                        </div>
                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="#">{product.name}</a>
                                                                    </h3>
                                                                    <p className="ml-4">{product.price}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                            </div>
                                                            <div className="flex flex-1 justify-between items-center text-sm mt-2">
                                                                <div>
                                                                    <p className="text-gray-500">Количество: {product.count}</p>

                                                                    <div className="max-w-xs mt-2">
                                                                        <div className="relative flex items-center">
                                                                            <button type="button" id="decrement-button" onClick={() => updateCountItem(product.id, product.count - 1)} data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                                                <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                                                </svg>
                                                                            </button>
                                                                            <input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900 dark:text-black border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={product.count} readOnly />
                                                                            <button type="button" id="increment-button" onClick={() => updateCountItem(product.id, product.count + 1)} data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                                                <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="flex" onClick={() => removeCart(product.id)}>
                                                                    <button type="button" className="font-medium text-[red] hover:text-indigo-500">Удалить</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Общая сумма</p>
                                        <p>{priceCart} ₽</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500"></p>
                                    <div className="mt-6">
                                        <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            или
                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={viewCartClick}>
                                                Продолжить покупки
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}