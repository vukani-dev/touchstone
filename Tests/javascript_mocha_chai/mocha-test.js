const {
  Builder,
  By,
  Keys,
  until
} = require('selenium-webdriver');
const {
  expect
} = require('chai');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

describe('Touchstone Test', () => {
  const driver = new Builder().forBrowser('firefox').build();
  const username = 'HeroAccount';
  const password = '123';
  const heroes = []

  beforeEach(async () => {


  });
  ``
  it('Registration', async () => {
    await driver.get('http://localhost:4200');
    driver.manage().window().maximize()

    await driver.wait(until.elementLocated(By.id('registerBtn'))).then(el => el.click());

    await driver.findElement(By.name("fname")).sendKeys('Hero')
    await driver.findElement(By.name("lname")).sendKeys('Yuusha')
    await driver.findElement(By.name("username")).sendKeys(username)
    await driver.findElement(By.name("password")).sendKeys(password)
    await driver.findElement(By.name("cpassword")).sendKeys(password)
    await driver.findElement(By.xpath("//*[contains(text(), 'REGISTER')]")).then(el => el.click());
    let el = await driver.findElement(By.xpath("//*[contains(text(), 'has been created!')]"));
    await driver.wait(until.elementIsVisible(el), 10000);

    await el.getText().then(text => console.log(text))
  });


  it('Login', async () => {
    const loginBtn = await driver.wait(until.elementLocated(By.id('loginBtn')));
    await driver.findElement(By.name("username")).sendKeys('username')
    await driver.findElement(By.name("password")).sendKeys('password')

    await loginBtn.click()
    await driver.findElement(By.className("errorBtn")).getText().then(text => expect(text).to.equal('Invalid Username or Password'))

    await driver.findElement(By.name("username")).clear()
    await driver.findElement(By.name("password")).clear()

    await driver.findElement(By.name("username")).sendKeys(username)
    await driver.findElement(By.name("password")).sendKeys(password)

    await loginBtn.click()

    const url = await driver.getCurrentUrl();
    var urlArray = url.split('/')
    expect(urlArray[3]).to.equal('start')

  });

  it('Hiring a Hero', async () => {

    for (var i = 0; i < 3; i++) {
      var index = (i + 1).toString()
      console.log('clicking ' + index)

      const baseXpath = "//html/body/section/app-root/div[2]/div/div/div/app-start/mat-accordion/li[" + index + "]"
      var hero = {
        name: "",
        price: ""
      }
      await driver.findElement(By.xpath(baseXpath)).click()
      await driver.sleep(2000)

      await driver.findElement(By.xpath(baseXpath + "/mat-expansion-panel/div/div/h2")).getText().then(text => hero.name = text)
      await driver.findElement(By.xpath(baseXpath + "/mat-expansion-panel/div/div/p[2]")).getText().then(text => hero.price = text.split("money")[0].split(" ")[1])
      await driver.findElement(By.xpath(baseXpath + "/mat-expansion-panel/div/div/p[3]/mat-action-row/button/span")).then(el => {
        el.click()
      })
      heroes.push(hero);
    }

    console.log(heroes)
  });

  it('Viewing Heroes', async () => {
    let menu = await driver.findElement(By.id('menuBtn'));
    await driver.wait(until.elementIsVisible(menu), 10000);
    await driver.executeScript("arguments[0].scrollIntoView(true)",menu)

    await driver.executeScript("arguments[0].click()",menu)

    let mymenu = await driver.findElement(By.id('myHeroesBtn'));
    await driver.wait(until.elementIsVisible(mymenu), 10000);
    await driver.executeScript("arguments[0].click()",mymenu)


    await driver.sleep(3000)
    await driver.findElement(By.name("pageName")).getText().then(text => expect(text).to.equal(username + "'s Heroes"))
    await driver.findElements(By.id("heroItem")).then(elements => {
      expect(elements.length).to.equal(heroes.length)
    })

    var total = 0
    for (var i = 0; i < 3; i++) {
      var index = (i + 1).toString()
      await driver.findElement(By.xpath("//html/body/section/app-root/div[2]/div/div/div/app-my-heroes/div[1]/mat-list/mat-list-item[" + index + "]/div/div[2]/h3")).getText()
        .then(text => expect(text).to.equal(heroes[i].name))

      var money = parseInt(heroes[i].price)
      total = total + money
    }
    await driver.findElement(By.id("totalPrice")).getText().then(text => {
      var totalMoney = parseInt(text.split("money")[0].split(" ")[2])
      expect(totalMoney).to.equal(total)
    })

    await driver.findElements(By.xpath("//input[@type='checkbox']")).then(elements => {
      elements[1].click()
    })
    await driver.sleep(2000)


    await driver.findElement(By.id("totalPrice")).getText().then(text => {
      var totalMoney = parseInt(text.split("money")[0].split(" ")[2])
      expect(totalMoney).to.equal(total - 20)
    })
  });

  after(async () => driver.quit());
});
