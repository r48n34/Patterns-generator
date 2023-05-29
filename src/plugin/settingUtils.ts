import { ShapesGenData } from "../app/interface/shapesConfig";

export interface FavouritePattenConfig {
    title: string
    createDate: Date
    data: ShapesGenData
}

const config = {
    favouriteList: "favouriteList"
}

async function getFavouriteList(){
    const storeData: undefined | string = await figma.clientStorage.getAsync(config.favouriteList);
    let list:FavouritePattenConfig[] = !storeData ? [] : JSON.parse(storeData)

    return list
}

async function setFavouriteList(list:FavouritePattenConfig[]){
    await figma.clientStorage.setAsync(config.favouriteList, JSON.stringify(list))
}

export async function addNewFavourite(title: string, data: ShapesGenData){

    let list = await getFavouriteList();

    const isExist = list.findIndex( v => v.title === title ) >= 0

    if(isExist){
        return false
    }
    
    list.push({
        title,
        createDate: new Date,
        data
    })

    await setFavouriteList(list)
    return true
}

export async function removeFavourite(title: string){
    let list = await getFavouriteList();
    list = list.filter( v => v.title !== title );

    await setFavouriteList(list)
}