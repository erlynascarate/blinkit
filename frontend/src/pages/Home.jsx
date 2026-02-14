import { useEffect, useRef, useState } from "react"
import Product from "../components/Product"

const Home = () => {
    const [categories, setCategories] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const carouselRef = useRef(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://api.escuelajs.co/api/v1/categories")
            const categories = await res.json()

            setCategories([...categories, ...categories])
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchCategoryProducts = async () => {
            const res = await fetch("https://api.escuelajs.co/api/v1/categories/1/products")
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

        const firstCard = carousel.querySelector("[data-card]")
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 240
        const gap = 16

        carousel.scrollBy({ left: direction * (cardWidth + gap) * 5, behavior: "smooth" })
    }
    useEffect(() => {
        updateScrollButtons()
    }, [featuredProducts])

    useEffect(() => {
        const handleResize = () => updateScrollButtons()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    return (
        <main className="container mx-auto py-2 px-3">
            <img
                className="block w-[calc(100%+1.5rem)] max-w-none -mx-3"
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2026-01/Frame-1437256605-2-2.jpg"
                alt="Hero" />
            <h2 className="font-bold text-lg">Shop by category</h2>
            <section className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
                {categories.map((category, index) => (
                    <figure key={index}>
                        <img
                            className="w-full h-auto rounded-2xl"
                            src={category.image} 
                            alt={category.name}
                            width={140}
                            height={140}
                            loading="lazy" />
                        <figcaption className="mt-2 text-center">{category.name}</figcaption>
                    </figure>
                ))}
            </section>
            <section className="mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">Category 1 products</h2>
                    <div className="hidden md:flex gap-2">
                        {canScrollLeft && (
                            <button
                                type="button"
                                onClick={() => scrollCarousel(-1)}
                                className="h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                                aria-label="Scroll products left">
                                <span aria-hidden="true">&lt;</span>
                            </button>
                        )}
                        {canScrollRight && (
                            <button
                                type="button"
                                onClick={() => scrollCarousel(1)}
                                className="h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                                aria-label="Scroll products right">
                                <span aria-hidden="true">&gt;</span>
                            </button>
                        )}
                    </div>
                </div>
                <div
                    ref={carouselRef}
                    onScroll={updateScrollButtons}
                    className="mt-4 flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4">
                    {featuredProducts.map((product) => (
                        <Product key={product.id} className="min-w-45 sm:min-w-55" product={product} />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Home