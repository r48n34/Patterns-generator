import { PattenConfig } from "../app/interface/shapesConfig";


const config = {
    favouriteList: "favouriteList"
}

export async function getFavouriteList(){
    const storeData: undefined | string = await figma.clientStorage.getAsync(config.favouriteList);
    console.log("storeData", storeData);
    let list:PattenConfig[] = !storeData ? [] : JSON.parse(storeData)

    return list
}

export async function setFavouriteList(list:PattenConfig[]){
    await figma.clientStorage.setAsync(config.favouriteList, JSON.stringify(list))
}

export async function clearFavouriteList(){
    await figma.clientStorage.setAsync(config.favouriteList, JSON.stringify([]))
}

export async function addNewFavourite(inputData: any){

    let data = inputData.data as PattenConfig
    console.log("ADD DATA", data);

    let list = await getFavouriteList();
    const isExist = list.findIndex( v => v.title === data.title ) >= 0

    if(isExist){
        return false
    }
    
    list.push(data);

    await setFavouriteList(list);

    console.log("list", list);
    return true
}

export async function removeFavourite(title: string){
    let list = await getFavouriteList();
    list = list.filter( v => v.title !== title );

    await setFavouriteList(list)
}