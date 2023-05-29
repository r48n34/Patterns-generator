import React from 'react';
import { ActionIcon, Button, Group, Modal, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { IconHeart } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import toast from 'react-hot-toast';
import { useFavStore } from '../../store/favStore';

interface formObject {
    title: string;
    description: string;
}

type AddFavouriteModalProps = {
    data: any;
}

function AddFavouriteModal({ data }: AddFavouriteModalProps){
    
    const [opened, { open, close }] = useDisclosure(false);
    const favList = useFavStore((state) => state.favList);
    const addItemFav = useFavStore((state) => state.addItem);

    const form = useForm<formObject>({
        initialValues: {
          title: '',
          description: "",
        },
    
        validate: {
            title: (value:string)  => ( 
                !value 
                ? 'Invalid title' 
                : favList.filter( v => v.title === value).length >= 1
                ? 'Title already exist'
                : null
            ),
            description: (value)  => (value ? null : 'Invalid description'),
        },
    });

    function addToFavourite(values: formObject){
        addItemFav({
            title: values.title,
            description: values.description,
            config: data
        });

        toast.success("Added to favourite.");
        close();
    }


    return (
      <>
        <Modal opened={opened} onClose={close} title="Add to favourite">
            <form onSubmit={form.onSubmit((values) => addToFavourite(values))}>
                <TextInput
                    withAsterisk
                    label="title"
                    placeholder="Some title"
                    {...form.getInputProps('title')}
                />
                
                <TextInput
                    mt={12}
                    withAsterisk
                    label="description"
                    placeholder="my great pattens"
                    {...form.getInputProps('description')}
                />

                <Group position='right' mt={18}>
                    <Button type="submit" variant="light">
                        Add
                    </Button>
                </Group>
            </form>
        </Modal>
  
        <Tooltip label="Add to favourite">
            <ActionIcon onClick={open}>
                <IconHeart size="1.125rem" />
            </ActionIcon>
        </Tooltip>
      </>
    );
}
    
export default AddFavouriteModal
