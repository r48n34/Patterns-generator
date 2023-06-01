import { create } from "zustand";
import { PattenConfig, ShapesGenData } from "../interface/shapesConfig";
import { addFavList, clearFavList, editFavListOneItem, removeFavListOneItem } from "../utils/callFigma";

interface FavListState {
  favList: PattenConfig[];
  setArray: (data: PattenConfig[]) => void;
  deleteItem: (title: string) => void;
  editItem: (title: string, newData: ShapesGenData) => void;
  clearList: () => void;
  addItem: (
    data: { title: string; description: string; config: ShapesGenData },
  ) => void;
}

export const useFavStore = create<FavListState>()(
  (set) => ({
    favList: [],
    setArray: (data) => set(() => ({ favList: data })),
    deleteItem: async (title) => {
        removeFavListOneItem(title);
        set((status) => ({ favList: status.favList.filter(v => v.title !== title) }));
    },
    editItem: async (title: string, newData: ShapesGenData) => {
        
        editFavListOneItem({ title, newData })

        set((status) => {
            let oldFavList = status.favList;
            let targetDataInd = oldFavList.findIndex( (v) => v.title === title);

            if(targetDataInd <= -1){
                return { favList: oldFavList }
            }

            oldFavList[targetDataInd].config = newData;
            return { favList: oldFavList }
        });
    },
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
