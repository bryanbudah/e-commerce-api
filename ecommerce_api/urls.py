"""
URL configuration for ecommerce_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include
from django.http import JsonResponse
from users.views import UserCreateView
def api_home(request):
    return JsonResponse({
        "message": "E-commerce Product API is running",
        "endpoints": {
            "admin": "/admin/",
            "products": "/api/products/",
            "register": "/api/users/register/"
        }
    })

urlpatterns = [
   path('', api_home),
    path('admin/', admin.site.urls),
     path('api/', include('products.urls')),
    path('api/users/register/', UserCreateView.as_view()),
]

