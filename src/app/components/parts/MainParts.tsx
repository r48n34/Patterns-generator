import { NumberInput, Button, Text, Container } from '@mantine/core';
import React from 'react';
import toast from 'react-hot-toast';

function MainParts() {

    const [ addCount, setAddCount ] = React.useState<number>(4);

    const onCreate = () => {
        parent.postMessage({ pluginMessage: { type: 'create-rectangles', count: addCount } }, '*');
    };

    const createImg = () => {
        parent.postMessage({ pluginMessage: { type: 'create-img' } }, '*');
    };

    // const onCancel = () => {
    //     parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
    // };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, message } = event.data.pluginMessage;

            console.log(message);

            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <Container>
            <Text>Rectangle Creator</Text>

            <NumberInput
                value={addCount}
                onChange={(v) => setAddCount(+v)}
                placeholder="Your age"
                label="Your age"
                withAsterisk
            />

            <Button id="create" onClick={() => toast("Hello World")}>
                Hello
            </Button>



            <Button id="create" onClick={() => onCreate()}>
                Create shapes lines
            </Button>

            <Button id="createImg" onClick={() => createImg()}>
                Create img
            </Button>

            {/* <Button onClick={onCancel}>Cancel</Button> */}
        </Container>
    )
}

export default MainParts
