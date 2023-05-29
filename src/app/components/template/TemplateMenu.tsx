import React from "react";
import { ActionIcon, Menu } from "@mantine/core";
import { IconPhoto, IconTrash, IconDots } from "@tabler/icons-react";
import { PattenConfig } from "../../interface/shapesConfig";

type TemplateMenuProps = {
    data: PattenConfig;
    showsDelete: boolean
}

function TemplateMenu({ data, showsDelete }: TemplateMenuProps) {

    console.log(data);
    
    return (
        <Menu shadow="md" width={200} zIndex={99999}>
            <Menu.Target>
                <ActionIcon>
                    <IconDots size="1.125rem" />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>

                {showsDelete && <Menu.Item icon={<IconTrash size={14} />}>Delete</Menu.Item>}
                <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>

            </Menu.Dropdown>

        </Menu>
    )
}

export default TemplateMenu
