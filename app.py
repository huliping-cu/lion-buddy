from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, session, abort, redirect
import flask
from flask_cors import CORS

import os
import pathlib
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import requests

app = Flask(__name__)
CORS(app)
app.secret_key = "LionBuddy.com"

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

GOOGLE_CLIENT_ID = "60539441854-ghmfl17prq4gqgpcvgbt2l5o476p4r3k.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri= 'http://127.0.0.1:5000/callback'
    # redirect_uri = 'https://lionbuddy.herokuapp.com/callback'
    )


#cuisines = ['american', 'chinese', 'french', 'indian', 'italian', 'japanese', 'korean', 'mexican', 'thai', 'vietnamese']
cuisines = [{'type':'american','url':'../static/images/restaurantpic/american.jpg'},
{'type':'chinese','url':'../static/images/restaurantpic/chinese.jpg'},
{'type':'french','url':'../static/images/restaurantpic/french.jpg'},
{'type':'indian','url':'../static/images/restaurantpic/indian.jpg'},
{'type':'italian','url':'../static/images/restaurantpic/italian.jpg'},
{'type':'japanese','url':'../static/images/restaurantpic/japanese.jpg'},
{'type':'korean','url':'../static/images/restaurantpic/korean.jpg'},
{'type':'mexican','url':'../static/images/restaurantpic/mexican.jpg'},
{'type':'thai','url':'../static/images/restaurantpic/thai.jpg'},
{'type':'vietnamese','url':'../static/images/restaurantpic/vietnamese.jpg'}]    

# Login
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session['state'] = state
    return redirect(authorization_url)

@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    # if not session['state'] == request.args['state']:
    #     abort(500)

    print(session['state'])
    print(request.args['state'])

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )
    print("\n\n id_info: ", id_info,"\n\n")
    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    session["firstName"] = id_info.get("given_name")
    session["lastName"] = id_info.get("family_name")
    session['email'] = id_info.get("email")
    session["picture"] = id_info.get("picture")
    return redirect("/home")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route('/home')
def home():
    data = {}
    data = {x:session[x] for x in session.keys()}
    return render_template('home.html', data=data, sessionData=data)


@app.route('/restaurant')
def restaurant_homepage():
    global cuisines
    sessionData = {}
    sessionData = {x:session[x] for x in session.keys()}
    return render_template('restaurant_homepage.html', cuisines=cuisines, sessionData=sessionData)


@app.route('/restaurant/<cuisine>')
def restaurant_detail(cuisine):
    sessionData = {}
    sessionData = {x:session[x] for x in session.keys()}
    return render_template('restaurant_detail.html', cuisine=cuisine, sessionData=sessionData)


@app.route('/match')
def match():
    sessionData = {}
    sessionData = {x:session[x] for x in session.keys()}
    return render_template('match.html', email=session['email'], sessionData=sessionData)


@app.route('/request/<email>')
def request_received(email):
    sessionData = {}
    sessionData = {x:session[x] for x in session.keys()}
    return render_template('request.html', receiver_email=session['email'], receiver_name=session["name"], requester_email=email, sessionData=sessionData)


if __name__ == '__main__':
   app.run(debug = True)

