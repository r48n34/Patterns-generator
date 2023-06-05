import React, { useEffect, useState } from 'react';
import { ScrollArea, Container, Grid, TextInput } from '@mantine/core';
import { templateList } from '../../data/templateConfig';
import TemplateCard from '../template/TemplateCard';
import { PattenConfig } from '../../interface/shapesConfig';
import { IconSearch } from '@tabler/icons-react';

function TemplatePage(){

    const [ searchStr, setSearchStr ] = useState<string>("");
    const [ displayList, setDisplayList ] = useState<PattenConfig[]>(templateList);

    useEffect( () => {
        const newList = templateList.filter( v => v.title.toLocaleLowerCase().includes( searchStr.toLocaleLowerCase() ));
        setDisplayList(newList)
    },[searchStr])

    return (
        <>
            <Container>

            <TextInput
                // label="Search" 
                placeholder="Search text"
                value={searchStr}
                icon={<IconSearch size="0.8rem" />}
                onChange={(event) => setSearchStr(event.currentTarget.value)}
                mt={8}
                mb={16}
            />

            </Container>
            
            <ScrollArea h={"90vh"}>
            <Container>
            <Grid>
                {displayList.map( v =>
                    <Grid.Col span={12} key={v.title}>
                        <TemplateCard data={v} showsDelete={false} showsEdit={false}/>
                    </Grid.Col>
                )}
            </Grid>
            </Container>
            </ScrollArea>
        </>
    )
}
    
export default TemplatePage
