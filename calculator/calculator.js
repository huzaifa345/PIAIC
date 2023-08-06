import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import chalk from 'chalk';
let stopAnimation = () => {
    return new Promise((res) => {
        setTimeout(res, 2500);
    });
};
async function calculator() {
    console.clear();
    let calcAnimation = chalkAnimation.neon(" Simple Calculator Using Inquirer ", .85);
    await stopAnimation();
    calcAnimation.stop();
    await inquirer.prompt([
        {
            name: "operator",
            type: "list",
            choices: ['add', 'subtract', 'division', 'multiply'],
            message: chalk.greenBright("use arrow key to select an opeation")
        },
        {
            name: "value1",
            type: 'number',
            message: chalk.blue("enter first value")
        },
        {
            name: "value2",
            type: 'number',
            message: chalk.blue("enter second value")
        }
    ])
        .then((ans) => {
        if (ans.operator === 'add') {
            console.log(chalk.bgWhite(` ${chalk.blueBright(ans.value1)}${chalk.black(' +')} ${chalk.blueBright(ans.value2)} ${chalk.black(' = ')} ${chalk.black.underline(ans.value1 + ans.value2)} `));
        }
        else if (ans.operator === 'subtract') {
            console.log(chalk.bgWhite(` ${chalk.blueBright(ans.value1)}${chalk.black(' -')} ${chalk.blueBright(ans.value2)} ${chalk.black(' = ')} ${chalk.black.underline(ans.value1 - ans.value2)} `));
        }
        else if (ans.operator === 'division') {
            console.log(chalk.bgWhite(` ${chalk.blueBright(ans.value1)}${chalk.black(' /')} ${chalk.blueBright(ans.value2)} ${chalk.black(' = ')} ${chalk.black.underline(ans.value1 / ans.value2)} `));
        }
        else if (ans.operator === 'multiply') {
            console.log(chalk.bgWhite(` ${chalk.blueBright(ans.value1)}${chalk.black(' *')} ${chalk.blueBright(ans.value2)} ${chalk.black(' = ')} ${chalk.black.underline(ans.value1 * ans.value2)} `));
        }
        else {
            console.log("invalid input");
        }
    });
    let exit_inquirer = await inquirer.prompt([{
            name: 'exit_res',
            type: 'confirm',
        }])
        .then((ans) => {
        if (!ans.exit_res) {
            calculator();
        }
    });
}
calculator();
