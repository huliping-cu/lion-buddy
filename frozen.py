from flask_frozen import Freezer
from app import app

freezer = Freezer(app)

cuisines = ['american', 'chinese', 'french', 'indian', 'italian', 'japanese', 'korean', 'mexican', 'thai', 'vietnamese']

@freezer.register_generator
def restaurant_detail():
    for cuisine in cuisines:
        yield {'cuisine': cuisine}

if __name__ == '__main__':
    freezer.freeze()