import { useCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';

function CartItem({ item }) {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 gap-4">
            <Link to={`/products/${item.id}`} className="shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>

            <div className="flex-grow flex flex-col justify-between w-full">
                <div className="flex justify-between items-start w-full">
                    <div>
                        <Link to={`/products/${item.id}`}>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-blue-600">
                                {item.name}
                            </h4>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">Rp {item.price.toLocaleString('id-ID')} / {item.unit}</p>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 sm:p-2 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                        title="Hapus item"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-between items-center w-full mt-4">
                    <div className="flex items-center border border-gray-300 rounded-md bg-white">
                        <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>
                        <span className="px-3 py-1 text-gray-900 min-w-[2.5rem] text-center font-medium border-x border-gray-300">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => increaseQuantity(item.id)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                            +
                        </button>
                    </div>

                    <div className="font-bold text-gray-900 text-lg">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
