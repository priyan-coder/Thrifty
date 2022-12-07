"""
UnitTest Class
"""
import unittest
from Login.login import Login
from Search.product_search import Search
from User.User import User

class Testing(unittest.TestCase):


    def test_login_1(self):
        '''
        Unit test case 1 to test User Login
        :return:
        '''
        self.assertEqual(Login.login_user("xyz@blabla.com","qwertyuiop"),{"is_current_user" : True})

    def test_login_11(self):
        '''
        Unit test case 11 to test User Login
        :return:
        '''
        self.assertEqual(Login.login_user("abc@blablaaa.com","qwertyuiop"),{"is_current_user" : False})

    def test_login_2(self):
        '''
        Unit test case 2 to test User Login
        :return:
        '''
        self.assertNotEqual(Login.login_user("abc@blabbbla.com","qwertyuiop"),{"is_current_user" : True})


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
        self.assertEqual(Login.sign_up("zainn","Keen","xyz@bllabla.com","qwertyuiop","seller"),{"created_new_user" : True})


    def test_search_1(self):
        '''
        Unit test case 2 to test User SignUp
        :return:
        '''
        self.assertIsInstance(Search.get_search_results("jewelry"),dict,"Is an instace of dict")

    def test_search_2(self):
        '''
        Unit test case 2 to test User SignUp
        :return:
        '''
        self.assertNotIsInstance(Search.get_search_results("jewelry"),list,"Is not an instace of list")

    def test_user_1(self):
        '''
        Unit test case 2 to test User SignUp
        :return:
        '''
        self.assertNotIsInstance(Search.get_search_results("pants"),list,"Is not an instace of list")

if __name__ == '__main__':
    unittest.main()
