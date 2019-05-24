const chalk = require('chalk')

const Pupt = require('../helpers/pupt')
const sleep = require('../helpers/sleep')

module.exports = async (self, app, metadata) => {
  const page = self.page
  const tag = self.tag + chalk.cyan(' :updateClassification')

  console.log(tag, 'Opening classification page')
  await sleep(1000)
  await page.goto(`${self.PlayURL}#ContentRatingPlace:p=${app.package_name}`)
  await sleep(3000)

  // if (continuar) {
  //   await continuar.click()
  //   await sleep(10000)
  // }

  let continuar = await Pupt.$byText(page, 'Continue')
  let retomar = await Pupt.$byText(page, 'Resume', 'a')
  let comecar = await Pupt.$byText(page, 'Start new questionnaire')
  if (continuar) {
    console.log(tag, 'Starting new classification (first one)')
    await continuar.click()
  } else if (retomar) {
    console.log(tag, 'Resuming classification')
    await retomar.click()
  } else if (comecar) {
    console.log(tag, chalk.green('Creating new classification'))
    await comecar.click()
  } else {
    throw new Error('Failed to start classification!')
    return
  }

  await page.waitForSelector('input[type="email"]')

  // Fill emails
  let els = await page.$$('input[type="email"]')

  for (let el of els) {
    await el.type(metadata.contactEmail)
  }

  const $BASE = 'footer > div > div:nth-child(1)'
  await page.waitForSelector($BASE)

  // Find "Comunicação" button
  await sleep(2000)
  let classification = 'CONTENT AGGREGATORS, CONSUMER STORES'
  let category = await Pupt.$byText(page, classification, 'div[role="button"]')
  if (category) {
    await category.click()
  } else {
    console.log(tag, chalk.green('Category already selected'), category) 
  }

  // Filling "No" in everyone
  let nops = await page.$$('span.gwt-RadioButton > input[type="radio"]')
  await sleep(2000)
  for (let el of nops) {
    let isMatch = await page.evaluate(el => {
      let isVisible = el.offsetWidth > 0 && el.offsetHeight > 0
      let isNop = el.parentElement.textContent.toLowerCase().includes('no')
      if (isVisible && isNop) {
        // console.log(el, el.id)
        // return el.id
        return true
      }
      return false
    }, el)

    if (isMatch) {
      // id = `#${id}`
      // await el._visibleCenter()
      // console.log(tag, 'choosing "Nop"')
      await el.click({delay: 30})
      // await page.evaluate((element) => {
      //   var bounding = element.getBoundingClientRect();
      //   var event = new MouseEvent('click', {
      //       view: document.window,
      //       bubbles: true,
      //       cancelable: true,
      //       clientX: bounding.left + bounding.width / 2,
      //       clientY: bounding.top + bounding.height / 2
      //   });
      //   element.dispatchEvent(event);
      // }, el)

      await sleep(100)
    }
  }

  // Save
  const $BTN_SAVE       = 'footer > div > div:nth-child(1) > button:nth-child(2):not([disabled])'
  const $BTN_CALCULATE  = 'footer > div > div:nth-child(1) > button:nth-child(1):not([disabled])'
  const $BTN_APPLY      = 'footer > div > div:nth-child(2) > button:nth-child(1):not([disabled])'

  // let save = await Pupt.$byText(page, 'Save questionnaire')
  let saved = false
  if (await Pupt.isVisible(page, $BTN_SAVE)) {
    console.log(tag, 'Saving')
    await Pupt.click(page, $BTN_SAVE)
    saved = true
  }

  if (await Pupt.isVisible(page, $BTN_CALCULATE) || saved) {
    console.log(tag, 'Calculating classification')
    await Pupt.click(page, $BTN_CALCULATE)
  }

  // if (await Pupt.isVisible(page, $BTN_APPLY)) {
  console.log(tag, 'Applying classification')
  await sleep(2000)
  await Pupt.waitVisible(page, $BTN_APPLY)
  await sleep(2000)
  await Pupt.click(page, $BTN_APPLY)
  await sleep(2000)
  // }

  // if (save) {
  //   await save.click()
  // }



  // console.log('text:', text)

  // let el = await Pupt.$byText(page, 'No', 'td > div > span.gwt-RadioButton')
  // await (el.)
  // let text = await el.getProperty('innerText')

  // if (text == 'Não') {
  //   await 
  // }
  // let el = await Pupt.$byText(page, 'no', 'span.gwt-RadioButton')
  // if (!el) {
  //   console.error(tag, chalk.red('Could not find button #' + k))
  //   return 
  // }
  // await el.click()
  // await sleep(100)

  console.log(tag, 'Done')
}