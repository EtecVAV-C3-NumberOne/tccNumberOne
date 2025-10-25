from flask import render_template, url_for, redirect, request, session
from number1one import app, bcrypt, db, login_manager
from number1one.models import Usuario, Curso, Materia, Aula, Progresso
from flask_login import login_required, login_user, logout_user, current_user
from number1one.forms import LoginForm, RegisterForm
from werkzeug.utils import secure_filename
import unicodedata

@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('login'))

@app.route('/')
def landing():
    if current_user.is_authenticated:
        return redirect(url_for("home"))
    return render_template('landing_page.html')



@app.route('/login', methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("home"))
    formLogin = LoginForm()
    if formLogin.validate_on_submit():
        print("FOI PORRA")
        usuario = Usuario.query.filter_by(user_email=formLogin.email.data).first()
        
        if usuario and bcrypt.check_password_hash(usuario.user_password, formLogin.password.data):
            print('Logou porra')
            login_user(usuario, remember=True)
            return redirect(url_for("home"))
        else:
            formLogin.email.errors.append("E-mail ou senha incorretos.")
            formLogin.password.errors.append("E-mail ou senha incorretos.")
                
    return render_template('login.html', form = formLogin)

@app.route('/register', methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("home"))
    formRegister = RegisterForm()
    if formRegister.validate_on_submit():
        senha = bcrypt.generate_password_hash(formRegister.password.data)
        usuario = Usuario(user_name=formRegister.username.data, user_email=formRegister.email.data, user_password=senha)
        db.session.add(usuario)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            formRegister.email.errors.append('Erro ao cadastrar. Tente novamente mais tarde.')
            return render_template('register.html', form=formRegister)
        login_user(usuario, remember=True)
        return redirect(url_for("home"))

    return render_template('register.html', form = formRegister)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for("landing"))


@app.route('/home')
@login_required
def home():
    return render_template('home.html', usuario = current_user)

@app.route('/curso/<string:curso_nome>')
@login_required
def curso(curso_nome):
    # Pega o curso "Estatística"
    curso = Curso.query.filter_by(curso=curso_nome).first_or_404()

    # Pega todas as matérias desse curso
    materias = Materia.query.filter_by(curso_id=curso.id).all()
    

    # IDs de aulas concluídas pelo usuário
    aulas_concluidas = (
        db.session.query(Progresso.aula_id)
        .filter_by(usuario_id=current_user.id, concluida=True)
        .all()
    )
    ids_concluidas = [a[0] for a in aulas_concluidas]
    
    for materia in materias:
        aulas = Aula.query.filter_by(materia_id=materia.id).all()
        materia.aulas_ids = [aula.id for aula in aulas]
        materia.aulas_list = aulas 
        
    # Cálculo do progresso
    total_aulas = Aula.query.join(Materia).filter(Materia.curso_id == curso.id).count()
    concluidas_count = len(ids_concluidas)
    progresso = int((concluidas_count / total_aulas) * 100) if total_aulas > 0 else 0
    
    aula_atual = request.args.get("aula_atual", session.get("aula_atual"))
    if aula_atual:
        aula_atual = int(aula_atual)
        session['aula_atual'] = aula_atual
    elif ids_concluidas:
        aula_atual = max(ids_concluidas)  # última concluída
        session['aula_atual'] = aula_atual
    elif materias and materias[0].aulas_list:
        primeira_aula = materias[0].aulas_list[0]
        aula_atual = primeira_aula.id if primeira_aula else None
        session['aula_atual'] = aula_atual

    print(aula_atual)
    print(ids_concluidas)
    
    nome_formatado = unicodedata.normalize('NFKD', curso_nome).encode('ASCII', 'ignore').decode('utf-8').lower()
    return render_template(f'curso_{nome_formatado}.html',
        curso=curso,
        materias=materias,
        concluidas=ids_concluidas,
        progresso=progresso,
        aula_atual=aula_atual,
        total_aulas=total_aulas,
        nome_formatado=nome_formatado
    )

@app.route('/concluir_aula', methods=['POST'])
@login_required
def concluir_aula():
    aula_id = int(request.form.get("aula_id"))

    progresso = Progresso.query.filter_by(usuario_id=current_user.id, aula_id=aula_id).first()
    if not progresso:
        progresso = Progresso(usuario_id=current_user.id, aula_id=aula_id, concluida=True)
        db.session.add(progresso)
    else:
        progresso.concluida = True

    db.session.commit()

    session['aula_atual'] = aula_id
    curso = Aula.query.get(aula_id).materia.curso
    return redirect(url_for('curso', curso_nome=curso.curso, aula_atual=aula_id))
