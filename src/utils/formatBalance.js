import BigNumber from 'bignumber.js'
import {BIG_TEN} from './bigNumber'

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount, decimals = 18) => {
    return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount, decimals = 18) => {
    return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

// Solution from https://labeebklatif.medium.com/js-number-tofixed-without-rounding-4da4207ba146
Number.prototype.toFixedNoRound = function (precision = 1) {
    const factor = Math.pow(10, precision);
    return Math.floor(this * factor) / factor;
}

export default Number;

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance, decimals = 18) => {
    return getBalanceAmount(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (balance, decimals = 18, decimalsToAppear) => {
    return getBalanceAmount(balance, decimals).toFixed(decimalsToAppear)
}

export const formatNumber = (number, minPrecision = 2, maxPrecision = 2) => {
    const options = {
        minimumFractionDigits: minPrecision,
        maximumFractionDigits: maxPrecision,
    }
    return number.toLocaleString(undefined, options)
}