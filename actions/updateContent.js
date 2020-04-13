const chalk = require('chalk')

const Pupt = require('../helpers/pupt')
const sleep = require('../helpers/sleep')

module.exports = async (self, app, metadata) => {
  const page = self.page
  const tag = self.tag + chalk.cyan(' :updateContentCenter')

  console.log(tag, 'Opening content center page')
  await sleep(1000)
  await page.goto(`${self.PlayURL}#AppContentCenterPlace:p=${app.package_name}&appid=${app.id}`)
  await sleep(3000)
  //Start ads declaration
  await click(page,"material-button[aria-label='Start ads declaration']")
  await sleep(3000)
  await click(page,"material-radio:nth-child(2) > div input[type='radio']")
  await sleep(1000)
  //save
  await click(page,"console-button-set > div > material-button:nth-child(2)")
  //Go back to App content
  await click(page,"material-button:nth-child(1)>button[aria-label='Go back to App content']")
  //Start target audience and content
  await click(page,"material-button[aria-label='Start target audience and content']")
  /* let iniciar = await Pupt.$byText(page, 'Start')
  await iniciar.click() */

  await sleep(20000)
  Pupt.click(page,"div:nth-of-type(9)>material-checkbox>div>input")
  await sleep(3000)
  Pupt.click(page,"div:nth-of-type(8)>material-checkbox>div>input")
  await sleep(3000)
  Pupt.click(page,"div:nth-of-type(7)>material-checkbox>div>input")
  await sleep(2000)
  let proximo = await Pupt.$byText(page, 'Next')
  await proximo.click()
  await sleep(2000)
  /* Pupt.click(page, "span:nth-of-type(2) > input[name='aptForKidsRadioButton']") */
  let proximo2 = await Pupt.$byText(page, 'Next')
  await sleep(2000)
  await proximo2.click()
  await sleep(3000)
  let enviar = await Pupt.$byText(page, 'Save')
  await enviar.click()
  await sleep(3000)
  /* await click(page,"button[aria-label='Go back to App content']") */
  console.log(tag, 'Done')
}
