import React from 'react';
import { Container, ScrollArea, Grid, Button } from '@mantine/core';
import TemplateCard from '../template/TemplateCard';
import { getFavList } from '../../utils/callFigma';
import { useFavStore } from '../../store/favStore';

function FavouritePage(){

    const favList = useFavStore((state) => state.favList)

    return (
        <>
        <ScrollArea h={"90vh"}>
            <Button onClick={ () => getFavList()}> dfds</Button>
            <Container>
            <Grid>
                {favList.map( v =>
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
    
export default FavouritePage
