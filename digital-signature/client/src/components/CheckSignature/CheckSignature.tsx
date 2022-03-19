import { Button, Flex, FormLabel, Icon, Input, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { FaSignature } from 'react-icons/fa';
import { InputMode } from '../../models';
import { CheckAlert } from '../CheckAlert/CheckAlert';

import styles from './CheckSignature.module.scss';

type Props = {
  inputMode: InputMode;
};

export function CheckSignature(props: Props) {
  const { inputMode } = props;

  const [message, setMessage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<Blob | string>('');
  const [signature, setSignature] = useState<string>('');
  const [e, setE] = useState<string>('');
  const [r, setR] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTextCheck = async () => {
    const res = await fetch(`http://localhost:8080/text/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ e, r, signature, message })
    });
    setIsLoading(false);
    const { isValid } = await res.json();
    setIsValid(isValid);
    setIsFetched(true);
  };

  const fetchFileCheck = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('e', e);
    formData.append('r', r);
    formData.append('signature', signature);

    const res = await fetch(`http://localhost:8080/file/check`, {
      method: 'POST',
      body: formData
    });
    setIsLoading(false);
    const { isValid } = await res.json();
    setIsValid(isValid);
    setIsFetched(true);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
  const handleEChange = (e: React.ChangeEvent<HTMLInputElement>) => setE(e.target.value);
  const handleRChange = (e: React.ChangeEvent<HTMLInputElement>) => setR(e.target.value);
  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => setSignature(e.target.value);

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCalculateClick = async () => {
    setIsLoading(true);
    if (inputMode === 'Keyboard') await fetchTextCheck();
    else await fetchFileCheck();
  };

  return (
    <Flex className={styles.wrapper} direction='column' w={800} minH={240} justify='space-between' align='center'>
      <Input className={styles.field} onChange={handleEChange} placeholder='Enter e part of key here...' size='lg' w={600} />
      <Input className={styles.field} onChange={handleRChange} placeholder='Enter r part of key part here...' size='lg' w={600} />
      <Input className={styles.field} onChange={handleSignatureChange} placeholder='Enter signature here...' size='lg' w={600} />
      {inputMode === 'Keyboard' ? (
        <Textarea className={styles.field} onChange={handleMessageChange} w={600} h={200} placeholder='Enter your message here...' />
      ) : (
        <div>
          <input onChange={handleFileChange} className='form-control form-control-lg' id='formFileLg' type='file' />
        </div>
      )}
      <Button isLoading={isLoading} onClick={handleCalculateClick} className={styles.calcBtn} size='lg' rightIcon={<Icon as={FaSignature} />} colorScheme='green' variant='solid'>
        Check Signature
      </Button>

      {isFetched ? <CheckAlert isValid={isValid} /> : null}
    </Flex>
  );
}
