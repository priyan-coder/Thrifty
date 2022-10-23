"""
Login Class
"""

from utils.MongoUtils import MongoUtils
from bson import ObjectId

class Login():

    @staticmethod
    def login_user(email_id,password):

        if email_id and password:
            query = { "Email_id" : email_id, "Password" : password }
            print(query)
            docs = MongoUtils.get_docs_from_mongo(query = query,
                                           collection_name = "users",
                                           db_name = "thriftstore")
            if len(docs):
                return {"is_current_user" : True}
        return {"is_current_user" : False}


    @staticmethod
    def sign_up(firstname,lastname,email_id,password,usertype):
        resp = {}
        if firstname.strip() != '' and lastname!= '' and password!= '' and usertype!= '':
            docs = MongoUtils.get_docs_from_mongo(query = { "Email_id" : email_id, "First_name" : firstname,
                                                            "Last_name" : lastname,"User_type":usertype},
                                           collection_name = "users",
                                           db_name = "thriftstore")
            if len(docs):
                resp = {"created_new_user" : False}
            else:
                doc_to_insert = {}
                doc_id = ObjectId()
                doc_to_insert["_id"] = doc_id
                doc_to_insert["First_name"] = firstname
                doc_to_insert['Last_name'] = lastname
                doc_to_insert['Email_id'] = email_id
                doc_to_insert['Password'] = password
                doc_to_insert['User_type'] = usertype
                doc_to_insert['User_id'] = str(doc_id)
                doc_to_insert['Products_in_cart'] = []
                doc_to_insert['Favorites'] = []
                doc_to_insert['Payment_details'] = {}
                MongoUtils.insert_docs(docs_to_insert=doc_to_insert, collection_name="users",db_name="thriftstore")
                resp = {"created_new_user" : True}
        return resp



