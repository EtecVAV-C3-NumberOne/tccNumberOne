from number1one import db, app
from number1one.models import Usuario

with app.app_context():
    db.create_all()