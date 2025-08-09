from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, FileField
from wtforms.validators import DataRequired, Email, EqualTo, Length, ValidationError, Regexp
from number1one.models import Usuario

class LoginForm(FlaskForm):
    email = StringField('E-mail: ', validators=[DataRequired(), Email(message='Por favor, insira um endereço de e-mail válido.')])
    password = PasswordField('Senha: ', validators=[DataRequired()])
    submit_button = SubmitField('Entrar')
    
  
class RegisterForm(FlaskForm):
    email = StringField('E-mail ', validators=[DataRequired(), Email(message='Por favor, insira um endereço de e-mail válido.')])
    username = StringField('Usuário', validators=[DataRequired(), Length(min=5, max=20, message = "Mínimo de 5 caracteres e máximo de 20."), Regexp(r'^[a-zA-Z0-9_!@#$%^&*()\-+=<>?/.]+$', message='Somente caracteres, números, underlines e símbolos permitidos.')])
    password = PasswordField('Senha ', validators=[DataRequired(), Length(min=6, message='Mínimo de 6 caracteres.')])
    confirm_password = PasswordField('Confirmar Senha ', validators=[DataRequired(), EqualTo('password', message='As senhas devem corresponder.')])
    submit_button = SubmitField('Criar Conta')

    def validate_email(self, email):
        usuario = Usuario.query.filter_by(user_email=email.data).first()
        if usuario:
            raise ValidationError('E-mail já cadastrado.')
    
    def validate_username(self, username):
        usuario = Usuario.query.filter_by(user_name=username.data).first()
        if usuario:
            raise ValidationError('Usuário já cadastrado.')
    

        
        
        
