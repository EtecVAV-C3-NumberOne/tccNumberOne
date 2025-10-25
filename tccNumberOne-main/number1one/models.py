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
    user_function = db.Column(db.String, default='user')
    
    progresso = db.relationship('Progresso', backref='usuario', lazy=True)

class Curso(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    curso = db.Column(db.String, unique=True, nullable = False)

    materias = db.relationship('Materia', backref='curso', lazy=True)

class Materia(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    materia = db.Column(db.String, unique=True, nullable = False)
    curso_id = db.Column(db.Integer, db.ForeignKey('curso.id'), nullable = False)
    aulas = db.relationship('Aula', backref='materia', lazy=True)

class Aula(db.Model):

    id = db.Column(db.Integer, primary_key = True)
    aula = db.Column(db.String, nullable = False)
    materia_id = db.Column(db.Integer, db.ForeignKey('materia.id'), nullable = False)

    progresso = db.relationship('Progresso', backref='aula', lazy=True)


class Progresso(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    aula_id = db.Column(db.Integer, db.ForeignKey('aula.id'), nullable=False)

    concluida = db.Column(db.Boolean, nullable=False, default=0.0) # 0 ou 1
    