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

  let iniciar = await Pupt.$byText(page, 'Start')
  await iniciar.click()
  await sleep(2000)
  Pupt.check(page, '.GNVPVGB-Gi-e:nth-of-type(1) [type]')
  Pupt.check(page, ".GNVPVGB-Gi-e:nth-of-type(2) [type]")
  Pupt.check(page, ".GNVPVGB-Gi-e:nth-of-type(3) [type]")
  await sleep(2000)
  let proximo = await Pupt.$byText(page, 'Next')
  await proximo.click()
  await sleep(2000)
  Pupt.checkRadio(page, ".GNVPVGB-Ji-l .GNVPVGB-Ji-k:nth-of-type(2) [type]", 1)

  let proximo2 = await Pupt.$byText(page, 'Next')
  await proximo2.click()
  await sleep(3000)
  let enviar = await Pupt.$byText(page, 'Submit')
  await enviar.click()
  await sleep(3000)
  console.log(tag, 'Done')
}
