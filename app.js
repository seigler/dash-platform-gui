import React, { useEffect, useRef, useState } from 'react';
import {
  App,
  Window,
  View,
  Text,
  Picker
} from 'proton-native';
import Dash from 'dash';

const mnemonic = '';

export default () => {
  const sdk = useRef();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    sdk.current = new Dash.SDK({
      network: 'testnet'
    });
    sdk.current.isReady().then(() => setReady(true));
    return () => sdk.current.disconnect();
  }, [mnemonic]);

  const [screen, setScreen] = useState('settings');

  return (
    <App>
      <Window style={{ height: 400, width: 800 }}>
        <View style={{ padding: 4 }}>
          <Picker SelectedValue={screen} onValueChange={setScreen}>
            <Picker.Item label='Settings' value='settings' />
            <Picker.Item label='Generate Mnemonic' value='newMnemonic' />
            <Picker.Item label='Generate Identity' value='newIdentity' />
          </Picker>
        </View>
        <View style={{ flex: 1, padding: 4 }}>
          {
            {
              settings: <Text>Settings</Text>,
              newMnemonic: <Text>New Mnemonic</Text>,
              newIdentity: <Text>New Identity</Text>,
              newName: <Text>New Name</Text>
            }[screen]
          }
        </View>
        <View style={{ flexDirection: 'row', padding: 4 }}>
          <Text>Status: {ready ? 'Ready' : 'Loading...'}</Text>
        </View>
      </Window>
    </App>
  );
};
