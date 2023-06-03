import React from 'react';
import { Container, ScrollArea, Grid, Group } from '@mantine/core';
import { useFavStore } from '../../store/favStore';
import TemplateCard from '../template/TemplateCard';
import DeleteAllFavBtn from '../utilsComp/DeleteAllFavBtn';
import EmptyCard from '../template/EmptyCard';

function FavouritePage(){

    const favList = useFavStore((state) => state.favList);

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
                        <TemplateCard data={v} showsDelete={true} showsEdit={true}/>
                    </Grid.Col>
                )}
            </Grid>

            { favList.length === 0 && 
                <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems:"center"}}>
                    <EmptyCard/>
                </div>
            }
            </Container>
        </ScrollArea>
        </>
    )
}
    
export default FavouritePage
