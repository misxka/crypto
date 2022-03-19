import { Flex, FormLabel, Radio, RadioGroup, Stack } from '@chakra-ui/react';

import styles from './BitLengthSelector.module.scss';

type Props = {
  bitLength: string;
  setBitLength: (bitLength: string) => void;
};

export function BitLengthSelector(props: Props) {
  const { bitLength, setBitLength } = props;

  return (
    <Flex className={styles.wrapper} direction='column' w={400}>
      <FormLabel className={styles.legend} as='legend'>
        Choose key bit length
      </FormLabel>
      <RadioGroup onChange={setBitLength} value={bitLength}>
        <Stack direction='row' spacing='40px'>
          <Radio value='256' size='lg'>
            256
          </Radio>
          <Radio value='512' size='lg'>
            512
          </Radio>
          <Radio value='1024' size='lg'>
            1024
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
}
