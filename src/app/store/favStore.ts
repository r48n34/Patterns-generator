import { create } from 'zustand'
import { FavouritePattenConfig, ShapesGenData } from '../interface/shapesConfig'

interface FavListState {
  favList: FavouritePattenConfig[]
  setArray: (data: FavouritePattenConfig[]) => void
  addItem: (data: { title: string, description: string, config: ShapesGenData }) => void
}

export const useFavStore = create<FavListState>()(
    (set) => ({
        favList: [],
        setArray: (data) => set(() => ({ favList: data })),
        addItem: async (_) => {
          // const response = await fetch(pond)
          // set({ fishies: await response.json() })
        },
        // setArray: (data) => set((state) => ({ favList: data })),
    }),
)