import { config } from 'dotenv'
import connectToMongoDB from  './src/infrastructure/connections/mongoose'
import {create as userFactory} from './src/factories/mongo/UserFactory'
import { Command } from 'commander'
import clear from 'clear'

const program = new Command()

config()
connectToMongoDB()
clear()

program
  .version('v1.0.0')
  .description('A cli tool for shop project')

program
  .command('factory <model>')
  .description('Run models factory')
  .option('-c, --count <count>', 'count of records thats must be created')
  .action((model, options) => {
    switch (model) {
      case 'user':
          userFactory(options.count)
          .then((users) => {})
          .catch((error) => console.log(error.message))
        break 
    }
  })

program.parse(process.argv)