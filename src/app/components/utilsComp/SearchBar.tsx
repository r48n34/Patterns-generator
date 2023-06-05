import React from "react";
import { TextInput, ActionIcon, Tooltip } from "@mantine/core";
import { IconSearch, IconClearFormatting } from "@tabler/icons-react";

type SearchBarProps = {
    searchStr: string;
    setSearchStr: Function;
}

function SearchBar({ searchStr, setSearchStr }: SearchBarProps){
    return (
        <TextInput
            placeholder="Search text"
            value={searchStr}
            icon={<IconSearch size="0.8rem" />}
            onChange={(event) => setSearchStr(event.currentTarget.value)}
            mt={8}
            mb={16}
            rightSection={
                <Tooltip label="Clear search">
                <ActionIcon onClick={() => setSearchStr("")}>
                    <IconClearFormatting size="1rem" />
                </ActionIcon>
                </Tooltip>
            }
        />
    )
}
    
export default SearchBar
