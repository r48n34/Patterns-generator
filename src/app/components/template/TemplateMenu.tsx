import React from "react";
import { ActionIcon, Menu, Modal, JsonInput, Tooltip} from "@mantine/core";
import { IconFileDots, IconTrash, IconDots } from "@tabler/icons-react";
import { PattenConfig } from "../../interface/shapesConfig";
import { useFavStore } from "../../store/favStore";

import { useDisclosure } from '@mantine/hooks';
import toast from "react-hot-toast";
type TemplateMenuProps = {
    data: PattenConfig;
    showsDelete: boolean
}

function TemplateMenu({ data, showsDelete }: TemplateMenuProps) {

    const [opened, { open, close }] = useDisclosure(false);
    const deleteItemFav = useFavStore((state) => state.deleteItem);

    function deleteOneItems(){
        deleteItemFav(data.title)
        toast.success("Deleted item");
    }

    return (
        <>
        <Modal opened={opened} onClose={close} title="Data">
            <JsonInput disabled value={JSON.stringify(data.config, null, " ")} minRows={12}/>
        </Modal>

        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Tooltip label="More">
                <ActionIcon>
                    <IconDots size="1.125rem" />
                </ActionIcon>
                </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>

                <Menu.Item icon={<IconFileDots size={14} />} onClick={open}>
                    View Details
                </Menu.Item>

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
