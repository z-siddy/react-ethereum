import React, { useState, useEffect } from "react";
import "./App.css";
import { Nav, AuctionList, CreateAuction } from "./components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Buythereum from "./abis/Buythereum.json";
import Web3 from "web3";

function preloader() {
  const style = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto"
  };
  return <div style={style} className="loader"></div>;
}

function App() {
  const [account, setAccount] = useState(null);
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [buythereum, setBuythereum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function execute() {
      await loadWeb3();
      await loadData();
    }
    execute();
  }, []);

  async function loadData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Buythereum.networks[networkId];
    if (networkData) {
      const buythereum = new web3.eth.Contract(
        Buythereum.abi,
        networkData.address
      );
      setBuythereum(buythereum);
      const itemCount = await buythereum.methods.itemCount().call();
      setItemCount(itemCount);
      setItems([]);
      for (var i = 1; i <= itemCount; i++) {
        const item = await buythereum.methods.items(i).call();
        setItems(prevState => [...prevState, item]);
      }
      setLoading(false);
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  function addItem(name, description, price, photo) {
    setLoading(true);
    buythereum.methods
      .addItem(name, description, price, photo)
      .send({ from: account })
      .on("confirmation", (confNo, receipt) => {
        loadData();
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        alert(`Error: ${e.message}`);
      })
      .then(() => window.location.reload());
  }

  function buyItem(id, price) {
    setLoading(true);
    buythereum.methods
      .buyItem(id)
      .send({ from: account, value: price })
      .once("receipt", async receipt => {
        await loadData();
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        alert(`Error: ${e.message}`);
        console.log(e);
      });
  }

  return (
    <div className="App bg-warning">
      {loading ? (
        preloader()
      ) : (
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <AuctionList items={items} count={itemCount} method={buyItem} />
            </Route>
            <Route exact path="/add">
              <CreateAuction method={addItem} />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
