import { FavouritePattenConfig } from "../app/interface/shapesConfig";


const config = {
    favouriteList: "favouriteList"
}

export async function getFavouriteList(){
    const storeData: undefined | string = await figma.clientStorage.getAsync(config.favouriteList);
    let list:FavouritePattenConfig[] = !storeData ? [] : JSON.parse(storeData)

    return list
}

export async function setFavouriteList(list:FavouritePattenConfig[]){
    await figma.clientStorage.setAsync(config.favouriteList, JSON.stringify(list))
}

export async function addNewFavourite(data: FavouritePattenConfig){

    let list = await getFavouriteList();

    const isExist = list.findIndex( v => v.title === data.title ) >= 0

    if(isExist){
        return false
    }
    
    list.push(data);

    await setFavouriteList(list)
    return true
}

export async function removeFavourite(title: string){
    let list = await getFavouriteList();
    list = list.filter( v => v.title !== title );

    await setFavouriteList(list)
}