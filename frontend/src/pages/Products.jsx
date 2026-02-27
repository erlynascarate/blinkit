import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Product from "../components/Product";
import useSearchStore from "../store/searchStore";

const Products = () => {
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const { searchTerm } = useSearchStore()

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.escuelajs.co/api/v1/products?title=${searchTerm}`)
            const products = await res.json()

            setProducts(products)
        }
        fetchData()        
    }, [searchTerm])

    useEffect(() => {
        const current = searchParams.get("search") ?? ""
        if (current === searchTerm) return

        const nextParams = new URLSearchParams(searchParams)
        if (searchTerm) nextParams.set("search", searchTerm)
        else nextParams.delete("search")

        setSearchParams(nextParams)
    }, [searchTerm, searchParams, setSearchParams])

    return (
        <main className="container mx-auto py-3 px-3">
            <h2 className="mb-4 font-bold">
                {searchTerm ? `Showing results for "${searchTerm}"` : "Showing all Products"}
            </h2>
            <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </section>
        </main>
    );
}

export default Products