/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  NativeModules,
  View,
} from 'react-native';

const {LicenseListener, CopilotStartupMgr} = NativeModules;

function App(): JSX.Element {

  let startListener:EmitterSubscription;
  let stopListener:EmitterSubscription;

  useEffect(()=>{
    initCopilot()

    return () => {
      // unbind CoPilot
      try {
        CopilotStartupMgr.unbindCopilotService();
        console.log('dileep unbindCopilotService done');
      }
      catch(e) {
        console.log('dileep unbind failed with '+e);
      }

      startListener.remove()
      stopListener.remove()
    };
  },[])

  const initCopilot = async() => {

    // License activation
    try {
      await LicenseListener.setAMSLoginInfo("", "");
      console.log('dileep License activated');
    } catch (error) {
      console.error('dileep License activation failed', error);
    }

    // Start CoPilot
    try {
      await CopilotStartupMgr.bindCoPilotService();
      console.log('dileep bindCoPilotService done');
    } catch (error) {
      console.error('dileep bindCoPilotService failed', error);
    }

    startListener = DeviceEventEmitter.addListener('onCPStartup', ()=>{
      console.log("dileep onCPStartup got called")
    });

    stopListener = DeviceEventEmitter.addListener('onCPShutdown', ()=>{
      console.log("dileep onCPShutdown got called")
    });

  }

  return (
      <View style={{backgroundColor: "green", flex: 1}}></View>
  );
}


export default App;
