import React from "react";
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';

import ChainsList from '../ChainsList';
import TokenList from '../TokenList';
import AmountInput from '../AmountInput';

// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import IconButton from '@mui/material/IconButton';

export default function WidgetBody(props) {
  const [expandedFrom, setExpandedFrom] = React.useState<boolean>(false);
  const [expandedTo, setExpandedTo] = React.useState<boolean>(false);
  const [expandedTokens, setExpandedTokens] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<string>('');

  const tokensList = props.token || (props.chain1 && props.chain2);

  return (
    <div>
      <div>
        <Collapse in={!expandedTo && !expandedTokens}>
          <div>
            <h5 className='no-marg-top'>From</h5>
            <ChainsList
              schains={props.schains}
              setChain={props.setChain1}
              chain={props.chain1}
              disabledChain={props.chain2}
              expanded={expandedFrom}
              setExpanded={setExpandedFrom}
              fromChain={true}
              schainAliases={props.schainAliases}
              disabled={props.disabledChains}
            />
          </div>
        </Collapse>
      </div>
      
      <div>
      <Collapse className='arrow-down-icon' in={!expandedFrom && !expandedTo && !expandedTokens}>
        <IconButton
          color="secondary"
          onClick={() => {
            let chain1 = props.chain1;
            props.setChain1(props.chain2);
            props.setChain2(chain1);
          }}>
          <SwapVertIcon/>
        </IconButton>
      </Collapse>

      <Collapse in={!expandedFrom && !expandedTokens}>
        <h5>To</h5>
        <ChainsList
          schains={props.schains}
          setChain={props.setChain2}
          chain={props.chain2}
          disabledChain={props.chain1}
          expanded={expandedTo}
          setExpanded={setExpandedTo}
          schainAliases={props.schainAliases}
          disabled={props.disabledChains}
        />
      </Collapse>

      <Collapse in={!!tokensList}>
        <Collapse in={!!expandedTokens}>
          <h5>Token</h5>
        </Collapse>
        <Collapse in={!expandedFrom && !expandedTo}>
          <div className='marg-top-10'>
            <TokenList
              tokens={props.tokens}
              setToken={props.setToken}
              token={props.token}
              expanded={expandedTokens}
              setExpanded={setExpandedTokens}
            />
          </div>
      </Collapse>

        <Collapse in={!expandedFrom && !expandedTo && !expandedTokens && props.token}>
            <div className='marg-top-10'>
              <AmountInput
                amount={amount}
                setAmount={setAmount}
                balance={props.balance}
              />
            </div>
            <div className='flex-container'>
              <div className='fl-grow'></div>
              <h6 className='balance-text'>Balance: {props.balance}</h6>
              <h6 className='balance-text uppercase marg-left-10 token-symbol-text'>{props.token}</h6>
            </div>
        </Collapse>
      </Collapse>

      <Collapse in={!expandedFrom && !expandedTo && !expandedTokens}>
        <Button variant="contained" color="secondary" size="medium" className='transfer-btn marg-top-10'>
            Transfer
          </Button>
      </Collapse>

      </div>
    </div>
  )
}