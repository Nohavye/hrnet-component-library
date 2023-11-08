import { exec } from 'child_process'
import yargs from 'yargs/yargs'
import process from 'process'
import readline from 'readline'

const argv = yargs(process.argv.slice(2))
    .usage('Update package version and publish to the npm registry.')
    .option('update', {
        choices: ['major', 'minor', 'patch'],
        default: 'patch',
        describe: 'Increment version.',
        type: 'string',
    })
    .version(false)
    .help().argv

const updateVersion = (arg) => {
    exec(`yarn version --${arg}`, (error, stdout) => {
        if (error) {
            console.error(`Error incrementing version : ${error}`)
            process.exit(1)
        }
        console.log(stdout)
    })
}

const publish = () => {
    exec('yarn publish --access public', (error, stdout) => {
        if (error) {
            console.error(`Error while publishing : ${error}`)
            process.exit(1)
        }
        console.log(stdout)
    })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function confirmation() {
    console.log(
        `\nYou are about to release a new ${argv.update} version of the library.`
    )
    rl.question('Do you want to continue? (yes/no) [no] : ', (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
            updateVersion(argv.update)
            publish()
            rl.close()
        } else if (
            !answer ||
            answer.toLowerCase() === 'no' ||
            answer.toLowerCase() === 'n'
        ) {
            console.log('\nAction canceled.')
            rl.close()
        } else {
            console.log('Invalid response. Please answer “yes” or “no”.')
            confirmation()
        }
    })
}

confirmation()
