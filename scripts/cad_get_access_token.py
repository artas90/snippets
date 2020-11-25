#!/usr/bin/env python3
import os
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.common.by import By

# -- read params --
APP_EMAIL = os.environ.get('APP_EMAIL')
APP_PASSWORD = os.environ.get('APP_PASSWORD')
app_ENV_URL = os.environ.get('app_ENV_URL') # e.g.: https://qa-app.appreon.com
if not APP_EMAIL or not APP_PASSWORD or not app_ENV_URL:
  print('Please set APP_EMAIL, APP_PASSWORD and app_ENV_URL environment variables')
  sys.exit()

# -- setup driver --
chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)
driver.get(app_ENV_URL)

# -- shortcut to wait page --
def wait_until(by, value, delay = 15):
  conditions = expected_conditions.presence_of_element_located((by, value))
  return WebDriverWait(driver, delay).until(conditions)

# -- start login process --
wait_until(By.ID, 'login-page-wrapper')
driver.find_element_by_xpath( "//*[@data-automation='app-login-page__btn']").click()

# -- login --
wait_until(By.XPATH, "//form[contains(@action,'OnePass/MainPage')]")
driver.find_element_by_id("userName").send_keys(APP_EMAIL)
driver.find_element_by_id("password").send_keys(APP_PASSWORD)
driver.find_element_by_id("loginButton").click()

# -- get accessToken --
wait_until(By.TAG_NAME, "app-app-platform")
accessToken = driver.execute_script("return window.localStorage.getItem('accessToken')")
sys.stdout.write(accessToken)

# how to install:
# > brew cask install chromedriver
# > pip3 install selenium
# > ln -sfv ./app_get_access_token.py /usr/local/bin/app_get_access_token
# > chmod +x /usr/local/bin/app_get_access_token
