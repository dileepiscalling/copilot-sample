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
  let loginListener:EmitterSubscription;

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
      loginListener.remove()
    };
  },[])

  const initCopilot = async() => {

    startListener = DeviceEventEmitter.addListener('onCPStartup', ()=>{
      console.log("dileep onCPStartup got called")
    });

    stopListener = DeviceEventEmitter.addListener('onCPShutdown', ()=>{
      console.log("dileep onCPShutdown got called")
    });

    loginListener = DeviceEventEmitter.addListener('onLicenseMgtLogin', ()=>{
      console.log("dileep onLicenseMgtLogin got called")
    });

    // License activation
    try {
      await LicenseListener.setAMSLoginInfo("10092", "iSFUMBA");
      console.log('dileep License activated');
    } catch (error) {
      console.error('dileep License activation failed', error);
    }


    setTimeout(() => {
    // Start CoPilot
      try {
        CopilotStartupMgr.bindCoPilotService();
        console.log('dileep bindCoPilotService done');
      } catch (error) {
        console.error('dileep bindCoPilotService failed', error);
      }
    }, 7000); // app crashes even if the timeout is set as 10 secs
  }

  return (
      <View style={{backgroundColor: "green", flex: 1}}></View>
  );
}


export default App;
