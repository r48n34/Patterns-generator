import React from 'react';
import { ScrollArea, Container, Grid } from '@mantine/core';
import { templateList } from '../../data/templateConfig';
import TemplateCard from '../template/TemplateCard';

function TemplatePage(){

    return (
        <>
            {/* <LoadingOverlay visible={isLoading} overlayBlur={2} /> */}
            <ScrollArea h={"90vh"}>
            <Container>
            <Grid>
                {templateList.map( v =>
                    <Grid.Col span={12} key={v.title}>
                        <TemplateCard data={v}/>
                    </Grid.Col>
                )}
            </Grid>
            </Container>
            </ScrollArea>
        </>
    )
}
    
export default TemplatePage
