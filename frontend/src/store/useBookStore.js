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
      sortBy: 'oldest',
      itemsPerPage: 12,
      totalRecords: 0,

      setIdCategory: (id) => set({ idCategory: id }),
      setIdSubCate: (id) => set({ idSubCate: id }),
      setCategory: (name) => set({ category: name }),
      setSubcategories: (list) => set({ subcategories: list }),
      setBooks: (books) => set({ books }),
      setSortBy: (sort) => set({ sortBy: sort }),
      setItemsPerPage: (items) => set({ itemsPerPage: items }),
      setTotalRecords: (total) => set({ totalRecords: total })
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
