import React from "react";
import toast from "react-hot-toast";

import { modals } from "@mantine/modals";
import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, Menu, Modal, Tooltip, Text, JsonInput, Group  } from "@mantine/core";
import { IconFileDots, IconTrash, IconDots, IconEdit, IconCopy, IconFileExport } from "@tabler/icons-react";

import { useFavStore } from "../../store/favStore";
import { PattenConfig } from "../../interface/shapesConfig";
import GenPatternsForm from "../utilsComp/GenPatternsForm";
import { toCopyBoard } from "../../utils/copyItems";

type TemplateMenuProps = {
    data: PattenConfig;
    showsDelete: boolean
    showsEdit: boolean
    showsExport: boolean
}

function TemplateMenu({ data, showsDelete, showsEdit, showsExport }:TemplateMenuProps) {

    const [openedDetails, { open: openDetails, close: closeDetails }] = useDisclosure(false);
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [openedExport, { open: openExport, close: closeExport }] = useDisclosure(false);

    const deleteItemFav = useFavStore((state) => state.deleteItem);

    function deleteOneItems(){
        deleteItemFav(data.title)
        toast.success("Deleted item");
    }

    const deleteOneItemModal = () => modals.openConfirmModal({
        title: 'Delete items',
        children: (
          <Text size="sm">
            Are you sure to delete {data.title}?
          </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => {},
        onConfirm: () => deleteOneItems(),
    });

    return (
        <>
        <Modal opened={openedDetails} onClose={closeDetails} title="View Data">
            <GenPatternsForm 
                mode={"view"} 
                data={data.config}
                title={data.title} 
            />
        </Modal>

        <Modal 
            opened={openedExport} 
            onClose={closeExport} 
            title={
            <>
            <Group position="left">
                <Text>Export Data</Text>

                <Tooltip label={"Copy to Board"}>
                <ActionIcon onClick={() => toCopyBoard(JSON.stringify(data.config, null, " "))}>
                    <IconCopy size="1.125rem" /> 
                </ActionIcon>
                </Tooltip>
            </Group>
            </>
            }
        >  
            <JsonInput value={JSON.stringify(data.config, null, " ")} minRows={16}/>
        </Modal>
        
        <Modal opened={openedEdit} onClose={closeEdit} title="Edit Data">
            <GenPatternsForm 
                mode={"edit"} 
                data={data.config}
                title={data.title} 
                closeFunc={ () => {
                    closeEdit();
                }}
            />
        </Modal>

        <Menu shadow="md" width={200} zIndex={9999}>
            <Menu.Target>
                <Tooltip label="More">
                <ActionIcon>
                    <IconDots size="1.125rem" />
                </ActionIcon>
                </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>

                <Menu.Item icon={<IconFileDots size={14} />} onClick={openDetails}>
                    View Details
                </Menu.Item>

                {showsEdit && 
                    <Menu.Item icon={<IconEdit size={14} />} onClick={openEdit}>
                        Edit Shapes
                    </Menu.Item>
                }

                {showsExport && 
                    <Menu.Item icon={<IconFileExport size={14} />} onClick={openExport}>
                        Export Shapes
                    </Menu.Item>
                }

                {showsDelete && 
                    <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={ () => deleteOneItemModal()}>
                        Delete
                    </Menu.Item>
                }

            </Menu.Dropdown>

        </Menu>
        </>
    )
}

export default TemplateMenu
