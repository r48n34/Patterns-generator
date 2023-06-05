import React, { useState } from 'react';
import { Container, ScrollArea, Grid, Group, SegmentedControl, TextInput, ActionIcon, Text } from '@mantine/core';
import { useFavStore } from '../../store/favStore';
import TemplateCard from '../template/TemplateCard';
import DeleteAllFavBtn from '../utilsComp/DeleteAllFavBtn';
import EmptyCard from '../template/EmptyCard';
import { IconClearFormatting, IconLayoutGrid, IconLayoutRows, IconSearch } from '@tabler/icons-react';
// import { PattenConfig } from '../../interface/shapesConfig';
import TemplateCardSmall from '../template/TemplateCardSmall';

function FavouritePage() {

    const [ searchStr, setSearchStr ] = useState<string>("");
    const [ displayMethod, setDisplayMethod ] = useState<'Big-display' | 'Small-display'>('Small-display');

    const _ = useFavStore((state) => state.globalToggle);
    const favList = useFavStore((state) => state.favList);

    const favListDisplay = favList.filter( v => v.title.toLocaleLowerCase().includes( searchStr.toLocaleLowerCase() ));

    return (
        <>
            <Container>
                <Group position='apart'>
                    <DeleteAllFavBtn />

                    <SegmentedControl
                        value={displayMethod}
                        onChange={(v: 'Big-display' | 'Small-display') => setDisplayMethod(v)}
                        data={[
                            { label: (<IconLayoutGrid size="0.8rem" />), value: 'Small-display' },
                            { label: (<IconLayoutRows size="0.8rem" />), value: 'Big-display' },
                        ]}
                    />
                </Group>
                { _ }
                <TextInput
                    // label="Search" 
                    placeholder="Search text"
                    value={searchStr}
                    icon={<IconSearch size="0.8rem" />}
                    onChange={(event) => setSearchStr(event.currentTarget.value)}
                    mt={8}
                    mb={16}
                    rightSection={
                        <ActionIcon onClick={() => setSearchStr("")}>
                            <IconClearFormatting size="1rem" />
                        </ActionIcon>
                    }
                />

                { favListDisplay.length === 0 && <Text ta="center" c="dimmed" mt={4}> Not found :( </Text> }

            </Container>
            
            <ScrollArea h={"90vh"}>
                <Container>

                    <Grid>
                        {favListDisplay.map( v =>
                                displayMethod === "Big-display" 
                                ? ( <Grid.Col span={12} key={v.title}>
                                        <TemplateCard data={v} showsDelete={true} showsEdit={true}/>
                                    </Grid.Col>
                                )
                                :(
                                    <Grid.Col span={6} key={v.title}>
                                        <TemplateCardSmall data={v} showsDelete={true} showsEdit={true} showsDetails={false}/>
                                    </Grid.Col>
                                )
                            )
                        }
                    </Grid>

                    {favList.length === 0 &&
                        <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <EmptyCard />
                        </div>
                    }
                </Container>
            </ScrollArea>
        </>
    )
}

export default FavouritePage
