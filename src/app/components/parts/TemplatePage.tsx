import React from 'react';
import { ScrollArea, Container, Grid } from '@mantine/core';
import { templateList } from '../../data/templateConfig';
import TemplateCard from '../template/TemplateCard';

function TemplatePage(){

    return (
        <>
            <ScrollArea h={"90vh"}>
            <Container>
            <Grid>
                {templateList.map( v =>
                    <Grid.Col span={12} key={v.title}>
                        <TemplateCard data={v} showsDelete={false}/>
                    </Grid.Col>
                )}
            </Grid>
            </Container>
            </ScrollArea>
        </>
    )
}
    
export default TemplatePage
