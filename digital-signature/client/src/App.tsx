import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { ModeSelector } from './components/ModeSelector/ModeSelector';
import styles from './App.module.scss';
import { InputMode } from './models';
import { Inputs } from './components/Inputs/Inputs';
import { DataOutput } from './components/DataOutput/DataOutput';
import { CheckSignature } from './components/CheckSignature/CheckSignature';

function App() {
  const [inputMode, setInputMode] = useState<InputMode>(null);
  const [isCheckMode, setIsCheckMode] = useState<boolean>(false);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const [d, setD] = useState<string>('');
  const [r, setR] = useState<string>('');
  const [e, setE] = useState<string>('');
  const [signature, setSignature] = useState<string>('');

  const updateInputMode = (mode: InputMode) => {
    setInputMode(mode);
  };

  return (
    <Flex className={styles.wrapper} bg='white' h='100%' direction='column'>
      <ModeSelector updateInputMode={updateInputMode} setIsCheckMode={setIsCheckMode} />
      {!isCheckMode && inputMode ? <Inputs inputMode={inputMode} setD={setD} setE={setE} setR={setR} setSignature={setSignature} setIsDataFetched={setIsDataFetched} /> : null}
      {isCheckMode ? <CheckSignature inputMode={inputMode} /> : null}
      {isDataFetched ? <DataOutput d={d} r={r} e={e} signature={signature} /> : null}
    </Flex>
  );
}

export default App;
