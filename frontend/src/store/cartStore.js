import { create } from "zustand"

const useCartStore = create((set) => ({
    items: {},
    addItem: (product) =>
        set((state) => {
            const currentEntry = state.items[product.id]
            const currentQty = currentEntry?.quantity || 0

            return {
                items: {
                    ...state.items,
                    [product.id]: {
                        product,
                        quantity: currentQty + 1,
                    },
                },
            }
        }),
    removeItem: (productId) =>
        set((state) => {
            const currentQty = state.items[productId]?.quantity || 0
            if (currentQty <= 1) {
                const { [productId]: _removed, ...rest } = state.items
                return { items: rest }
            }

            return {
                items: {
                    ...state.items,
                    [productId]: {
                        ...state.items[productId],
                        quantity: currentQty - 1,
                    },
                },
            }
        }),
    clearCart: () => set({ items: {} }),
}))

export default useCartStore