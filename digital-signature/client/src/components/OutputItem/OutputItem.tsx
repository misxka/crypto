import { Box, Button, Flex, FormLabel, Input, useClipboard } from '@chakra-ui/react';

import styles from './OutputItem.module.scss';

type Props = {
  title: string;
  value: string;
};

export function OutputItem(props: Props) {
  const { value, title } = props;
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <Box className={styles.wrapper}>
      <FormLabel htmlFor={title}>{title}:</FormLabel>
      <Flex mb={2}>
        <Input id={title} value={value} isReadOnly />
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </Flex>
    </Box>
  );
}
