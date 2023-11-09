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

const update = () => {
    exec(`yarn version --${argv.update}`, (error, stdout) => {
        if (error) {
            console.error(`Error incrementing version : ${error}`)
            process.exit(1)
        }
        console.log(stdout)
    })
}

const build = () => {
    exec('yarn build', (error, stdout) => {
        if (error) {
            console.error(`Error while building : ${error}`)
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

const proceed = () => {
    update()
    build()
    publish()
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function confirm() {
    console.log(
        `\nYou are about to release a new ${argv.update} version of the library.`
    )
    rl.question('Do you want to continue? (yes/no) [no] : ', (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
            proceed()
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
            confirm()
        }
    })
}

confirm()
