from utils.MongoUtils import MongoUtils


class Search():

    @staticmethod
    def get_search_results(category):
        if category is not None:
            query = {"category" : category}
            projections = {"_id" : 0}
            docs = MongoUtils.get_docs_from_mongo(query=query, projections=projections,collection_name="products",db_name="thriftstore")

            return {"response" : docs}

        return {"response" : []}












