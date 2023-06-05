import React, { useEffect, useState } from 'react';
import { ScrollArea, Container, Grid, TextInput, SegmentedControl, Group, ActionIcon, Text } from '@mantine/core';
import { templateList } from '../../data/templateConfig';
import TemplateCard from '../template/TemplateCard';
import { PattenConfig } from '../../interface/shapesConfig';
import { IconLayoutGrid, IconLayoutRows, IconSearch, IconClearFormatting } from '@tabler/icons-react';
import TemplateCardSmall from '../template/TemplateCardSmall';

function TemplatePage(){

    const [ searchStr, setSearchStr ] = useState<string>("");
    const [ displayList, setDisplayList ] = useState<PattenConfig[]>(templateList);
    const [ displayMethod, setDisplayMethod ] = useState<'Big-display' | 'Small-display'>('Small-display');

    useEffect( () => {
        const newList = templateList.filter( v => v.title.toLocaleLowerCase().includes( searchStr.toLocaleLowerCase() ));
        setDisplayList(newList)
    },[searchStr])

    return (
        <>
            <Container>

            <Group position='right'>
                <SegmentedControl
                    value={displayMethod}
                    onChange={ (v:'Big-display' | 'Small-display') => setDisplayMethod(v)}
                    data={[
                        { label: (<IconLayoutGrid size="0.8rem"/>), value: 'Small-display' },
                        { label: (<IconLayoutRows size="0.8rem"/>), value: 'Big-display' },
                    ]}
                />
            </Group>

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

            { displayList.length === 0 && <Text ta="center" c="dimmed" mt={4}> Not found :( </Text> }

            </Container>
            
            <ScrollArea h={"90vh"}>
            <Container>
            <Grid grow>
                {displayList.map( v =>
                    displayMethod === "Big-display" 
                    ? ( <Grid.Col span={12} key={v.title}>
                            <TemplateCard data={v} showsDelete={false} showsEdit={false}/>
                        </Grid.Col>
                    )
                    :(
                        <Grid.Col span={6} key={v.title}>
                            <TemplateCardSmall data={v} showsDelete={false} showsEdit={false} showsDetails={false}/>
                        </Grid.Col>
                    )
                )}
            </Grid>
                
            </Container>
            </ScrollArea>
        </>
    )
}
    
export default TemplatePage
