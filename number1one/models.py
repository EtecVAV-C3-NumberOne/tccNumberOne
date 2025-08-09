from number1one import db, login_manager
from datetime import datetime
from flask_login import UserMixin

from number1one import db, login_manager
@login_manager.user_loader
def load_usuario(user_id):
    return Usuario.query.get(int(user_id))


class Usuario(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String, unique=True, nullable=False)
    user_email = db.Column(db.String, unique=True, nullable=False)
    user_password = db.Column(db.String, nullable=False)
    user_function = db.Column(db.String, default='Guest')
    