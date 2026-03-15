from django.http import Http404, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import Article

def archive(request):
    return render(request, 'archive.html', {"posts": Article.objects.all()})

def get_article(request, article_id):
    try:
        post = Article.objects.get(id=article_id)
        return render(request, 'article.html', {"post": post})
    except Article.DoesNotExist:
        raise Http404("Статья не найдена")

def create_post(request):
    """Создание новой статьи"""
    if request.user.is_anonymous:
        raise Http404("Только авторизованные пользователи могут создавать статьи")
    
    if request.method == "POST":
        form = {
            'text': request.POST.get("text", ""),
            'title': request.POST.get("title", "")
        }
        
        if form["text"] and form["title"]:
            if Article.objects.filter(title=form["title"]).exists():
                form['errors'] = "Статья с таким названием уже существует"
                return render(request, 'create_post.html', {'form': form})
            
            article = Article.objects.create(
                text=form["text"],
                title=form["title"],
                author=request.user
            )
            return redirect('get_article', article_id=article.id)
        else:
            form['errors'] = "Не все поля заполнены"
            return render(request, 'create_post.html', {'form': form})
    else:
        return render(request, 'create_post.html', {})

def register(request):
    """Регистрация нового пользователя"""
    if request.method == "POST":
        username = request.POST.get("username", "")
        email = request.POST.get("email", "")
        password = request.POST.get("password", "")
        password_confirm = request.POST.get("password_confirm", "")
        
        form = {
            'username': username,
            'email': email,
        }
        
        if not username or not email or not password or not password_confirm:
            form['errors'] = "Все поля обязательны для заполнения"
            return render(request, 'register.html', {'form': form})
        
        if password != password_confirm:
            form['errors'] = "Пароли не совпадают"
            return render(request, 'register.html', {'form': form})
        
        try:
            User.objects.get(username=username)
            form['errors'] = "Пользователь с таким именем уже существует"
            return render(request, 'register.html', {'form': form})
        except User.DoesNotExist:
            pass  
        
        try:
            User.objects.get(email=email)
            form['errors'] = "Пользователь с таким email уже существует"
            return render(request, 'register.html', {'form': form})
        except User.DoesNotExist:
            pass  
        
        user = User.objects.create_user(username, email, password)
        user.save()
        
        login(request, user)
        
        return redirect('archive')
    else:
        return render(request, 'register.html', {})

def user_login(request):
    """Авторизация пользователя"""
    if request.method == "POST":
        username = request.POST.get("username", "")
        password = request.POST.get("password", "")
        
        form = {
            'username': username,
        }
        
        if not username or not password:
            form['errors'] = "Все поля обязательны для заполнения"
            return render(request, 'login.html', {'form': form})
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('archive')
        else:
            form['errors'] = "Неверное имя пользователя или пароль"
            return render(request, 'login.html', {'form': form})
    else:
        return render(request, 'login.html', {})

def user_logout(request):
    """Выход пользователя из системы"""
    logout(request)
    return redirect('archive')