import { Flex } from '@chakra-ui/react';
import { OutputItem } from '../OutputItem/OutputItem';

import styles from './DataOutput.module.scss';

type Props = {
  d: string;
  r: string;
  e: string;
  signature: string;
};

export function DataOutput(props: Props) {
  const { d, r, e, signature } = props;

  return (
    <Flex className={styles.wrapper} direction='column' w={800}>
      <OutputItem title={'Signature'} value={signature} />
      <OutputItem title={'r'} value={r} />
      <OutputItem title={'e'} value={e} />
      <OutputItem title={'d'} value={d} />
    </Flex>
  );
}
