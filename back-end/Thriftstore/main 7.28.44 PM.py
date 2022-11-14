# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

from klein import Klein
from constants.constants import Constants
from Login.login import Login
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

        '''
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
        '''
        print("received request")
        request_params = Controller.decode_request(request)

        email = request_params.get(Constants.EMAIL_ID) if Constants.EMAIL_ID in request_params else None
        password = request_params.get(Constants.PASSWORD) if Constants.PASSWORD in request_params else None

        login = Login()
        resp = login.login_user(email_id=email,password=password)
        return json.dumps(resp)

    @app.route("/sign_up", methods=[Constants.POST, Constants.GET, Constants.OPTIONS])
    def sign_up(self,request=None):

        '''
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
        '''
        print("received request")
        request_params = Controller.decode_request(request)

        first_name = request_params.get(Constants.FIRSTNAME) if Constants.FIRSTNAME in request_params else None
        last_name = request_params.get(Constants.LASTNAME) if Constants.LASTNAME in request_params else None
        email = request_params.get(Constants.EMAIL_ID) if Constants.EMAIL_ID in request_params else None
        password = request_params.get(Constants.PASSWORD) if Constants.PASSWORD in request_params else None
        usertype = request_params.get(Constants.USER_TYPE) if Constants.USER_TYPE in request_params else None

        login = Login()
        resp = login.sign_up(firstname=first_name,lastname=last_name,email_id=email,password=password,usertype=usertype)
        return json.dumps(resp)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')
    controller = Controller()
    #controller.app.run(CONFIG.get_socket_host(), CONFIG.get_socket_port())
    controller.app.run("0.0.0.0", 8080)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
