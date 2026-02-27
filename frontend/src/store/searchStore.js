import { create } from "zustand"

const getInitialSearchTerm = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get("search") || ""
}

const useSearchStore = create((set) => ({
    searchTerm: getInitialSearchTerm(),
    setSearchTerm: (term) => set({ searchTerm: term ?? "" }),
}))

export default useSearchStore