/**
 * @license
 * SKALE Metaport
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @file eth.ts
 * @copyright SKALE Labs 2022-Present
 */


import debug from 'debug';

import { externalEvents } from '../events';
import { toWei } from '../convertation';
import { TransferAction, Action } from './action';
import { checkEthBalance } from './checks';


debug.enable('*');
const log = debug('metaport:actions:eth');


export class TransferEthM2S extends TransferAction {
    async execute() {
        log('TransferEthM2S: started');
        this.updateState('transferETH');
        const amountWei = toWei(this.amount, this.tokenData.decimals);
        const sChainBalanceBefore = await this.sChain2.ethBalance(this.address);
        const tx = await this.mainnet.eth.deposit(
            this.chainName2,
            {
                address: this.address,
                value: amountWei
            }
        );
        this.updateState('transferETHDone');
        const block = await this.mainnet.web3.eth.getBlock(tx.blockNumber);
        externalEvents.transactionCompleted(tx, block.timestamp, this.chainName1, 'deposit');
        await this.sChain2.waitETHBalanceChange(this.address, sChainBalanceBefore);
        this.updateState('receivedETH');
        externalEvents.transferComplete(
            tx, this.chainName1, this.chainName2, this.tokenData.keyname);
    }

    async preAction() {
        const checkResBalance = await checkEthBalance(
            this.mainnet,
            this.address,
            this.amount,
            this.tokenData
        );
        if (!checkResBalance.res) this.setAmountErrorMessage(checkResBalance.msg);
    }
}


export class TransferEthS2M extends TransferAction {
    async execute() {
        log('TransferEthS2M: started');
        this.updateState('transferETH');
        const amountWei = toWei(this.amount, this.tokenData.decimals);
        const lockedETHAmount = await this.mainnet.eth.lockedETHAmount(this.address);
        const tx = await this.sChain1.eth.withdraw(
            amountWei,
            { address: this.address }
        );
        this.updateState('transferETHDone');
        const block = await this.sChain1.web3.eth.getBlock(tx.blockNumber);
        externalEvents.transactionCompleted(tx, block.timestamp, this.chainName1, 'withdraw');
        await this.mainnet.eth.waitLockedETHAmountChange(this.address, lockedETHAmount);
        this.updateState('receivedETH');
        externalEvents.transferComplete(
            tx, this.chainName1, this.chainName2, this.tokenData.keyname);
    }

    async preAction() {
        const checkResBalance = await checkEthBalance(
            this.sChain1,
            this.address,
            this.amount,
            this.tokenData
        );
        if (!checkResBalance.res) this.setAmountErrorMessage(checkResBalance.msg);
    }
}


export class UnlockEthM extends Action {
    static label = 'Unlock ETH'
    static buttonText = 'Unlock'
    static loadingText = 'Unlocking'

    async execute() {
        log('UnlockEthM: started');
        this.updateState('switch');
        await this.switchMetamaskChain(false);
        this.updateState('unlock');
        const tx = await this.mainnet.eth.getMyEth(
            { address: this.address }
        );
        const block = await this.mainnet.web3.eth.getBlock(tx.blockNumber);
        externalEvents.transactionCompleted(tx, block.timestamp, 'mainnet', 'getMyEth');
        this.updateState('unlockDone');
        externalEvents.ethUnlocked(tx);
    }
}

