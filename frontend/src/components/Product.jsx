const Product = (props) => {
    const { product, className = "" } = props
    const { title, description, price, images } = product

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
            <h3 className="mt-3 text-sm font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
            <p className="mt-1 text-sm font-bold text-gray-900">${price}</p>
        </article>
    )
}

export default Product