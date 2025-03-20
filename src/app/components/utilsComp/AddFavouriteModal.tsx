import React from 'react';
import { ActionIcon, Button, Group, Modal, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { IconHeart, IconSend } from '@tabler/icons-react';
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
                : value.length >= 120
                ? 'Title too long'
                : null
            ),
            description: (value)  => (
                !value 
                ? 'Invalid description'
                : value.length >= 255
                ? 'Description too long'
                : null
            ),
        },
    });

    function addToFavourite(values: formObject){
        addItemFav({
            title: values.title,
            description: values.description,
            config: data
        });

        toast.success("Added to favourite");
        form.reset();
        close();
    }

    return (
      <>
        <Modal opened={opened} onClose={close} title="Add to favourite">
            <form onSubmit={form.onSubmit((values) => addToFavourite(values))}>
                <TextInput
                    withAsterisk
                    label="Title"
                    description="Name your current pattern"
                    placeholder="Some title"
                    {...form.getInputProps('title')}
                />
                
                <TextInput
                    mt={12}
                    withAsterisk
                    label="Description"
                    description="What is your pattern aims for"
                    placeholder="my great pattens"
                    {...form.getInputProps('description')}
                />

                <Group position='right' mt={18}>
                    <Button 
                        disabled={form.values.title === "" || form.values.description === ""}
                        type="submit" 
                        variant="light"
                        leftIcon={<IconSend size={14}/>}
                    >
                        Add
                    </Button>
                </Group>
            </form>
        </Modal>
  
        <Tooltip label="Add current setting to favourite">
            <ActionIcon size="lg" onClick={open} color="red" variant="light">
                <IconHeart size="1.2rem" />
            </ActionIcon>
        </Tooltip>
      </>
    );
}
    
export default AddFavouriteModal
