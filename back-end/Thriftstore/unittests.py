"""
UnitTest Class
"""

import unittest
from Login.login import Login

class Testing(unittest.TestCase):


    def test_login_1(self):
        '''
        Unit test case 1 to test User Login
        :return:
        '''
        self.assertEqual(Login.login_user("xyz@blabla.com","qwertyuiop"),{"is_current_user" : True})
        self.assertEqual(Login.login_user("abc@blabla.com","qwertyuiop"),{"is_current_user" : False})

    def test_login_2(self):
        '''
        Unit test case 2 to test User Login
        :return:
        '''
        self.assertNotEqual(Login.login_user("abc@blabla.com","qwertyuiop"),{"is_current_user" : True})


    def test_signup_1(self):
        '''
        Unit test case 1 to test User SignUp
        :return:
        '''
        self.assertEqual(Login.sign_up("zain","ram","xyz@blabla.com","qwertyuiop","buyer"),{"created_new_user" : False})

    def test_signup_2(self):
        '''
        Unit test case 2 to test User SignUp
        :return:
        '''
        self.assertEqual(Login.sign_up("zain","shamm","xyz@blabla.com","qwertyuiop","buyer"),{"created_new_user" : True})

if __name__ == '__main__':
    unittest.main()
