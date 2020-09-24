from django_distill import distill_path

from . import views


def get_index():
    return None


urlpatterns = [
    # path('', views.IndexView.as_view()),
    distill_path(
        "",
        views.IndexView.as_view(),
        name="index-view",
        distill_func=get_index,
        distill_file="index.html",
    ),
    # path('<int:pk>/', views.DetailView.as_view(), name='detail'),  # post
]
