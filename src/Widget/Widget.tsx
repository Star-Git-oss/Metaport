import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import WidgetUI from '../WidgetUI'
import { initSChain, initERC20, runTokenLookup } from '../WidgetCore'

import defaultTokens from '../metadata/tokens.json'


export function Widget(props) {

  const [availableTokens, setAvailableTokens] = React.useState({'erc20': {}});

  // const [address, setAddress] = React.useState(undefined);
  const address = '0xBFef9277d497B67d3D730E59F85020d8B064Af88';

  const [chain1, setChain1] = React.useState(undefined);
  const [chain2, setChain2] = React.useState(undefined);
  const [token, setToken] = React.useState(undefined);

  const [sChain1, setSChain1] = React.useState(undefined);
  const [sChain2, setSChain2] = React.useState(undefined);

  const [balance, setBalance] = React.useState(undefined);

  async function getTokenBalance() {
    console.log('getting token balance: ' + token);
    let tokenContract = sChain1.erc20.tokens[token];
    let balance = await sChain1.getERC20Balance(tokenContract, address);
    let balanceEther = sChain1.web3.utils.fromWei(balance);
    setBalance(balanceEther);
  }

  async function tokenLookup() {
    let tokens = await runTokenLookup(
      sChain1,
      chain1,
      sChain2,
      chain2,
      props.tokens
    );
    setAvailableTokens(tokens);
  }

  useEffect(() => {
    if (chain1) {
      setSChain1(initSChain(
        props.network,
        chain1
      ))
      console.log('chain1 changed ' + chain1);
    }
  }, [chain1]);

  useEffect(() => {
    if (chain2) {
      setSChain2(initSChain(
        props.network,
        chain2
      ))
      console.log('chain2 changed ' + chain2);
    }
  }, [chain2]);


  useEffect(() => {
    // setBalance('');
    if (sChain1 && sChain2) {
      tokenLookup()
    }
  }, [sChain1, sChain2]);


  useEffect(() => {
    setBalance('');
    if (sChain1 && token && availableTokens['erc20'][token]) {
      let tokenInfo = availableTokens['erc20'][token];
      sChain1.erc20.addToken(token, initERC20(tokenInfo, sChain1.web3));
      getTokenBalance();
    }
  }, [token, availableTokens]);

  return (<WidgetUI
    schains={props.schains}
    tokens={availableTokens}
    schainAliases={props.schainAliases}
    balance={balance}
    amount=''
    open={props.open}

    chain1={chain1}
    chain2={chain2}
    setChain1={setChain1}
    setChain2={setChain2}

    token={token}
    setToken={setToken}
  />)
}


class IMAWidget {
  constructor(params: any) {
    const widgetEl: HTMLElement = document.getElementById('ima-widget');  
    const root = createRoot(widgetEl);

    // params validation + transformation here

    if (params['chains']) {
      params['chainsFrom'] = params['chains'];
      params['chainsTo'] = params['chains'];
    }

    let tokens;
    if (params['tokens']) {
      tokens = params['tokens'];
    } else {
      tokens = defaultTokens[params['network']];
    }

    if (!params['chains']) {
      // todo: ALL network chains (request from proxy!)
    }

    root.render(
          <Widget
            tokens={tokens}
            schains={params['schains']}
            schainAliases={params['schainAliases']}
            open={params['open']}
            network={params['network']}
          />
    );
  }
}


export default IMAWidget;
