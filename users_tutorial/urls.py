from django.urls import path
from . import views


app_name = "users_tutorial"

urlpatterns = [
	path('', views.AccountView.as_view(), name="account"),
	path('profile', views.profile_view, name="profile"),
	path('sign-up', views.SignUpView.as_view(), name="sign-up"),
	path('sign-in', views.SignInView.as_view(), name="sign-in"),
	path('sign-out', views.sign_out, name="sign-out"),
    path('reset-password', views.reset_password, name="reset-password"),
    path('trafficInfoList', views.trafficInfoList, name="trafficInfoList"),
    path('trafficInfoData', views.trafficInfoData, name="trafficInfoData"),
    path('trafficLightsList', views.trafficLightsList, name="trafficLightsList"),
    path('trafficLightsData', views.trafficLightsData, name="trafficLightsData"),
    path('generateAlertsList', views.generateAlertsList, name="generateAlertsList"),
    path('generateAlertsData', views.generateAlertsData, name="generateAlertsData"),
    path('generateReportsList', views.generateReportsList, name="generateReportsList"),
    path('generateReportsData', views.generateReportsData, name="generateReportsData"),
	]