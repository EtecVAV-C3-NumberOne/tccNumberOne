from flask import render_template, url_for, redirect
from number1one import app, bcrypt, db
from number1one.models import Usuario
from flask_login import login_required, login_user, logout_user, current_user
from number1one.forms import LoginForm, RegisterForm
from werkzeug.utils import secure_filename

@app.route('/')
def landing():
    return render_template('landing_page.html')



@app.route('/login', methods=["GET", "POST"])
def login():
    formLogin = LoginForm()
    if formLogin.validate_on_submit():
        print("FOI PORRA")
        usuario = Usuario.query.filter_by(user_email=formLogin.email.data).first()
        if usuario and bcrypt.check_password_hash(usuario.user_password, formLogin.password.data):
            print('Logou porra')
            login_user(usuario, remember=True)
            return redirect(url_for("home"))
    return render_template('login.html', form = formLogin)

@app.route('/register', methods=["GET", "POST"])
def register():
    formRegister = RegisterForm()
    if formRegister.validate_on_submit():
        senha = bcrypt.generate_password_hash(formRegister.password.data)
        usuario = Usuario(user_name=formRegister.username.data, user_email=formRegister.email.data, user_password=senha)
        db.session.add(usuario)
        db.session.commit()
        login_user(usuario, remember=True)
        return redirect(url_for("home"))

    return render_template('register.html', form = formRegister)


@app.route('/home')
@login_required
def home():
    return render_template('home.html', usuario = current_user)

@app.route('/estatistica')
@login_required
def estatistica():
    return render_template('curso_estatistica.html')