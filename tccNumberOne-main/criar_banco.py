from number1one import db, app
from number1one.models import Usuario, Curso, Materia, Aula, Progresso

with app.app_context():
    db.create_all()