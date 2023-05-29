import { Text, Tooltip, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { useFavStore } from "../../store/favStore";
import { modals } from "@mantine/modals";
import { toast } from "react-hot-toast";

function DeleteAllFavBtn() {

    const clearItemFav = useFavStore((state) => state.clearList);

    const openDeleteAllModal = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        children: (
            <Text size="sm">
                Are you sure to delete all the favourite items?
            </Text>
        ),
        labels: { confirm: 'Yes', cancel: 'No' },
        onCancel: () => console.log(),
        onConfirm: () => {
            clearItemFav();
            toast.success("Deleted all items");
        },
    });

    return (
        <>
            <Tooltip label="Delete all Favourite">
                <ActionIcon onClick={() => openDeleteAllModal()}>
                    <IconTrash size="1.125rem" />
                </ActionIcon>
            </Tooltip>
        </>
    )
}

export default DeleteAllFavBtn
