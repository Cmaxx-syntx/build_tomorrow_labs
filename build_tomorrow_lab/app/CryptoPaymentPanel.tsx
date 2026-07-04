'use client';

import { useState } from 'react';
import { BrowserProvider, Contract, formatEther, formatUnits } from 'ethers';
import addresses from '../data/receivingAddresses.json';

type AddressEntry = {
    id: string;
    label: string;
    chain: string;
    address: string;
};

const tokenConfigs: Record<string, { address: string; symbol: string; decimals: number }> = {
    '1': {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        symbol: 'USDC',
        decimals: 6,
    },
    '137': {
        address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        symbol: 'USDC',
        decimals: 6,
    },
    '56': {
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        symbol: 'BUSD',
        decimals: 18,
    },
};

export default function CryptoPaymentPanel() {
    const list = (addresses as AddressEntry[]) || [];
    const [walletAddress, setWalletAddress] = useState('');
    const [chainId, setChainId] = useState('');
    const [status, setStatus] = useState('Not connected');
    const [tokenResult, setTokenResult] = useState('Connect a wallet to run the token test.');
    const [loading, setLoading] = useState(false);

    function getShortAddress(address: string) {
        return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
    }

    async function connectWallet() {
        setLoading(true);
        setStatus('Connecting wallet...');

        try {
            const anyWindow = window as any;
            if (!anyWindow.ethereum) {
                setStatus('No injected Ethereum-compatible wallet found in this browser.');
                setTokenResult('Install MetaMask, Coinbase Wallet, or another injected wallet.');
                return;
            }

            await anyWindow.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new BrowserProvider(anyWindow.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const network = await provider.getNetwork();

            setWalletAddress(address);
            setChainId(String(network.chainId));
            setStatus(`Connected ${getShortAddress(address)} on ${network.name || network.chainId}`);
            setTokenResult('Connected. Run the token test to verify the wallet and chain.');
        } catch (error) {
            setStatus(`Wallet connection failed: ${error instanceof Error ? error.message : String(error)}`);
            setTokenResult('');
        } finally {
            setLoading(false);
        }
    }

    async function runTokenTest() {
        setLoading(true);
        setStatus('Running token test...');

        try {
            const anyWindow = window as any;
            if (!anyWindow.ethereum || !walletAddress) {
                setStatus('Connect a wallet first.');
                setTokenResult('');
                return;
            }

            const provider = new BrowserProvider(anyWindow.ethereum);
            const nativeBalance = await provider.getBalance(walletAddress);
            const formattedNative = Number(formatEther(nativeBalance)).toFixed(6);
            let result = `Native balance: ${formattedNative} ${chainId === '137' ? 'MATIC' : chainId === '56' ? 'BNB' : chainId === '1' ? 'ETH' : 'NATIVE'}`;

            if (tokenConfigs[chainId]) {
                const tokenInfo = tokenConfigs[chainId];
                const tokenContract = new Contract(
                    tokenInfo.address,
                    ['function balanceOf(address) view returns (uint256)', 'function symbol() view returns (string)', 'function decimals() view returns (uint8)'],
                    provider,
                );

                const tokenBalance = await tokenContract.balanceOf(walletAddress);
                const tokenSymbol = await tokenContract.symbol();
                const tokenDecimals = await tokenContract.decimals();
                result += ` | ${formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol}`;
            } else {
                result += ' | No ERC-20 token test configured for this chain.';
            }

            setTokenResult(result);
            setStatus('Token test complete.');
        } catch (error) {
            setStatus(`Token test failed: ${error instanceof Error ? error.message : String(error)}`);
            setTokenResult('');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="crypto-panel" id="crypto-payments">
            <div className="overlay" />
            <div className="edge-right" />
            <div className="edge-left" />
            <div className="glass-inner">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div>
                        <div className="panel-title">RECEIVING ADDRESSES</div>
                        <div className="panel-sub">Public receiving addresses across chains</div>
                    </div>
                    <div className="pill">Live</div>
                </div>

                <div className="wallet-actions">
                    <div className="wallet-action-row">
                        <button className="btn primary connect-wallet-button" type="button" onClick={connectWallet} disabled={loading}>
                            {loading ? 'Working…' : 'Connect Wallet'}
                        </button>
                        <button className="btn secondary" type="button" onClick={runTokenTest} disabled={loading || !walletAddress}>
                            Run token test
                        </button>
                        <div className="wallet-service-links">
                            <a href="https://metamask.io/download/" target="_blank" rel="noreferrer" className="wallet-service-link">
                                MetaMask
                            </a>
                            <a href="https://phantom.app/" target="_blank" rel="noreferrer" className="wallet-service-link">
                                Phantom
                            </a>
                            <a href="https://www.tronlink.org/" target="_blank" rel="noreferrer" className="wallet-service-link">
                                TronLink
                            </a>
                            <a href="https://trustwallet.com/" target="_blank" rel="noreferrer" className="wallet-service-link">
                                Trust Wallet
                            </a>
                            <a href="https://coinbase.com/wallet" target="_blank" rel="noreferrer" className="wallet-service-link">
                                Coinbase Wallet
                            </a>
                        </div>
                    </div>
                </div>

                <div className="wallet-status">
                    <div className="panel-note" style={{ marginTop: 8 }}>{status}</div>
                    <div className="panel-note" style={{ marginTop: 8 }}>{tokenResult}</div>
                </div>

                {list.length === 0 ? (
                    <div className="panel-note" style={{ marginTop: 16 }}>
                        No receiving addresses configured. Add address entries to <strong>data/receivingAddresses.json</strong>.
                    </div>
                ) : (
                    <div className="payments-grid" style={{ marginTop: 18 }}>
                        {list.map((entry) => (
                            <div className="glass-panel wallet-card small" key={entry.id}>
                                <div className="glass-inner">
                                    <div className="wallet-top">
                                        <div className="wallet-dot" style={{ background: 'var(--cyan)' }} />
                                        <div>
                                            <div className="wallet-symbol">{entry.label}</div>
                                            <div className="wallet-network">{entry.chain}</div>
                                        </div>
                                    </div>
                                    <div className="wallet-address">{entry.address}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
