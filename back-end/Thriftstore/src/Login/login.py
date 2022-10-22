from utils.MongoUtils import MongoUtils


class Login():

    @staticmethod
    def login_user(email_id,password):

        if email_id and password:
            docs = MongoUtils.get_docs_from_mongo(query = { "Email_id" : email_id, "Password" : password },
                                           collection_name = "users",
                                           db_name = "thriftstore")
            if len(docs):
                return {"is_current_user" : True}
        return {"is_current_user" : False}

    @staticmethod
    def sign_up(firstname,lastname,email_id,password,usertype):
        if firstname.strip() != '' and lastname!= '' and password!= '' and usertype!= '':
            docs = MongoUtils.get_docs_from_mongo(query = { "Email_id" : email_id, "first_name" : firstname, "Last_name" : lastname},
                                           collection_name = "users",
                                           db_name = "thriftstore")
            if len(docs):
                return {"user_in_db" : True}
        return {"user_in_db" : False}






