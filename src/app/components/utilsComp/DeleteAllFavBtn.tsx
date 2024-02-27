import React from "react";

import { modals } from "@mantine/modals";
import { Text, Tooltip, ActionIcon } from "@mantine/core";

import { toast } from "react-hot-toast";
import { IconTrash } from "@tabler/icons-react";
import { useFavStore } from "../../store/favStore";

function DeleteAllFavBtn() {

    const clearItemFav = useFavStore((state) => state.clearList);

    const openDeleteAllModal = () => modals.openConfirmModal({
        title: 'Delete all favourite items',
        children: (
            <Text size="sm">
                ⚠ Warning: Are you sure to delete all the favourite items?
            </Text>
        ),
        labels: { confirm: 'Yes', cancel: 'No' },
        onCancel: () => {},
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
