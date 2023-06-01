import React from "react";
import { ActionIcon, Menu, Modal, JsonInput, Tooltip} from "@mantine/core";
import { IconFileDots, IconTrash, IconDots, IconEdit } from "@tabler/icons-react";
import { PattenConfig } from "../../interface/shapesConfig";
import { useFavStore } from "../../store/favStore";

import { useDisclosure } from '@mantine/hooks';
import toast from "react-hot-toast";
import GenPatternsForm from "../utilsComp/GenPatternsForm";
type TemplateMenuProps = {
    data: PattenConfig;
    showsDelete: boolean
    showsEdit: boolean
}

function TemplateMenu({ data, showsDelete, showsEdit }: TemplateMenuProps) {

    const [openedDetails, { open: openDetails, close: closeDetails }] = useDisclosure(false);
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const deleteItemFav = useFavStore((state) => state.deleteItem);

    function deleteOneItems(){
        deleteItemFav(data.title)
        toast.success("Deleted item");
    }

    return (
        <>
        <Modal opened={openedDetails} onClose={closeDetails} title="View Data">
            <JsonInput disabled value={JSON.stringify(data.config, null, " ")} minRows={12}/>
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

                {showsDelete && 
                    <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={ () => deleteOneItems()}>
                        Delete
                    </Menu.Item>
                }

            </Menu.Dropdown>

        </Menu>
        </>
    )
}

export default TemplateMenu
