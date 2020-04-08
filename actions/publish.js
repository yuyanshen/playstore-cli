const chalk = require('chalk')

const Apk = require('../helpers/Apk')
const Pupt = require('../helpers/pupt')
const sleep = require('../helpers/sleep')

/*
 * Creates a new app version and publishes apk
 */
module.exports = async (self, app, metadata) => {
  const page = self.page
  const tag = self.tag + chalk.cyan(' :publish')

  // Click correct lane button
  console.log(tag, 'Opening releases page')
  await sleep(2000)
  await page.goto(`${self.PlayURL}#ManageReleasesPlace:p=${app.package_name}&appid=${app.id}`)
  await sleep(8000)

  const lane = metadata.lane || 'beta'

  // Manage production lane
  let manageVersion = await Pupt.$byText(page, 'Manage')
  if(manageVersion) {
    await sleep(2000)
    await manageVersion.click()
  } else {
    throw new Error('Could not open Production lane')
  }

  // Finds one to edit
  let editVersion = await Pupt.$byText(page, 'Edit release')
  if (editVersion) {
    await editVersion.click()
  } else {
    throw new Error('No version available for publishing')
  }

  let revise = await Pupt.$waitByText(page, 'Review')

  // Submit revision
  revise = await Pupt.$byText(page, 'Review')
  console.log(tag, 'Publishing 1/3')
  await revise.click()
  await sleep(5000)
  console.log(tag, 'Publishing 2/3')
  let launch = await Pupt.$waitByText(page, `Start rollout to ${lane}`)
  await sleep(5000)
  // Check it's not disabled
  if (!await Pupt.click(page, launch)) {
    throw new Error('Could not load Launch window. Launch button is disabled')
  }

  console.log(tag, 'Publishing 3/3')
  await sleep(2000)
  let confirm = await Pupt.$waitByText(page, 'Confirm')
  await confirm.click()
  console.log(tag, chalk.green('!!!!!!!!!!!!!!!!!!!!!!!'))
  console.log(tag, chalk.green('!!!!!!!!!!!!!!!!!!!!!!!'))
  console.log(tag, chalk.green('!!!!!!!!!!!!!!!!!!!!!!!'))
  console.log(tag, chalk.green('!!!!!!!! YAYYYY !!!!!!!'))
  console.log(tag, chalk.green('!!!!!!!!!!!!!!!!!!!!!!!'))
  console.log(tag, chalk.green('!!!!!!!!!!!!!!!!!!!!!!!'))
  console.log(tag, chalk.green('!!!!!!!!!!!!!!!!!!!!!!!'))
  console.log(tag, 'Done ')
}
