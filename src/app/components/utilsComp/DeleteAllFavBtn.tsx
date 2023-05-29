import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { useFavStore } from "../../store/favStore";

function DeleteAllFavBtn(){

    const clearItemFav = useFavStore((state) => state.clearList);

    return (
        <>
        <ActionIcon onClick={() => clearItemFav()}>
                <IconTrash size="1.125rem" />
        </ActionIcon>
        </>
    )
}
    
export default DeleteAllFavBtn
