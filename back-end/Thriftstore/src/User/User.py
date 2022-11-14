
from utils.MongoUtils import MongoUtils

class User():

    @staticmethod
    def get_products_in_cart(user_id = None):
        if user_id is not None:
            query = {"User_id": user_id}
            print(query)
            docs = MongoUtils.get_docs_from_mongo(query=query,
                                                      collection_name="users",
                                                      db_name="thriftstore")
            if docs:
                return docs
        return {}

    @staticmethod
    def update_products_in_cart(user_id=None,products=None):
        if user_id is not None:
            query = {"User_id" : user_id}


            MongoUtils.update_docs_wth_key(query=query, insert_key="Products_in_cart", insert_value=products,
                                           collection_name="users", db_name="thriftstore")

            return {"update_cart" : True}
        return {"update_cart" : False}

    @staticmethod
    def add_sale_posts(user_id=None,products=None):
        if user_id is not None:
            query = {"User_id" : user_id}
            MongoUtils.update_docs_wth_key(query=query, insert_key="sale_products", insert_value=products,
                                           collection_name="users", db_name="thriftstore")

            MongoUtils.insert_docs(products, collection_name="products",db_name="thriftstore")

            return {"updated_in_products" : True}
        return {"updated_in_products" : False}
