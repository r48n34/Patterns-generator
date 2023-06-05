import React, { useState } from 'react';
import { ScrollArea, Container, Grid,SegmentedControl, Group, Text } from '@mantine/core';
import { templateList } from '../../data/templateConfig';
import TemplateCard from '../template/TemplateCard';

import { IconLayoutGrid, IconLayoutRows } from '@tabler/icons-react';
import TemplateCardSmall from '../template/TemplateCardSmall';
import SearchBar from '../utilsComp/SearchBar';

function TemplatePage(){

    const [ searchStr, setSearchStr ] = useState<string>("");
    const [ displayMethod, setDisplayMethod ] = useState<'Big-display' | 'Small-display'>('Small-display');
    const displayList = templateList.filter( v => v.title.toLocaleLowerCase().includes( searchStr.toLocaleLowerCase() ));

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

            <SearchBar searchStr={searchStr} setSearchStr={setSearchStr} />
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
