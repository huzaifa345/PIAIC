import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
import chalk from "chalk";
const loader = () => chalkAnimation.karaoke("\nChecking your name and password please wait", 500);
const red = (msg) => chalk.redBright(msg);
const white = (msg) => chalk.whiteBright(msg);
const green = (msg) => chalk.greenBright(msg);
const blue = (msg) => chalk.blueBright(msg);
const ul = (msg) => chalk.underline(msg);
console.clear();
console.log(`             _        _     ______________               _______    ___________    _________ 
            | |      | |   |______________|             |  ___  |  |____   ____|  | __   __ |       
            | |______| |          | |                   | |   | |       | |       | | |_| | |
            | |______| | _   _    | |                   | |===| |   _   | |   _   | |     | |
            | |      | ||_| | |___| |                   | |   | |  |_|  | |  |_|  | |     | |         
            |_|      |_|    |_______|                   |_|   |_|       |_|       | |     | |         
        ========================================================================================\n    
            `);
// hardcoded user data stored in an object array
let userData = [
    {
        userName: 'Huzaifa',
        pass: 2345,
        accNum: 12345,
        transactions: [],
        balance: 7500
    },
    {
        userName: 'Abdullah',
        pass: 1122,
        accNum: 112233,
        transactions: [],
        balance: 5800
    },
    {
        userName: 'umer',
        pass: 1234,
        accNum: 123123,
        transactions: [],
        balance: 18000
    },
    {
        userName: 'ARehman',
        pass: 1342,
        accNum: 117300,
        transactions: [],
        balance: 23500
    },
    {
        userName: 'muzammil',
        pass: 1001,
        accNum: 20311,
        transactions: [],
        balance: 4000
    }
];
let exitConfirmer = (operationFunction) => {
    inquirer.prompt([{
            name: 'confirmation',
            type: 'confirm',
            message: white("Do you want any other transaction")
        }])
        .then((res) => {
        if (res.confirmation)
            operationFunction();
        else {
            const greetingMessage = chalkAnimation.pulse(`\nTHANKS FOR VISITING US`);
            greetingMessage.start();
            setTimeout(() => {
                greetingMessage.stop();
            }, 3500);
        }
    });
};
// getting user input by inquirer prompt
const userPrompt = async () => {
    await inquirer.prompt([
        {
            name: 'inquirerName',
            type: 'string',
            message: 'Enter Your User Name',
        },
        {
            name: 'inquirerPass',
            type: 'number',
            message: 'Enter 4 digit pin'
        }
    ])
        .then((userInput) => {
        // matching user given info with user Array
        let matchedUser = userData.filter((i) => userInput.inquirerName === i.userName && userInput.inquirerPass === i.pass);
        // checking if user found
        if (matchedUser.length) {
            // getting amount to be withdraw
            let operationPrompt = () => {
                inquirer.prompt([
                    {
                        name: 'operation',
                        type: 'list',
                        choices: ['Check Balance', 'Mini Statement', 'Cash Withdraw', 'Funds Transfer'],
                        message: "\nWhat do you Want to do ?"
                    }
                ])
                    .then((res) => {
                    // checking Operations 
                    if (res.operation == 'Check Balance') {
                        console.log(green(`Your account balance is ${white(matchedUser[0].balance)}`));
                        exitConfirmer(operationPrompt);
                    }
                    else if (res.operation == 'Mini Statement') {
                        if (matchedUser[0].transactions.length) {
                            console.log(blue(`${ul(`\tType \t Amount \t Date`)}`));
                            for (let i = 0; i < matchedUser[0].transactions.length; i++) {
                                console.log(white(`\n    ${matchedUser[0].transactions[i].type} \t ${matchedUser[0].transactions[i].amount} \t ${matchedUser[0].transactions[i].date}`));
                            }
                            console.log(blue(`\n\n Your Remaining Balance is RS ${white(matchedUser[0].balance)} \n==========================================================`));
                        }
                        else {
                            console.log(blue(`${ul(`\tDate \t Type \t Amount`)}\n\n Your remaining balance is Rs ${matchedUser[0].balance} \n===========================================================`));
                        }
                        exitConfirmer(operationPrompt);
                    }
                    else if (res.operation == 'Cash Withdraw') {
                        inquirer.prompt([{
                                name: 'amount',
                                type: 'number',
                                message: '\nEnter an amount in multiple of 500 to withdraw'
                            }])
                            .then((withdrawRes) => {
                            if (withdrawRes.amount % 500 === 0) {
                                // checking user balance
                                if (withdrawRes.amount < matchedUser[0].balance) {
                                    // updating current balance
                                    matchedUser[0].balance = matchedUser[0].balance - withdrawRes.amount;
                                    // printing Succcess message
                                    console.log(green(`\nyou have successfully recieved amount of Rs : ${white(withdrawRes.amount)} \n Your ramaining balance is ${white(matchedUser[0].balance)}\n\n ${chalk.white(new Date())}\n`));
                                    matchedUser[0].transactions.push({
                                        type: res.operation,
                                        amount: withdrawRes.amount,
                                        date: new Date()
                                    });
                                    //Asking user to exit or not 
                                    exitConfirmer(operationPrompt);
                                }
                                // if balance is insufficient
                                else {
                                    console.log(red("\n\nyou have not that much balance...."));
                                    operationPrompt();
                                }
                            }
                            // if entered amount format is incorrect
                            else {
                                console.log(red("\nYou must have to enter amount in multiple of 500.."));
                                operationPrompt();
                            }
                        });
                    }
                    else if (res.operation == 'Funds Transfer') {
                        inquirer.prompt([
                            {
                                name: 'userAccNo',
                                type: 'number',
                                message: "\nEnter Account number to transfer funds"
                            },
                            {
                                name: 'amount',
                                type: 'number',
                                message: `\nEnter Amount to transfer in to requested account`
                            }
                        ]).then((res) => {
                            // finding user
                            let reciever = userData.filter(i => res.userAccNo === i.accNum);
                            let amount = res.amount;
                            console.log(reciever[0]);
                            if (reciever.length) {
                                if (reciever[0].accNum !== matchedUser[0].accNum) {
                                    if (typeof amount === 'number') {
                                        // checking balance
                                        if (matchedUser[0].balance >= amount) {
                                            //when user founds
                                            inquirer.prompt([{
                                                    name: 'TransferConfirmer',
                                                    type: 'confirm',
                                                    message: `${green('Are you sure to transfer amount of RS')} ${white(res.amount)} ${green('to')} ${white(reciever[0].userName) + green('\tAccount No :') + reciever[0].accNum} `
                                                }]).then((transferConfirmerRes) => {
                                                // if user confirm to transfer the amount 
                                                if (transferConfirmerRes) {
                                                    // Udating Sender Account
                                                    matchedUser[0].balance = matchedUser[0].balance - amount;
                                                    matchedUser[0].transactions.push({
                                                        type: `funds transfer to ${reciever[0].userName}`,
                                                        amount: amount,
                                                        date: new Date()
                                                    });
                                                    // updating Reciever Acount
                                                    reciever[0].balance = reciever[0].balance + amount;
                                                    reciever[0].transactions.push({
                                                        type: `funds transfer from ${matchedUser[0].userName}`,
                                                        amount: amount,
                                                        date: new Date()
                                                    });
                                                    // printing Succcess message
                                                    console.log(green(`\nyou have successfully transfered amount of Rs : ${white(amount)} to ${white(reciever[0].userName)} \n Your ramaining balance is ${white(matchedUser[0].balance)}\n\n ${chalk.white(new Date())}\n`));
                                                    exitConfirmer(operationPrompt);
                                                }
                                                // if user cancel the transaction
                                                else {
                                                    console.log(red("\n You Cancel the Transaction......"));
                                                    operationPrompt();
                                                }
                                            });
                                        }
                                        // if Balance is insufficient 
                                        else {
                                            console.log(red("\n\nyou have not that much balance...."));
                                            operationPrompt();
                                        }
                                    }
                                    else {
                                        console.log(red("You have enter an invlid amount"));
                                        operationPrompt();
                                    }
                                }
                                // if user enter same account 
                                else {
                                    console.log(red("You can't transfer money to your account"));
                                    operationPrompt();
                                }
                            }
                            // when user not found 
                            else {
                                console.log(red('\n You entered an in valid account......'));
                                operationPrompt();
                            }
                        });
                    }
                });
            };
            // invoking animation while checking username and password
            loader();
            setTimeout(() => {
                loader().stop();
                // invoking amount prompt function
                operationPrompt();
            }, 1500);
        }
        // if user given info is incorrect
        else {
            console.log(red("\nyou entered an invalid credentials"));
            userPrompt();
        }
    });
};
// invoking main function
userPrompt();
