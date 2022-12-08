
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

            doc_id = ObjectId()
            products['product_id'] = str(doc_id)
            
            MongoUtils.add_elements_to_array(query=query, insert_key="Posts", insert_value=products,
                                           collection_name="users", db_name="thriftstore")
            products["_id"] = doc_id
            MongoUtils.insert_docs(products, collection_name="products",db_name="thriftstore")

            return {"updated_in_products" : True, "product" : products}
        return {"updated_in_products" : False, "product" : {}}



    @staticmethod
    def get_user_reviews(user_id=None):
        docs = []
        if user_id is not None:
            query = {"User_id" : user_id}
            projection = {"reviews" : 1}
            docs = MongoUtils.get_docs_from_mongo(query=query, projections=projection,
                                                      collection_name="users",
                                                      db_name="thriftstore")
            return docs
        return docs

    '''
    db.animal.update(
        {"_id": "100"},
        {
    $push: {
        animalArray: {
    $each: ['goat'],
    $position: -1
    }
    }
    })
    '''

    @staticmethod
    def update_user_reviews(reviews):
        '''
        {
        sellerId: 123,
        reviewId: 241, // reviewId to be created here in front-end
        ratingValue: 3,
        comment: 'Product was delivered in good condition!',
        userName: 'JosephStones', // currentUser who is logged in and made the review
        User_id: 567 // currentUser who is logged in and made the review
        }
        '''
        if reviews is not None and isinstance(reviews, dict):
            query = {"User_id" : reviews.get("sellerId")}
            insert_value = {'$each' : [reviews], '$position': -1}
            docs = MongoUtils.add_elements_to_array(query=query, insert_key="userReviews", insert_value=insert_value,
                                                    collection_name="users", db_name="thriftstore")
            if len(docs):
                return {"updated_review" : True}
        return {"updated_review" : False}


    @staticmethod
    def log_user_state(User_id, cartItems, reviewsToDo):
        if User_id is not None:
            query = {"User_id" : User_id}
            MongoUtils.update_docs_wth_key(query = query, insert_key="cartItems", insert_value=cartItems)
            MongoUtils.update_docs_wth_key(query = query, insert_key="reviewsToDo", insert_value=reviewsToDo)
            return {"updated_user_state" : True}
        return {"updated_user_state" : False}


















