import { Button, Flex, Icon, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaSignature } from 'react-icons/fa';

import { InputMode } from '../../models';
import { BitLengthSelector } from '../BitLengthSelector/BitLengthSelector';
import styles from './Inputs.module.scss';

type Props = {
  inputMode: InputMode;
  setD: (value: string) => void;
  setR: (value: string) => void;
  setE: (value: string) => void;
  setSignature: (value: string) => void;
  setIsDataFetched: (value: boolean) => void;
};

function Inputs(props: Props) {
  const { inputMode, setD, setE, setR, setSignature, setIsDataFetched } = props;

  const [message, setMessage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<Blob | string>('');
  const [bitLength, setBitLength] = useState<string>('1024');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTextData = async () => {
    const res = await fetch(`http://localhost:8080/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message, bitLength: bitLength })
    });
    const { signature, d, r, e } = await res.json();

    setSignature(signature);
    setD(d);
    setE(e);
    setR(r);

    setIsDataFetched(true);
  };

  const fetchFileData = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('bitLength', bitLength);

    const res = await fetch(`http://localhost:8080/file`, {
      method: 'POST',
      body: formData
    });
    const { signature, d, r, e } = await res.json();

    setSignature(signature);
    setD(d);
    setE(e);
    setR(r);

    setIsDataFetched(true);
  };

  const handleCalculateClick = async () => {
    setIsLoading(true);
    if (inputMode === 'Keyboard') await fetchTextData();
    else await fetchFileData();
    setIsLoading(false);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Flex className={styles.wrapper} minH={240} justify='space-between' direction='column' align='center'>
      <BitLengthSelector bitLength={bitLength} setBitLength={setBitLength} />
      {inputMode === 'Keyboard' ? (
        <Textarea onChange={handleMessageChange} w={600} h={200} placeholder='Enter your message here...' />
      ) : (
        <div>
          <input onChange={handleFileChange} className='form-control form-control-lg' id='formFileLg' type='file' />
        </div>
      )}
      <Button isLoading={isLoading} onClick={handleCalculateClick} className={styles.calcBtn} size='lg' rightIcon={<Icon as={FaSignature} />} colorScheme='green' variant='solid'>
        Sign
      </Button>
    </Flex>
  );
}

export { Inputs };
