# Assessment Smart Contract and ATM DApp

## Overview

This project consists of a simple Ethereum smart contract named `Assessment` and a corresponding decentralized application (DApp) built using React. The smart contract handles basic financial transactions, such as deposit, withdrawal, and purchase, while the DApp allows users to interact with the smart contract through a user-friendly interface.

## Smart Contract (`Assessment.sol`)

### Features

1. **Deposit Functionality:** Users can deposit Ether into the contract.
2. **Withdraw Functionality:** Users can withdraw Ether from the contract.
3. **Change Owner:** The owner of the contract can be changed.
4. **Purchase Item:** The owner can purchase items, deducting the cost from the contract's balance.
5. **Reward User:** The owner can reward a specified user with Ether.

### Events

- `Deposit`: Emits when a deposit is made, providing information about the depositor and the deposited amount.
- `Withdraw`: Emits when a withdrawal occurs, providing information about the withdrawer and the withdrawn amount.
- `ChangeOwner`: Emits when the owner of the contract is changed.
- `PurchaseItem`: Emits when an item is purchased, providing information about the buyer, item, and purchase amount.
- `RewardUser`: Emits when a user is rewarded with Ether.

### Custom Error

- `InsufficientBalance`: An error thrown when a withdrawal is attempted with insufficient balance.

## Decentralized Application (DApp)

### Technologies Used

- **React:** Frontend library for building the user interface.
- **Ethers.js:** JavaScript library for interacting with Ethereum.

### Features

1. **Account Information:** Displays user account details, including owner name, gender, age, account type, balance, and address.
2. **Deposit:** Allows users to deposit Ether into the smart contract.
3. **Withdraw:** Allows users to withdraw Ether from the smart contract.
4. **Real-time Balance Update:** Displays the current balance in real-time.
5. **Notifications:** Notifies users of successful or failed transactions.
6. **Time Display:** Shows the current date and time.

### Usage

1. **Install MetaMask:** Ensure MetaMask is installed in your browser.
2. **Connect Wallet:** Connect your wallet to the DApp.
3. **Deposit:** Enter the amount of Ether to deposit and click "Deposit ETH."
4. **Withdraw:** Enter the amount of Ether to withdraw and click "Withdraw ETH."
5. **Real-time Updates:** See real-time updates of your account balance.
6. **Notifications:** View transaction notifications for feedback.
7. **Time Display:** Check the current date and time.

## Smart Contract Deployment

The smart contract is deployed on the Ethereum blockchain at the address `0x5FbDB2315678afecb367f032d93F642f64180aa3`. You can interact with it using a tool like Remix or deploy it to a testnet or the mainnet.

## steps to run the code 

After cloning the github, you will want to do the following to get the code running on your computer.

Inside the project directory, in the terminal type: npm i

Open two additional terminals in your VS code

In the second terminal type: npx hardhat node

In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js

Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. Typically at `http://localhost:3000/`


## Contributors

- Pranav Chaitanya ([GitHub](https://github.com/pranavchaitanya))

## License

This project is licensed under the MIT license.
