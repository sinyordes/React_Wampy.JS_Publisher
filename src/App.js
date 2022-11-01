import logo from './logo.svg';
import './App.css';

import {Wampy} from 'wampy';
import w3cws from 'websocket';
import {JsonSerializer} from "wampy/dist/serializers/JsonSerializer";
import {useState} from "react";

export const baglan= new Wampy('ws://localhost:9000/test', {
  debug: true,
  realm: ('realm1'),
  serializer: new JsonSerializer(),
  wss: w3cws,
  onConnect: () => {
    console.log('Connected to router!');
    baglan.register('kulllanıcı2', {
      rpc: () => {
        return { argsList: 'hello' };
      },
      onSuccess: () => {
        console.log('Registered RPC!');
      }
    });
  },
  onError: (e) => {
    console.log('Error!', e);
  },
  onClose:()=>{
    console.log('See you next time!')
  },
  onEvent: function (data) {
    console.log(data);
  }
})
const gonder=()=>{
  baglan.publish('kanal1','metin')
}

function App() {




      return (
    <div className="App">

        <button onClick={()=>baglan.connect()}> Bağlan</button>
        <button onClick={()=>baglan.disconnect()}> Bağlantıyı Kes</button>
        <button onClick={()=>gonder()}> Gonder</button>
    </div>
  );
}

export default App;
