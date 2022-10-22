"""
HTTP Helper Doc
"""
import json
import requests
from urllib3.exceptions import HTTPError
#from utils.logging_util import Logger

from pymongo import MongoClient
#logger = Logger.get_instance()

def post(url, data={}):
    """
    HTTP Doc
    """
    try:
        val_response = requests.post(url, json=data)
        response_obj = val_response.json()
        return response_obj

    except HTTPError as e:
        print(e)
        return json.loads('{}')

def post_data(url, data, timeout=None):
    """
        HTTP Doc
        """
    try:
        if timeout:
            val_response = requests.post(url, data=data, timeout=timeout)
        else:
            val_response = requests.post(url, data=data)
        response_obj = val_response.json()
        return response_obj

    except HTTPError as e:
        print(e)
        return json.loads('{}')



def get(url, params=None, headers=None,verify=True):
    """
    HTTP Doc
    :param url:
    :param params:
    :return:
    """
    try:
        val_response = requests.get(url, params=params, headers=headers, verify=verify)
        response_obj = val_response.json()
        return response_obj
    except HTTPError as e:
        print(e)
        return json.loads('{}')

def postlocal(url, data={}):
    """
    HTTP Doc
    """
    try:
        val_response = requests.post(url, json=data)
        response_obj = val_response.json()
        return response_obj

    except HTTPError as e:
        print(e)
        return json.loads('{}')

def getfile(url, local_filename):
    """
    HTTP Doc
    """
    try:
        logger.logger.info("in get file")
        req_ = requests.get(url=url, stream=True)
        with open(local_filename, 'wb') as f:
            logger.logger.info("before writing file")
            for chunk in req_.iter_content(chunk_size=1024):
                if chunk:  # filter out keep-alive new chunks
                    logger.logger.debug("writing file")
                    f.write(chunk)
            logger.logger.info("after writing file")
            return "loaded"
    except HTTPError as e:
        print(e)
        logger.logger.info("writing file failed")
        return json.loads('{}')




if __name__ == '__main__':
    client = MongoClient("mongodb+srv://cluster0:IGse4gcJ9nNTj2VH@cluster0.gd0ksur.mongodb.net/admin?replicaSet=atlas-13msyn-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1");
    #print("test")
    x = 1
    print("Connection Successful")
    client.close()

