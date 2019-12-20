const chalk = require('chalk')

const Pupt = require('../helpers/pupt')
const sleep = require('../helpers/sleep')

/*
 * Configures PricingPlace definitions for the app
 */
module.exports = async (self, app, metadata) => {
  let page = self.page
  let tag = self.tag + chalk.cyan(' :updatePrice')

  console.log(tag, 'Opening form')
  await sleep(3000)
  await page.goto(`${self.PlayURL}#PricingPlace:p=${app.package_name}`)
  await sleep(3000)
  console.log(tag, 'Waiting to load')
  await sleep(3000)
  await page.waitForSelector('input[name="countryheader"]')
  await sleep(3000)
  // Set to all countries
  console.log(tag, 'Filling form')
  await Pupt.checkRadio(page, 'input[name="countryheader"]', 1)
  await sleep(3000)
  // Set to NO on infant public
  await Pupt.checkRadio(page, 'input[name="pcdRadioButton"]', 1)
  await sleep(3000)
  // Set to NO for ads
  await Pupt.checkRadio(page, 'input[name="ads_supported"]', 1)
  await sleep(3000)
  // Agree to terms (1)
  Pupt.check(page, 'fieldset > label:nth-child(3) > div > div input[type="checkbox"]')
  await sleep(3000)
  // Agree to terms (2)
  Pupt.check(page, 'fieldset > label:nth-child(4) > div > div input[type="checkbox"]')
  await sleep(3000)
  console.log(tag, 'Saving...')
  await self.saveForm()
}