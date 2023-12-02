"""
URL configuration for Hemant project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path
from HemanApp.Apis import DashRestApi,StudentRestApi,SubjectRestApi,ChapterRestApi,TutorialRestApi,VideoRestApi,ExamRestApi

urlpatterns = [
     # Dashboard urls
    path('api/dashboard',DashRestApi.DashboardApi.as_view()),
    path('api/dashupdate/<int:id>/',DashRestApi.DashUpdateDelete.as_view()),
    # Student Urls
    path('api/student',StudentRestApi.StudentApi.as_view()),
    path('api/student/update/delete/<int:id>/',StudentRestApi.DeleteUpdateStudent.as_view()),
    path('api/student/login/',StudentRestApi.StudentLoginApi.as_view()),
    path('api/student/id/data/<int:id>',StudentRestApi.IdWiseStudentData.as_view()),
    # Subject Urls
    path('api/subject',SubjectRestApi.Subapi.as_view()),
    path('api/subject/update/delete/<int:id>/',SubjectRestApi.SubUpdateDelete.as_view()),
    path('api/subject/chapter/<int:id>/',SubjectRestApi.SubjectWiseChapterAPIView.as_view()),
    # Chapter Urls
    path('api/chapter',ChapterRestApi.Chapterapi.as_view()),
    path('api/chapter/update/delete/<int:id>/',ChapterRestApi.ChapterUpdateDelete.as_view()),
    path('api/chapter/tutotial/<int:id>/',ChapterRestApi.ChapterWiseTutorialAPIView.as_view()),
    path('api/chapter/video/<int:id>/',ChapterRestApi.ChapterWiseVideoAPIView.as_view()),
    
    # Tutorial Urls
    path('api/tutorial',TutorialRestApi.TutorialApi.as_view()),
    path('api/tutorial/update/delete/<int:id>/',TutorialRestApi.DeleteUpdateTutorial.as_view()),
    path('api/csv/<int:id>/',TutorialRestApi.TutorialIdWiseApi.as_view()),

    # Tutorial Urls
    path('api/video',VideoRestApi.VideoApi.as_view()),
    path('api/video/update/delete/<int:id>/',VideoRestApi.DeleteUpdateVideo.as_view()),
    path('api/video/id/<int:id>/',VideoRestApi.VideoIdWiseApi.as_view()),
    
    path('api/exam',ExamRestApi.ExamQuestionApi.as_view()),
    
]
