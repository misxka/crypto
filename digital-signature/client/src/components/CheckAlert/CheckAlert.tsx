import { Alert, AlertIcon } from '@chakra-ui/react';

import styles from './CheckAlert.module.scss';

type Props = {
  isValid: boolean;
};

export function CheckAlert(props: Props) {
  const { isValid } = props;

  if (isValid) {
    return (
      <Alert className={styles.wrapper} status='success' variant='left-accent'>
        <AlertIcon />
        Signature is valid!
      </Alert>
    );
  }

  return (
    <Alert className={styles.wrapper} status='error' variant='left-accent'>
      <AlertIcon />
      Signature is not valid!
    </Alert>
  );
}
