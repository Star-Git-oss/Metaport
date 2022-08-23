import React from "react";
import { WidgetUI } from "./WidgetUI";
import { commonProps, defaultTokenData, generateTokenData } from './StoriesHelper';


export default {
  title: "Widget UI"
};


export const ConnectScreen = () => (
  <WidgetUI
    {...commonProps}
    {...defaultTokenData}
    walletConnected={false}
  />
);


export const ConnectScreenLight = () => (
  <WidgetUI
    {...commonProps}
    {...defaultTokenData}
    walletConnected={false}
    theme={{ mode: 'light' }}
  />
);


export const ClosedLight = () => (
  <WidgetUI
    {...commonProps}
    {...defaultTokenData}
    open={false}
    theme={{
      mode: 'light'
    }}
  />
);


export const ClosedDark = () => (
  <WidgetUI
    {...commonProps}
    {...defaultTokenData}
    open={false}
    theme={{
      mode: 'dark'
    }}
  />
);


export const SelectChains = () => (
  <WidgetUI
    schains={['aaa-chain', 'bbb-chain', 'ccc-chain', 'ddd-chain', 'eee-chain']}
    tokens={{ "erc20": {} }}
    walletConnected={true}
    open={true}
  />
);


export const LoadingTokens = () => (
  <WidgetUI loadingTokens={true} {...commonProps} />
);

export const SelectToken = () => (
  <WidgetUI
    {...commonProps}
    tokens={{
      "erc20": {
        'usdc': {
          "name": "USDC",
          "address": "0x0123",
          "balance": "1000"
        },
        'usdt': {
          "name": "USDT",
          "address": "0x0123",
          "balance": "3500"
        }
      }
    }}


  />
);



export const LoadingSteps = () => (
  <WidgetUI
    {...generateTokenData('usdc', 'USDC', true)}
    schains={['aaa-chain', 'bbb-chain']}
    walletConnected={true}
    open={true}

    setChain1={() => { }}
    setChain2={() => { }}
    setToken={() => { }}
    setActiveStep={() => { }}

    loading={true}

    chain1='aaa-chain'
    chain2='bbb-chain'
    theme={{ 'mode': 'dark' }}
  />
);


export const TransferUIDark = () => (
  <WidgetUI {...commonProps} {...defaultTokenData} />
);

export const TransferUILight = () => (
  <WidgetUI {...commonProps} {...generateTokenData('usdc', 'usdc')} theme={{ mode: 'light' }} />
);

export const Approved = () => (
  <WidgetUI {...commonProps} {...defaultTokenData} activeStep={1} />
);


export const Loading = () => (
  <WidgetUI
    {...commonProps}
    {...defaultTokenData}
    activeStep={1}
    loading={true}
    amountLocked={true}
  />
);


export const LoadingCustom = () => (
  <WidgetUI
    {...commonProps}
    {...defaultTokenData}
    activeStep={1}
    loading={true}
    amountLocked={true}
    theme={{
      primary: '#00d4ff',
      background: '#0a2540',
      mode: 'dark'
    }}
  />
);


export const LoadingLight = () => (
  <WidgetUI
    {...commonProps}
    {...defaultTokenData}
    activeStep={1}
    loading={true}
    amountLocked={true}
    theme={{ mode: 'light' }}
  />
);


export const TransferComplete = () => (
  <WidgetUI
    {...commonProps}
    {...defaultTokenData}
    activeStep={2}
    amountLocked={true}
  />
);


export const CustomThemeRuby = () => (
  <WidgetUI
    {...generateTokenData('ruby', 'Ruby')}
    {...commonProps}
    theme={{
      primary: '#b01571',
      background: '#f3f2ff',
      mode: 'light'
    }}
  />
);


export const CustomDarkBlue = () => (
  <WidgetUI
    {...generateTokenData('zrx', '0x')}
    {...commonProps}
    theme={{
      primary: '#00d4ff',
      background: '#0a2540',
      mode: 'dark'
    }}
  />
);


export const CustomLightOrange = () => (
  <WidgetUI
    {...generateTokenData('link', 'Chainlink')}
    {...commonProps}
    theme={{
      primary: '#f96300',
      background: '#ffffff',
      mode: 'light'
    }}
  />
);


export const CustomDarkGreen = () => (
  <WidgetUI
    {...generateTokenData('usdt', 'Tether')}
    {...commonProps}
    theme={{
      primary: '#2dcb74',
      background: '#111905',
      mode: 'dark'
    }}
  />
);


export const CustomLightViolet = () => (
  <WidgetUI
    {...generateTokenData('skl', 'Skale')}
    {...commonProps}
    theme={{
      primary: '#9a66ff',
      background: '#fbf8ff',
      mode: 'light'
    }}
  />
);


export const MainnetTransfer = () => (
  <WidgetUI
    {...generateTokenData('usdt', 'Tether', true)}
    schains={['mainnet', 'bbb-chain']}
    walletConnected={true}
    open={true}

    setChain1={() => { }}
    setChain2={() => { }}
    setToken={() => { }}
    setActiveStep={() => { }}

    chain1='mainnet'
    chain2='bbb-chain'

  />
);

export const MainnetTransferLight = () => (
  <WidgetUI
    {...generateTokenData('usdc', 'USDC', true)}
    schains={['mainnet', 'bbb-chain']}
    walletConnected={true}
    open={true}

    setChain1={() => { }}
    setChain2={() => { }}
    setToken={() => { }}
    setActiveStep={() => { }}

    chain1='mainnet'
    chain2='bbb-chain'
    theme={{ 'mode': 'light' }}
  />
);


export const sFuelIcons = () => (
  <WidgetUI
    {...commonProps}
    {...defaultTokenData}
    theme={{ 'mode': 'light' }}

    sFuelData1={{
      faucetUrl: 'https://example.com/',
      minSfuelWei: '200000000000000000',
      balance: '0',
      ok: false
    }}

    sFuelData2={{
      faucetUrl: 'https://example.com/',
      minSfuelWei: '200000000000000000',
      balance: '0',
      ok: false
    }}
  />
);

export const NoButton = () => (
  <WidgetUI
    {...commonProps}
    {...defaultTokenData}
    openButton={false}
  />
);