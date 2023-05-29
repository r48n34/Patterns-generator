import { create } from 'zustand'
import { FavouritePattenConfig } from '../../plugin/settingUtils'

interface FavListState {
  favList: FavouritePattenConfig[]
  setArray: (data: FavouritePattenConfig[]) => void
}

export const useFavStore = create<FavListState>()(
    (set) => ({
        favList: [],
        setArray: (data) => set(() => ({ favList: data })),
        // setArray: (data) => set((state) => ({ favList: data })),
    }),
)