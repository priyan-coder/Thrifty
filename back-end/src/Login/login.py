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
            projections = { "_id" : 0}
            print(query)
            docs = MongoUtils.get_docs_from_mongo(query = query, projections = projections,
                                           collection_name = "users",
                                           db_name = "thriftstore")
            if len(docs):
                return {"is_current_user" : True, "user_info" : docs}
        return {"is_current_user" : False, "user_info" : None}



    @staticmethod
    def sign_up(firstname,email_id,password):
        resp = {}
        if firstname.strip() != '' and password!= '' and email_id != '':
            docs = MongoUtils.get_docs_from_mongo(query = { "Email_id" : email_id},
                                           collection_name = "users",
                                           db_name = "thriftstore")
            if len(docs):
                resp = {"created_new_user" : False}
            else:
                doc_to_insert = {}
                doc_id = ObjectId()
                doc_to_insert["_id"] = doc_id
                doc_to_insert["User_name"] = firstname
                doc_to_insert['Email_id'] = email_id
                doc_to_insert['Password'] = password
                doc_to_insert['User_id'] = str(doc_id)
                doc_to_insert['cartItems'] = []
                doc_to_insert['userReviews'] = []
                doc_to_insert['reviewsToDo'] = []
                MongoUtils.insert_docs(docs_to_insert=doc_to_insert, collection_name="users",db_name="thriftstore")
                resp = {"created_new_user" : True}
        return resp







