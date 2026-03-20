import { useLocation, useNavigate } from "react-router"
import useCartStore from "../store/cartStore"

const Cart = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { items, removeItem, addItem } = useCartStore()

    const cartItems = Object.values(items)
    const totalCost = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

    const handleClose = () => {
        if (location.state?.backgroundLocation) {
            navigate(location.state.backgroundLocation)
        } else {
            navigate("/")
        }
    }

    const handleCheckout = () => {
        alert("Purchase completed. Well done!")
        handleClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-end lg:justify-center">
            {/* Overlay oscuro para pantallas grandes */}
            <div
                className="hidden lg:block absolute inset-0 bg-black/40"
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Modal del carrito */}
            <div className="relative w-full lg:w-96 h-full lg:h-auto lg:max-h-[90vh] bg-white lg:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Header del modal */}
                <div className="flex justify-between items-center border-b border-gray-200 p-4 lg:p-6">
                    <h2 className="text-xl font-bold">My Cart</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        aria-label="Close cart"
                    >
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                        </svg>
                    </button>
                </div>

                {/* Contenido del carrito */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <svg
                                className="w-16 h-16 text-gray-300"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="currentColor"
                            >
                                <path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                            </svg>
                            <p className="text-gray-500 font-semibold">Your cart is empty</p>
                            <p className="text-sm text-gray-400">Add some products to get started!</p>
                            <button
                                onClick={handleClose}
                                className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map(({ product, quantity }) => (
                                <div
                                    key={product.id}
                                    className="flex gap-3 p-3 border border-gray-100 rounded-lg hover:shadow-md transition"
                                >
                                    {/* Imagen */}
                                    <img
                                        src={product.images?.[0]}
                                        alt={product.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />

                                    {/* Info del producto */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                                            {product.title}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            ${product.price.toFixed(2)} each
                                        </p>
                                    </div>

                                    {/* Controles de cantidad y precio */}
                                    <div className="flex flex-col items-end justify-between">
                                        <p className="font-bold text-gray-900">
                                            ${(product.price * quantity).toFixed(2)}
                                        </p>
                                        <div className="flex items-center border border-green-700 rounded text-green-700 text-sm">
                                            <button
                                                onClick={() => removeItem(product.id)}
                                                className="px-2 py-1 font-semibold hover:bg-green-50"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="px-2 font-semibold min-w-8 text-center">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => addItem(product)}
                                                className="px-2 py-1 font-semibold hover:bg-green-50"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer con total y checkout */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-4 lg:p-6 space-y-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-green-700">${totalCost.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition"
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={handleClose}
                            className="w-full border border-gray-300 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
