
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function HomePage() {
  const [account, setAccount] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [notifications, setNotifications] = useState([]);

  const checkWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }
  };

  const getBalance = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(contractAddress, atm_abi.abi, provider);
    const currentBalance = await contract.balance();
    setBalance(currentBalance.toNumber());
  };

  const deposit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, atm_abi.abi, signer);
    try {
      const transaction = await contract.deposit(inputA, { value: inputA });
      await transaction.wait();
      getBalance();
      notify("Deposit successful", `You deposited ${inputA} ETH.`);
    } catch (error) {
      notify("Deposit failed", "There was an error processing your deposit.");
    }
  };

  const withdraw = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, atm_abi.abi, signer);
    try {
      const transaction = await contract.withdraw(inputB);
      await transaction.wait();
      getBalance();
      notify("Withdrawal successful", `You withdrew ${inputB} ETH.`);
    } catch (error) {
      notify("Withdrawal failed", "There was an error processing your withdrawal.");
    }
  };

  const updateCurrentTime = () => {
    const date = new Date();
    setCurrentTime(date.toLocaleTimeString());
  };

  const notify = (title, message) => {
    const newNotification = { title, message };
    setNotifications([newNotification, ...notifications]);
  };

  useEffect(() => {
    checkWallet();
    getBalance();
    updateCurrentTime();

    // Update time every second
    const interval = setInterval(updateCurrentTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="container">
      <div className="top-left">
        <p>Current Date: {new Date().toLocaleDateString()}</p>
        <p>Current Time: {currentTime}</p>
      </div>

      <header>
        <h1>Welcome Pranav</h1>
        {account ? (
          <div className="account-info">
            <p>Account Owner: Pranav Chaitanya</p>
            <p>Gender: Male</p>
            <p>Age: 20</p>
            <p>Account Type: Savings Account</p>
            <p>Your Balance: {balance} ETH </p>
            <p>Account address: {account}</p>
          </div>
        ) : (
          <p>Please install Metamask to use this ATM.</p>
        )}

        <div className="button-container">
          <input
            type="number"
            placeholder="Enter ETH to deposit"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
          />
          <button onClick={deposit}>Deposit ETH</button>
        </div>

        <div className="button-container">
          <input
            type="number"
            placeholder="Enter ETH to withdraw"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
          />
          <button onClick={withdraw}>Withdraw ETH</button>
        </div>
      </header>

      <div className="notifications">
        <h3>Notifications</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={index}>
                <td>{notification.title}</td>
                <td>{notification.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .container {
          text-align: center;
          background-color: #3498db; /* Blue background */
          color: #ffffff; /* White text */
          padding: 20px;
          position: relative;
        }

        .top-left {
          position: absolute;
          top: 10px;
          left: 10px;
          text-align: left;
        }

        .notifications {
          position: absolute;
          top: 10px;
          right: 10px;
          text-align: left;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          border: 1px solid #ffffff;
          padding: 8px;
          text-align: left;
        }

        .button-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px;
        }

        input {
          margin-right: 10px;
        }

        button {
          padding: 10px;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}
