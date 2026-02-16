import { useEffect, useState } from "react"
import Carousel from "../containers/Carousel"
import Product from "../components/Product"

const Home = () => {
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://api.escuelajs.co/api/v1/categories")
            const categories = await res.json()

            const firstFive = categories.slice(0, 5)

            console.log(firstFive);
            
            setCategories([...firstFive, ...firstFive])
        }
        fetchData()        
    }, [])
    
    return (
        <main className="container mx-auto py-2 px-3">
            <img
                className="max-lg:hidden w-[calc(100%+1.5rem)] max-w-none -mx-3"
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2026-01/Frame-1437256605-2-2.jpg"
                alt="Stock up on daily essentials with Blinkit"
                width={2700}
                height={573}
            />
            <h2 className="lg:hidden font-bold text-lg">Shop by category</h2>
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
            <section className="flex flex-col gap-10 mt-10">
                {categories.slice(0, 5).map(({id, name}) => (
                    <Carousel
                        key={id}
                        id={id}
                        name={name}
                        render={(product) => <Product className="min-w-45 sm:min-w-55" key={product.id} product={product} />} />
                ))}
            </section>
        </main>
    )
}

export default Home