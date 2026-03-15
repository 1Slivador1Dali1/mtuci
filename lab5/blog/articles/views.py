from django.http import Http404, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
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
    
    # Проверяем, авторизован ли пользователь
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