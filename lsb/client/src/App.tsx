import { Alert, AlertIcon, Button, Flex, Image, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

import styles from './App.module.css';

function App() {
  const [selectedFile, setSelectedFile] = useState<Blob | string>('');
  const [isHideLoading, setIsHideLoading] = useState<boolean>(false);
  const [isRetrieveLoading, setIsRetrieveLoading] = useState<boolean>(false);
  const [isImageFetched, setIsImageFetched] = useState<boolean>(false);
  const [isMessageFetched, setIsMessageFetched] = useState<boolean>(false);
  const [receivedImg, setReceivedImg] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [retrievedMessage, setRetrievedMessage] = useState<string>('');

  const fetchHideMessage = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('message', message);

    const res = await fetch(`http://localhost:8080/hide`, {
      method: 'POST',
      body: formData
    });
    setIsHideLoading(false);

    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setReceivedImg(imageObjectURL);

    setIsMessageFetched(false);
    setIsImageFetched(true);
  };

  const fetchRetrieveMessage = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    const res = await fetch(`http://localhost:8080/retrieve`, {
      method: 'POST',
      body: formData
    });
    const msg = (await res.json()).message;
    setRetrievedMessage(msg);

    setIsRetrieveLoading(false);
    setIsMessageFetched(true);
    setIsImageFetched(false);
  };

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleHideClick = async () => {
    setIsHideLoading(true);
    await fetchHideMessage();
  };

  const handleRetrieveClick = async () => {
    setIsRetrieveLoading(true);
    await fetchRetrieveMessage();
  };

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  return (
    <Flex direction='column' justify='flex-start' align='center' className={styles.app}>
      <div>
        <input onChange={handleFileChange} accept='image/jpg' className='form-control form-control-lg' id='formFileLg' type='file' />
      </div>

      <Input className={styles.withMargin} onChange={handleMessageChange} maxW={600} placeholder='Message to be hidden...' />

      <Flex w={600} justify='space-around'>
        <Button className={styles.withMargin} isLoading={isHideLoading} onClick={handleHideClick} size='lg' colorScheme='green' variant='solid'>
          Hide message
        </Button>
        <Button className={styles.withMargin} isLoading={isRetrieveLoading} onClick={handleRetrieveClick} size='lg' colorScheme='green' variant='solid'>
          Retrieve message
        </Button>
      </Flex>

      {isImageFetched ? <Image className={styles.withMargin} maxHeight='600px' src={receivedImg} /> : null}
      {isMessageFetched ? (
        <Alert maxW={600} className={styles.withMargin} status='success' variant='left-accent' color='blackAlpha.800'>
          <AlertIcon />
          Message: {retrievedMessage}
        </Alert>
      ) : null}
    </Flex>
  );
}

export default App;
