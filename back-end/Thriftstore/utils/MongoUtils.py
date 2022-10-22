"""
MongoUtils
"""

from bson import ObjectId

from pymongo import MongoClient
import pymongo


from constants.constants import Constants

import time



class MongoUtils():
    '''
    class
    '''
    __instance = None

    @staticmethod
    def get_instance():
        """ Static access method. """
        if MongoUtils.__instance is None:
            MongoUtils()
        return MongoUtils.__instance

    def __init__(self):
        if MongoUtils.__instance is not None:
            raise Exception("Already initialized Config")
        else:
            self.client = MongoClient(host="mongodb+srv://cluster0:IGse4gcJ9nNTj2VH@cluster0.gd0ksur.mongodb.net/admin?replicaSet=atlas-13msyn-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1")
            MongoUtils.__instance = self

    @staticmethod
    def get_docs_from_mongo(query: object =None, projections: object = None, collection_name: object = None, db_name: object = None) -> object:
        """
        method
        """
        mongo_util = MongoUtils.get_instance()
        client = mongo_util.client

        db = client.get_database(db_name)
        collection = db.get_collection(collection_name)

        data = collection.find(query, projections)
        data = [doc for doc in data]

        '''
        data = []
        last_id = None
        # if CONFIG.get_build_model_local():
        #     data = collection.find({"type":"faq", "text" : {"$exists" : True}}, projections)
        #     data = [doc for doc in data]
        # else:
    
        chunks = range(0,collection.find({}, {}).count(),40000)
        for i in range(len(chunks)):
            docs, last_id = idlimit(40000,last_id=last_id,projections=projections,collection=collection)
            if docs is not None:
                data.extend(docs)
        '''
        return data

    '''
    def idlimit(page_size, last_id=None, projections=None,collection=None):
        """Function returns `page_size` number of documents after last_id
        and the new last_id.
        """
    
        if last_id is None:
            cursor = collection.find({Constants.PROCESSED_TEXT : {"$exists" : True},
                                        Constants.DELETED_BY_RECRUITER: { "$exists": False }}, projections).sort([("_id", pymongo.ASCENDING)]).limit(page_size)
        else:
            cursor = collection.find({'_id': {'$gt': last_id},Constants.PROCESSED_TEXT : {"$exists" : True},
                                        Constants.DELETED_BY_RECRUITER: { "$exists": False }}, projections).sort([("_id", pymongo.ASCENDING)]).limit(page_size)
    
        data = [x for x in cursor]
    
        if not data:
            return None, None
    
        last_id = data[-1][Constants.ID]
    
        return data, last_id
    '''


    @staticmethod
    def update_docs_wth_key(query = None, insert_key = None, insert_value = None, collection_name = None, db_name=None):
        mongo_util = MongoUtils.get_instance()
        client = mongo_util.client
        db = client.get_database(collection_name)
        collection = db.get_collection(db_name)
        collection.update(query, {'$set': {insert_key:insert_value}}, multi=True)


    @staticmethod
    def insert_docs(docs_to_insert = None, collection_name = None, db_name=None):
        mongo_util = MongoUtils.get_instance()
        client = mongo_util.client
        db = client.get_database(db_name)
        collection = db.get_collection(collection_name)
        if isinstance(docs_to_insert,list):
            collection.insert_many(docs_to_insert)
        elif isinstance(docs_to_insert,dict):
            collection.insert_one(docs_to_insert)


    '''
    
    def get_docs(query = None, projection=None, collection_name = None, site_type = None,sort_field=None,sort_by=None):
        mongo_util = MongoUtils.get_instance()
        client = mongo_util.client
        db = client.get_database(CONFIG.get_config_value(Constants.DB_CONFIGS, Constants.DB_DATABASE_CHATBOT))
        if collection_name is not None:
            if site_type is not None:
                collection = db.get_collection(CONFIG.get_config_value(Constants.DB_CONFIGS, collection_name + "_" + site_type))
            else:
                collection = db.get_collection(CONFIG.get_config_value(Constants.DB_CONFIGS, collection_name))
            if sort_field is not None:
                sort_by = pymongo.ASCENDING if sort_by == 1 else pymongo.DESCENDING
                cursor = collection.find(query, projection).sort([(sort_field,sort_by)])
            else:
                cursor = collection.find(query, projection)
            data = [doc for doc in cursor]
        else:
            collections = db.collection_names()
            data = set()
            for collection in collections:
                if collection != "system.profile":
                    collection = db.get_collection(collection)
                    cursor = collection.find(query, projection)
                    for doc in cursor:
                        data.add(doc.get('query'))
        return data
    '''


if __name__ == '__main__':
    # get_entities_from_mongo()
    print("hi")



