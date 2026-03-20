import useCartStore from "../store/cartStore"

const Product = (props) => {
    const { product, className = "" } = props
    const { id, title, description, price, images } = product

    const { items, addItem, removeItem } = useCartStore()
    const quantity = items[id]?.quantity || 0
    
    const handleAdd = () => addItem(product)
    const handleRemove = () => removeItem(id)

    return (
        <article
            data-card
            className={`snap-start rounded-2xl border border-gray-100 bg-white p-3 shadow-sm ${className}`}>
            <img
                className="rounded-xl"
                src={images?.[0]}
                alt={title}
                width={320}
                height={320}
                loading="lazy" />
            <h3 className="mt-3 text-sm font-semibold capitalize text-gray-900 wrap-break-word">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2" title={description}>
                {description}
            </p>
            <div className="flex justify-between items-center mt-1">
                <span className="text-sm font-bold text-gray-900">${price}</span>
                {quantity > 0 ? (
                    <div className="flex items-center overflow-hidden rounded-lg text-white bg-green-700">
                        <button
                            type="button"
                            className="px-3 py-1 font-semibold"
                            onClick={handleRemove}
                            aria-label={`Decrease quantity of ${title}`}>
                            -
                        </button>
                        <span className="min-w-4 text-center text-sm font-semibold" aria-live="polite">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            className="px-3 py-1 font-semibold"
                            onClick={handleAdd}
                            aria-label={`Increase quantity of ${title}`}>
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="border border-green-700 rounded-lg py-1 px-3 text-green-700 font-semibold">
                        ADD
                    </button>
                )}
            </div>
        </article>
    )
}

export default Product