import { Button, Flex, Heading, Icon, Stack } from '@chakra-ui/react';
import { FaFileAlt, FaKeyboard, FaSpellCheck, FaFileSignature } from 'react-icons/fa';
import { InputMode } from '../../models';

type Props = {
  updateInputMode: (mode: InputMode) => void;
  setIsCheckMode: (value: boolean) => void;
};

function ModeSelector(props: Props) {
  const { updateInputMode, setIsCheckMode } = props;

  return (
    <Flex minH={130} justifySelf='flex-start' justify='space-between' direction='column' align='center'>
      <Heading as='h1' size='2xl'>
        Choose action:
      </Heading>
      <Stack direction='row' spacing={4}>
        <Button
          onClick={() => {
            updateInputMode('Keyboard');
            setIsCheckMode(false);
          }}
          size='lg'
          rightIcon={<Icon as={FaKeyboard} />}
          colorScheme='linkedin'
          variant='outline'
        >
          Enter text
        </Button>
        <Button
          onClick={() => {
            updateInputMode('File');
            setIsCheckMode(false);
          }}
          size='lg'
          rightIcon={<Icon as={FaFileAlt} />}
          colorScheme='linkedin'
          variant='outline'
        >
          Data from file
        </Button>
        <Button
          onClick={() => {
            updateInputMode('Keyboard');
            setIsCheckMode(true);
          }}
          size='lg'
          rightIcon={<Icon as={FaSpellCheck} />}
          colorScheme='green'
          variant='outline'
        >
          Check text signature
        </Button>
        <Button
          onClick={() => {
            updateInputMode('File');
            setIsCheckMode(true);
          }}
          size='lg'
          rightIcon={<Icon as={FaFileSignature} />}
          colorScheme='green'
          variant='outline'
        >
          Check file signature
        </Button>
      </Stack>
    </Flex>
  );
}

export { ModeSelector };
