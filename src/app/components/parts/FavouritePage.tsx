import React, { useEffect } from 'react';
import { Container, ScrollArea, Grid, Group } from '@mantine/core';
import { useFavStore } from '../../store/favStore';
import TemplateCard from '../template/TemplateCard';
import DeleteAllFavBtn from '../utilsComp/DeleteAllFavBtn';

function FavouritePage(){

    const favList = useFavStore((state) => state.favList);

    useEffect( () => {
        console.log(favList);
    },[favList])

    return (
        <>

        <ScrollArea h={"90vh"}>
            <Container>

            <Group position="right" mb={12}>
                <DeleteAllFavBtn/>
            </Group>

            <Grid>
                {favList.map( v =>
                    <Grid.Col span={12} key={v.title}>
                        <TemplateCard data={v} showsDelete={true}/>
                    </Grid.Col>
                )}
            </Grid>
            </Container>
        </ScrollArea>
        </>
    )
}
    
export default FavouritePage
