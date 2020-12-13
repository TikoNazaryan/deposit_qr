import './App.css';
import {useRef, useState, useEffect} from 'react';
var QRCode = require('qrcode.react');

function App() {

  const textArea = useRef(null);
  const [isSuccessCopy, setIsSuccessCopy] = useState(false);

  const [address, setAddress] = useState(null);
  const [link, setLink] = useState("");

  const copyToClipboard = (e) => {
    textArea.current.select();
    document.execCommand('copy');
    e.target.focus();
    setIsSuccessCopy(true)
    setTimeout(() => setIsSuccessCopy(false), 2000)
  };

  useEffect(() => {
    var url = new URL(window.location.href);
    setAddress(url.searchParams.get("address"));
    setLink(url.searchParams.get("link"));
  }, [])
  
  return (
    <div className="App" style={{backgroundImage: "url(../background.jpg)"}}>
      <div className="header layout">
        <div className="text">Deposit</div>
        <div> <img src="../bitcoin.svg" alt="Bitcoin" /> </div>
      </div>
      <label className="layout">Deposit address (BTC) <span className="copied">{isSuccessCopy?" | Copied to clipboard":""}</span></label>
      <div className="layout">
        <div className="area copyarea" >
          <div className="text">{address}</div>
          <div className="copy-icon" onClick={copyToClipboard}><img src="../copy.svg" alt="Copy Image" /></div>
        </div>
      </div>
      <div className="layout qr">
        <QRCode value={link} />
      </div>

      <div className="layout">
        <div className="area description">
          Do not deposit non-BTC coin to the above
          address, otherwise<br />
          <br />
          the coin will not be recovered
          Derosit will be credited after 2 confrnation
        </div>
      </div>

      <textarea
            ref={textArea}
            value={address}
          />
    </div>
  );
}

export default App;
