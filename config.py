class Config:
    DEBUG = False
    DEVELOPMENT = False
    REDIRECT_URI = 'http://127.0.0.1:5000/callback.html'

class ProductionConfig(Config):
    REDIRECT_URI = 'https://lionbuddy.herokuapp.com/callback.html'

class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True