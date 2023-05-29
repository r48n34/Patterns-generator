import { Text, Tooltip, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { useFavStore } from "../../store/favStore";
import { modals } from "@mantine/modals";

function DeleteAllFavBtn() {

    const clearItemFav = useFavStore((state) => state.clearList);

    const openDeleteAllModal = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        children: (
            <Text size="sm">
                This action is so important that you are required to confirm it with a modal. Please click
                Confirm to proceed.
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log(),
        onConfirm: () => clearItemFav(),
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
