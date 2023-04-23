import { Selector } from 'testcafe';
import XPathSelector from './XPathSelector';


async function testChooseCurrency(t: TestController) {
  const list = XPathSelector('/html/body/app-root/app-exchange-rate/form/select')
  const option = XPathSelector('/html/body/app-root/app-exchange-rate/form/select/option[8]')
  await t
      .click(list)
      .wait(2000)
      .click(option)
      .expect(list.innerText).contains("AUD")

  console.log("Passed: currency selection")
}

async function testSelectCalendar(t: TestController) {
    const calendar = XPathSelector('/html/body/app-root/app-exchange-rate/form/mat-form-field/div[1]/div[2]/div[2]/mat-datepicker-toggle/button/span[4]')
    const date = XPathSelector('/html/body/div/div[2]/div/mat-datepicker-content/div[2]/mat-calendar/div/mat-month-view/table/tbody/tr[2]/td[3]/button/span[1]')
    const field = XPathSelector('/html/body/app-root/app-exchange-rate/form/mat-form-field/div[1]/div[2]')
    await t
        .click(calendar)
        .wait(2000)
        .click(date)

  
    console.log("Passed: currency selection")
}

async function testGetAverageRate(t: TestController) {
    const button = XPathSelector('/html/body/app-root/app-exchange-rate/form/button[1]')
    const result = XPathSelector('/html/body/app-root/app-exchange-rate/form/div/p')
    await t
        .click(button)
        .wait(2000)
        .expect(result.innerText).contains("2.8904")

  
    console.log("Passed: result")
}



fixture('NBP-CLIENT')
  .page('http://localhost:4200/');

test('test app usage', async t => {
    await testChooseCurrency(t)
    await testSelectCalendar(t)
    await testGetAverageRate(t)
}).timeouts({
  pageLoadTimeout: 10000,
  pageRequestTimeout: 20000,
  ajaxRequestTimeout: 20000,
});



