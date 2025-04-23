import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useBookStore = create(
  persist(
    (set) => ({
      hasHydrated: false,
      setHasHydrated: () => set({ hasHydrated: true }),

      idCategory: null,
      idSubCate: null,
      category: '',
      subcategories: [],
      books: [],

      setIdCategory: (id) => set({ idCategory: id }),
      setIdSubCate: (id) => set({ idSubCate: id }),
      setCategory: (name) => set({ category: name }),
      setSubcategories: (list) => set({ subcategories: list }),
      setBooks: (books) => set({ books })
    }),
    {
      name: 'book-storage',
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated()
      }
    }
  )
)

export default useBookStore
