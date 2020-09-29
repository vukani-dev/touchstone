import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time 

class Touchstone(unittest.TestCase):
    unittest.TestLoader.sortTestMethodsUsing = None
    driver = webdriver.Firefox()

    driver.maximize_window()

    driver.get('http://localhost:4200')
    username = 'HeroAccount'
    password = '123'
    heroes = []

    def setUp(self):

        self.wait = WebDriverWait(self.driver, 10)

        #self.addCleanup(self.driver.quit)

    def test01Registration(self):
        registerBtn = self.wait.until(
            EC.element_to_be_clickable((By.ID, "registerBtn"))
        )
        registerBtn.click()

        self.driver.find_element_by_name('fname').send_keys('Hero')
        self.driver.find_element_by_name('lname').send_keys('Yuusha')
        self.driver.find_element_by_name('username').send_keys(self.username)
        self.driver.find_element_by_name('password').send_keys(self.password)
        self.driver.find_element_by_name('cpassword').send_keys(self.password)
        self.driver.find_element_by_xpath("//*[contains(text(), 'REGISTER')]").click()
        confirmText = 'User '+ self.username + ' has been created!'

        registerConfirm = self.wait.until(
            EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'has been created!')]"))
        )
        self.assertEqual(confirmText, registerConfirm.text)

    def test02Login(self):
        self.driver.find_element_by_name('username').send_keys('username')
        self.driver.find_element_by_name('password').send_keys('password')

        loginButton = self.driver.find_element_by_id('loginBtn')
        loginButton.click()
        errorButton = self.driver.find_element_by_class_name('errorBtn')
        self.assertIn(errorButton.text, 'Invalid Username or Password')

        self.driver.find_element_by_name('username').clear()
        self.driver.find_element_by_name('password').clear()

        self.driver.find_element_by_name('username').send_keys(self.username)
        self.driver.find_element_by_name('password').send_keys(self.password)
        loginButton.click()

        url = self.driver.current_url
        url_array = url.split('/')
        self.assertEqual(url_array[3], 'start')

    def test03HiringAHero(self):
        hero_list = self.driver.find_elements_by_xpath("//li")
        for hero_el in hero_list[:3]:
            hero_el.click()
            time.sleep(1)
            name = hero_el.find_element_by_xpath(".//h2")
            hero_name = name.text
            price = hero_el.find_elements_by_xpath(".//p")
            hero_price = price[1].text.replace('money','').split(' ')[1]
            
            hireButton = hero_el.find_element_by_xpath(".//button[@class='mat-fab mat-primary']")
            hireButton.click()
            self.heroes.append({"name": hero_name, "price": hero_price })

    def test04ViewingHeroes(self):
        self.driver.find_element_by_id('menuBtn').click()
        self.driver.find_element_by_id('myHeroesBtn').click()

        page_name = self.driver.find_element_by_name('pageName')
        self.assertEqual(page_name.text, self.username + "'s Heroes")
        hero_items = self.driver.find_elements_by_id('heroItem')
        print(len(hero_items))
        self.assertEqual(len(hero_items), len(self.heroes))
        total = 0
        for index, hero_item in enumerate(hero_items):
            hero_item_name = hero_item.find_element_by_xpath('.//h3')

            self.assertEqual(hero_item_name.text, self.heroes[index]["name"])
            money = int(self.heroes[index]["price"])
            total = total + money

        total_price = self.driver.find_element_by_id('totalPrice')
        self.assertEqual(total_price.text.split(' ')[2], str(total))

        checkbox = self.driver.find_elements_by_xpath("//input[@type='checkbox']")
        checkbox[1].click()

        time.sleep(3)

        self.assertEqual(total_price.text.split(' ')[2], str(total-20))



        


if __name__ == '__main__':
    unittest.main(verbosity=2)
