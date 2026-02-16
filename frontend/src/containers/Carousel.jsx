import { useEffect, useRef, useState } from "react"

const Button = (props) => {
    const { onClick, className, title, children } = props

    return (
        <button
            type="button"
            onClick={onClick}
            className={`absolute top-1/2 -translate-y-1/2 hidden md:flex justify-center items-center rounded-full border border-gray-200 size-9 bg-white cursor-pointer shadow-[0_4px_20px_10px_rgba(0,0,0,0.2)] hover:bg-gray-50 ${className}`}
            title={title}
        >
            {children}
        </button>
    )
}

const Carousel = (props) => {
    const { id, name, render } = props

    const [featuredProducts, setFeaturedProducts] = useState([])
    const carouselRef = useRef(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`)
            const products = await res.json()

            setFeaturedProducts(products)
        }
        fetchCategoryProducts()
    }, [])

    const updateScrollButtons = () => {
        const carousel = carouselRef.current
        if (!carousel) return

        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth
        setCanScrollLeft(carousel.scrollLeft > 0)
        setCanScrollRight(carousel.scrollLeft < maxScrollLeft - 1)
    }

    const scrollCarousel = (direction) => {
        const carousel = carouselRef.current
        if (!carousel) return

        // Products have a data-card attribute, so we can calculate the scroll amount based on the width of a card
        const firstCard = carousel.querySelector("[data-card]")
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 240
        const gap = 16

        carousel.scrollBy({ left: direction * (cardWidth + gap) * 5, behavior: "smooth" })
    }

    useEffect(() => {
        updateScrollButtons()
    }, [featuredProducts])

    // I don't know if this is necessary, but in case the user resizes the window, we should update the scroll buttons
    useEffect(() => {
        const handleResize = () => updateScrollButtons()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div>
            <h2 className="mb-4 font-bold text-2xl">{name}</h2>
            <div className="relative">
                {canScrollLeft && (
                    <Button onClick={() => scrollCarousel(-1)} className="left-0 -translate-x-1/2" title="Scroll products left">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                    </Button>
                )}

                <div
                    ref={carouselRef}
                    onScroll={updateScrollButtons}
                    className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                    {featuredProducts.map(render)}
                </div>

                {canScrollRight && (
                    <Button onClick={() => scrollCarousel(1)} className="right-0 translate-x-1/2" title="Scroll products right">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Carousel