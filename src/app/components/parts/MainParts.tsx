import { NumberInput, Button, Text } from '@mantine/core';
import React from 'react';

function MainParts() {

    const [ addCount, setAddCount ] = React.useState<number>(0);

    const onCreate = () => {
        parent.postMessage({ pluginMessage: { type: 'create-rectangles', count: addCount } }, '*');
    };

    const createImg = () => {
        parent.postMessage({ pluginMessage: { type: 'create-img' } }, '*');
    };

    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
    };

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
        <>
            <Text>Rectangle Creator</Text>

            <NumberInput
                value={addCount}
                onChange={(v) => setAddCount(+v)}
                placeholder="Your age"
                label="Your age"
                withAsterisk
            />

            <Button id="create" onClick={onCreate}>
                Create shapes
            </Button>

            <Button id="createImg" onClick={() => createImg()}>
                Create img
            </Button>

            <Button onClick={onCancel}>Cancel</Button>
        </>
    )
}

export default MainParts
