import { create } from "zustand";
import {
  PattenConfig,
  ShapesGenData,
} from "../interface/shapesConfig";
import { addFavList, clearFavList } from "../utils/callFigma";

interface FavListState {
  favList: PattenConfig[];
  setArray: (data: PattenConfig[]) => void;
  clearList: () => void;
  addItem: (
    data: { title: string; description: string; config: ShapesGenData },
  ) => void;
}

export const useFavStore = create<FavListState>()(
  (set) => ({
    favList: [],
    setArray: (data) => set(() => ({ favList: data })),
    clearList: async () => {
        clearFavList();
        set(() => ({ favList: [] }));
    },
    addItem: async (data) => {
        const finalData = { ...data, createDate: new Date() };
        addFavList(finalData);
        set((status) => ({ favList: [...status.favList, finalData] }));
    },
    // setArray: (data) => set((state) => ({ favList: data })),
  }),
);
