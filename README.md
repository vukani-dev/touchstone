# Touchstone - a simple UI Automation Test
<img src="touchstone.png" alt="drawing" width="100"/>

## Test Parts:

1. Registration
2. Login
3. Hiring a Hero
4. Viewing Heroes
5. The End


#### Registration
* Navigate to Registration page
* Fill out form with information
* Complete Registration
* Confirm registration was successful **(via snackbar)**
  * Snackbar message will be: ``` User [Username] has been created! ```

#### Login
* Try to login with incorrect credentials
  - Confirm error message populates as ```Invalid Username or Password```
* Login using account created from ```Registration``` step
* Confirm you successfully logged in using the **URL**
  * URL should contain ```start```

#### Hiring a Hero
* Hire any 3 Heroes on the page
  - You can hire heroes by selected a Hero from the expandable list
  - Then pressing the corresponding ```Hire``` button for that Hero
* Make note of the heroes you hire as you will need them later **(Name and Price)**

#### Viewing Heroes
* Navigate to the **My Heroes** Page by selecting it from the menu in top left corner of screen
* Confirm the screen successfully recognizes your username (via toolbar e.g Tester's Heroes)
* Confirm that there are 3 Heroes listed on the page
  - Ensure the heroes listed match the heroes you added in ```Hiring a Hero``` step
  - Check to see if the ```Total Price``` listed on the page is equivelent to the total price of the heroes you added in ```Hiring a Hero``` step
* Select the middle ```Discount!``` Checkbox
  - Confirm that when selected the checkbox removes ```20``` from ```Total Price```


### The End
* Thats it!
* ***touchstone (touch·​stone | \ ˈtəch-ˌstōn  \)***
  *  A test or criterion for determining the quality or genuineness of a thing

### Contribution
* Fork it
* Use selenium or w.e to make a script that will automate the test parts
* Put it in its own directory under the **Test** directory
    * it should be named something descriptive
* Submit a pull request
