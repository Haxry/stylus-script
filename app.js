// const connectButton = document.getElementById('connectButton');
// const betButton = document.getElementById('betButton');
// const claimButton = document.getElementById('claimButton');
// const walletInfo = document.getElementById('walletInfo');
// const userAddressSpan = document.getElementById('userAddress');
// const statusDiv = document.getElementById('status');
// const contractAddress = '0xb6b3343eebd029fcd7cfa13788d09de545574dca';
// const contractABI = [
//     "function init() external",
//     "function bet() external payable",
//     "function closeRegistration() external",
//     "function claimPrize() external"
// ];

// // Connect wallet
// async function connectWallet() {
//     try {
//         // Check if MetaMask is installed
//         if (typeof window.ethereum === 'undefined') {
//             throw new Error('Please install MetaMask to use this application');
//         }

//         // Request account access
//         provider = new ethers.BrowserProvider(window.ethereum);
//         signer = await provider.getSigner();
//         userAddress = await signer.getAddress();

//         // Initialize contract
//         contract = new ethers.Contract(contractAddress, contractABI, signer);

//         // Update UI
//         userAddressSpan.textContent = userAddress;
//         walletInfo.style.display = 'block';
//         connectButton.style.display = 'none';

//         showStatus('Wallet connected successfully!', 'success');
//     } catch (error) {
//         showStatus('Error connecting wallet: ' + error.message, 'error');
//     }
// }

// // Place bet
// async function placeBet() {
//     try {
//         const betAmount = ethers.parseEther("0.05");

//         // Send transaction
//         const tx = await contract.bet({
//             value: betAmount
//         });

//         showStatus('Transaction submitted. Waiting for confirmation...', 'success');

//         // Wait for transaction to be mined
//         await tx.wait();

//         showStatus('Bet placed successfully!', 'success');
//     } catch (error) {
//         showStatus('Error placing bet: ' + error.message, 'error');
//     }
// }

// // Claim prize
// async function claimPrize() {
//     try {
//         const tx = await contract.claimPrize();

//         showStatus('Transaction submitted. Waiting for confirmation...', 'success');

//         // Wait for transaction to be mined
//         await tx.wait();

//         showStatus('Prize claimed successfully!', 'success');
//     } catch (error) {
//         showStatus('Error claiming prize: ' + error.message, 'error');
//     }
// }

// // Helper function to show status messages
// function showStatus(message, type) {
//     statusDiv.textContent = message;
//     statusDiv.className = type;
// }

// // Event listeners
// connectButton.addEventListener('click', connectWallet);
// betButton.addEventListener('click', placeBet);
// claimButton.addEventListener('click', claimPrize);

// // Listen for account changes
// if (window.ethereum) {
//     window.ethereum.on('accountsChanged', () => {
//         window.location.reload();
//     });

//     window.ethereum.on('chainChanged', () => {
//         window.location.reload();
//     });
// }

const connectButton = document.getElementById('connectButton');
const betButton = document.getElementById('betButton');
const claimButton = document.getElementById('claimButton');
const walletInfo = document.getElementById('walletInfo');
const userAddressSpan = document.getElementById('userAddress');
const statusDiv = document.getElementById('status');
const betAmountInput = document.getElementById('betAmount');
const contractAddress = '0x4e0a477ab23678569483c0a05cbdcedff1b57e83';
const contractABI = [
    "function init() external",
    "function bet(uint256 value) external payable",
    "function closeRegistration() external",
    "function claimPrize() external"
];


async function connectWallet() {
    try {
        
        if (typeof window.ethereum === 'undefined') {
            throw new Error('Please install MetaMask to use this application');
        }

        
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        userAddress = await signer.getAddress();

        
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        
        userAddressSpan.textContent = userAddress;
        walletInfo.style.display = 'block';
        connectButton.style.display = 'none';

        showStatus('Wallet connected successfully!', 'success');
    } catch (error) {
        showStatus('Error connecting wallet: ' + error.message, 'error');
    }
}


async function placeBet() {
    try {
        const betAmountEth = betAmountInput.value;
        if (!betAmountEth || betAmountEth <= 0) {
            throw new Error('Please enter a valid bet amount');
        }

        const betAmountWei = ethers.parseEther(betAmountEth.toString());

        
        const tx = await contract.bet(betAmountWei, {
            value: betAmountWei
        });

        showStatus('Transaction submitted. Waiting for confirmation...', 'success');

       
        await tx.wait();

        showStatus('Bet placed successfully!', 'success');

        
        betAmountInput.value = '';
    } catch (error) {
        showStatus('Error placing bet: ' + error.message, 'error');
    }
}


async function claimPrize() {
    try {
        const tx = await contract.claimPrize();

        showStatus('Transaction submitted. Waiting for confirmation...', 'success');

       
        await tx.wait();

        showStatus('Prize claimed successfully!', 'success');
    } catch (error) {
        showStatus('Error claiming prize: ' + error.message, 'error');
    }
}


function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = type;
}


connectButton.addEventListener('click', connectWallet);
betButton.addEventListener('click', placeBet);
claimButton.addEventListener('click', claimPrize);


if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => {
        window.location.reload();
    });

    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
}