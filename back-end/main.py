# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

from klein import Klein
from constants.constants import Constants
from Login.login import Login
from User.User import User
from Search.product_search import Search
import json


def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press ⌘F8 to toggle the breakpoint.



class Controller():

    app = Klein()

    @app.route("/health", methods=["GET"])
    def test(self, request):
        return "Service Running"

    @staticmethod
    def add_required_headers(request):
        '''
        doc
        '''
        request.setHeader('Content-Type', 'application/json')
        request.setHeader('Access-Control-Allow-Methods', Constants.POST)
        request.setHeader("Access-Control-Expose-Headers",
                          "transfer-encoding,connection,server,date,content-type,access-control-allow-origin,x-final-url")
        request.setHeader('Access-Control-Allow-Origin', "*")
        request.setHeader('Access-Control-Allow-Headers', 'content-type')
        return request

    @staticmethod
    def decode_request(request):
        request = Controller.add_required_headers(request)
        if request.method.decode(Constants.UTF_8, Constants.STRICT) == Constants.GET:
            request_params = {
                key.decode(Constants.UTF_8, Constants.STRICT): value[0].decode(Constants.UTF_8,
                                                                               Constants.STRICT)
                for key, value in request.args.items()}
        elif request.method.decode(Constants.UTF_8, Constants.STRICT) == Constants.OPTIONS:
            return json.dumps({'success': 'ok'})
        else:
            request_params = json.loads(
                request.content.read().decode(Constants.UTF_8, Constants.STRICT))

        return request_params


    @app.route("/login", methods=[Constants.POST, Constants.GET, Constants.OPTIONS])
    def login(self,request=None):

        print("received request")
        request_params = Controller.decode_request(request)

        email = request_params.get(Constants.EMAIL_ID) if Constants.EMAIL_ID in request_params else None
        password = request_params.get(Constants.PASSWORD) if Constants.PASSWORD in request_params else None

        login = Login()
        resp = login.login_user(email_id=email,password=password)
        return json.dumps(resp)

    @app.route("/sign_up", methods=[Constants.POST, Constants.GET, Constants.OPTIONS])
    def sign_up(self,request=None):

        print("received request")
        request_params = Controller.decode_request(request)

        first_name = request_params.get("displayName") if "displayName" in request_params else None
        email = request_params.get(Constants.EMAIL_ID) if Constants.EMAIL_ID in request_params else None
        password = request_params.get(Constants.PASSWORD) if Constants.PASSWORD in request_params else None
        #usertype = request_params.get(Constants.USER_TYPE) if Constants.USER_TYPE in request_params else None

        login = Login()
        resp = login.sign_up(firstname=first_name,email_id=email,password=password)
        return json.dumps(resp)


    @app.route("/products_in_cart", methods=[Constants.POST,Constants.GET, Constants.OPTIONS])
    def get_products_in_cart(self, request=None):
        request_params = Controller.decode_request(request)

        user_id = request_params.get("user_id") if "user_id" in request_params else None
        resp = User.get_products_in_cart(user_id=user_id)
        return json.dumps(resp)


    @app.route("/update_products_in_cart",methods=[Constants.POST,Constants.GET, Constants.OPTIONS])
    def update_products_in_cart(self,request=None):
        request_params = Controller.decode_request(request)
        user_id = request_params.get("user_id") if "user_id" in request_params else None
        products = request_params.get("products")
        resp = User.update_products_in_cart(user_id,products)
        return json.dumps(resp)

    @app.route("/add_sale_posts",methods=[Constants.POST,Constants.GET, Constants.OPTIONS])
    def add_sale_posts(self,request=None):
        request_params = Controller.decode_request(request)
        user_id = request_params.get("user_id") if "user_id" in request_params else None
        products = request_params.get("products")
        resp = User.add_sale_posts(user_id,products)
        return json.dumps(resp)

    @app.route("/category_search",methods=[Constants.POST,Constants.GET, Constants.OPTIONS])
    def category_search_(self,request=None):
        request_params = Controller.decode_request(request)
        category = request_params.get("category") if "category" in request_params else None
        resp = Search.get_search_results(category = category)
        return  json.dumps(resp)


    @app.route("/user_reviews",methods=[Constants.POST,Constants.GET, Constants.OPTIONS])
    def user_reviews(self, request = None):
        request_params = Controller.decode_request(request)
        user_id = request_params.get("user_id") if "user_id" in request_params else None
        resp = User.get_user_reviews(user_id)
        return json.dumps(resp)

    @app.route("/update_reviews",methods=[Constants.POST,Constants.GET, Constants.OPTIONS])
    def update_user_reviews(self, request = None):
        request_params = Controller.decode_request(request)
        reviews = request_params.get("allReviews") if "allReviews" in request_params else None
        resp = User.update_user_reviews(reviews)
        return json.dumps(resp)

    @app.route("/update_user_state",methods=[Constants.POST,Constants.GET, Constants.OPTIONS])
    def update_user_state(self, request = None):
        request_params = Controller.decode_request(request)
        User_id = request_params.get("User_id") if "User_id" in request_params else None
        cartItems = request_params.get("cartItems") if "cartItems" in request_params else None
        reviewsToDo = request_params.get("reviewsToDo") if "reviewsToDo" in request_params else None
        resp = User.log_user_state(User_id,cartItems,reviewsToDo)
        return json.dumps(resp)







# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')
    controller = Controller()
    #controller.app.run(CONFIG.get_socket_host(), CONFIG.get_socket_port())
    controller.app.run("0.0.0.0", 8080)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
