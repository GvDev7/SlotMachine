const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

const SYMBOLS_VALUE = {
    A: 6,
    B: 3,
    C: 2,
    D: 1
}




const deposit = () => {
    const depositAmount = prompt("Enter a deposit amount: ");
    let numAmount = parseFloatAmount(depositAmount);
    validateAmount(numAmount);
    
}

const parseFloatAmount = (amnt) => {
    return parseFloat(amnt);
}

const validateAmount = (amnt) => {
    if (isNaN(amnt) || amnt <= 0) {
        let newAmount = prompt("Enter valid amount: ");
        let numAmount = parseFloatDepositAmount(newAmount);
        validateAmount(newAmount);
    } else {
        return amnt;
    }
}

const parseNumber = (num) => {
    return parseInt(num);
}

const getNumberOfBettingLines = () => {
    const lines = prompt("Enter the number of lines to bet on: ");
    let numberOfLines = parseNumber(lines);
    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
        let lines = prompt('Enter valid number 1-3: ');
        return parseInt(lines);
    } else {
        return numberOfLines;
    }
}

const getBet = (currentBalance, lines) => {
    let bet = prompt('Enter the total bet: ');
    let betNumber = parseFloatAmount(bet);
    if(isNaN(betNumber) || betNumber <= 0 || betNumber > (currentBalance / lines)) {
        bet = prompt('Enter valid bet amount: ');
        return parseFloatAmount(bet) 
    } else {
        return betNumber;
    }

}

const spinMachine = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelsSymbols = [...symbols];
        for(let j = 0;j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelsSymbols.length);
            const selectedSymbol = reelsSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelsSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROWS; i++) {
        rows.push([]);
        for(let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows; 
}

const printSlotRows = (rows) => {
    for(const row of rows) {
        let rowString = "";
        for(const [i, symbol] of row.entries()) {
            rowString += symbol;
            if(i != row.length - 1) {
                rowString += " | ";
            }
        }
    }
}

let currentBalance = deposit();
const numberOfLines = getNumberOfBettingLines();
const bet = getBet(currentBalance, numberOfLines);
const reels = spinMachine();
const rows = transpose(reels);
printSlotRows(rows);