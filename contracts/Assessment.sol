
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(address indexed depositor, uint256 newAmount, string notification);
    event Withdraw(address indexed withdrawer, uint256 newAmount, string notification);
    event ChangeOwner(address indexed newerOwner);
    event PurchaseItem(address indexed buyer, string newItem, uint256 newAmount, string notification);
    event RewardUser(address indexed receiver, uint256 newAmount, string notification);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 depositAmount) public payable {
        uint256 previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += depositAmount;

        // assert transaction completed successfully
        assert(balance == previousBalance + depositAmount);

        // emit the event with notification
        emit Deposit(msg.sender, depositAmount, string(abi.encodePacked("You deposited ", depositAmount, " ETH")));
    }

    // custom error
    error InsufficientBalance(uint256 currentBalance, uint256 withdrawalAmount);

    function withdraw(uint256 withdrawalAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 previousBalance = balance;
        if (balance < withdrawalAmount) {
            revert InsufficientBalance({
                currentBalance: balance,
                withdrawalAmount: withdrawalAmount
            });
        }

        // withdraw the given amount
        balance -= withdrawalAmount;

        // assert the balance is correct
        assert(balance == (previousBalance - withdrawalAmount));

        // emit the event with notification
        emit Withdraw(msg.sender, withdrawalAmount, string(abi.encodePacked("You withdrew ", withdrawalAmount, " ETH")));
    }

    function changeOwner(address payable newerOwner) public {
        require(msg.sender == owner, "You are not the owner of this account");
        owner = newerOwner;
        emit ChangeOwner(newerOwner);
    }

    function purchaseItem(string memory newItem, uint256 purchaseAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= purchaseAmount, "Insufficient funds for purchase");
        balance -= purchaseAmount;

        // emit the event with notification
        emit PurchaseItem(msg.sender, newItem, purchaseAmount, string(abi.encodePacked("You purchased ", newItem)));
    }

    function rewardUser(address receiver, uint256 rewardAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        balance -= rewardAmount;

        // emit the event with notification
        emit RewardUser(receiver, rewardAmount, string(abi.encodePacked("You received ", rewardAmount, " ETH as a reward")));
    }
}
