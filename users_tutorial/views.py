from django.shortcuts import render, redirect, reverse
from django.urls import reverse_lazy
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import login, logout, authenticate, get_user_model
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.views.generic.edit import FormView
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from .models import TrafficInfo, TrafficLight, GenerateAlert, GenerateReport
from .utils import update_traffic_info_data, update_traffic_lights_data, update_generate_alerts_data, update_generate_reports_data


from tutorial.mixins import(
	AjaxFormMixin, 
	reCAPTCHAValidation,
	FormErrors,
	is_ajax
)


from .forms import (
	UserForm,
	UserProfileForm,
	AuthForm,
	UsernameForm,
	)

result = "Error"
message = "There was an error, please try again"


class AccountView(TemplateView):
	'''
	Generic FormView with our mixin to display user account page
	'''
	template_name = "users/account.html"

	@method_decorator(login_required)
	def dispatch(self, *args, **kwargs):
		return super().dispatch(*args, **kwargs)



def profile_view(request):
	'''
	function view to allow users to update their profile
	'''
	user = request.user
	up = user.userprofile

	form = UserProfileForm(instance = up) 

	if is_ajax(request):
		form = UserProfileForm(data = request.POST, instance = up)
		if form.is_valid():
			obj = form.save()
			obj.has_profile = True
			obj.save()
			result = "Success"
			message = "Your profile has been updated"
		else:
			message = FormErrors(form)
		data = {'result': result, 'message': message}
		return JsonResponse(data)

	else:

		context = {'form': form}
		context['google_api_key'] = settings.GOOGLE_API_KEY
		context['base_country'] = settings.BASE_COUNTRY

		return render(request, 'users/profile.html', context)



class SignUpView(AjaxFormMixin, FormView):
	'''
	Generic FormView with our mixin for user sign-up with reCAPTURE security
	'''

	template_name = "users/sign_up.html"
	form_class = UserForm
	success_url = "/"

	#reCAPTURE key required in context
	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context["recaptcha_site_key"] = settings.RECAPTCHA_PUBLIC_KEY
		return context

	#over write the mixin logic to get, check and save reCAPTURE score
	def form_valid(self, form):
		response = super(AjaxFormMixin, self).form_valid(form)	
		if is_ajax(self.request):
			token = form.cleaned_data.get('token')
			captcha = reCAPTCHAValidation(token)

			# Initialize result and message with default values
			result = "Error"
			message = "Invalid reCAPTCHA. Please try again."

			if captcha["success"]:
				obj = form.save()
				obj.email = obj.username
				obj.save()
				up = obj.userprofile
				up.captcha_score = float(captcha["score"])
				up.save()
				
				login(self.request, obj, backend='django.contrib.auth.backends.ModelBackend')

				#change result & message on success
				result = "Success"
				message = "Thank you for signing up"

			
			data = {'result': result, 'message': message}
			return JsonResponse(data)

		return response




class SignInView(AjaxFormMixin, FormView):
	'''
	Generic FormView with our mixin for user sign-in
	'''

	template_name = "users/sign_in.html"
	form_class = AuthForm
	success_url = "/"

	def form_valid(self, form):
		response = super(AjaxFormMixin, self).form_valid(form)	
		
		if is_ajax(self.request):
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			#attempt to authenticate user
			user = authenticate(self.request, username=username, password=password)
			
			if user is not None:
				login(self.request, user, backend='django.contrib.auth.backends.ModelBackend')
				result = "Success"
				message = 'You are now logged in'
			else:
				message = FormErrors(form)
			data = {'result': result, 'message': message}
			return JsonResponse(data)
		
		return response




class ResetPasswordView(AjaxFormMixin, FormView):
	'''
	Generic FormView with our mixin for user reset-password
	'''

	template_name = "users/reset_password.html"
	form_class = UsernameForm
	success_url = "/"
	
	def form_valid(self, form):
		User = get_user_model()
		
		response = super(AjaxFormMixin, self).form_valid(form)	
		
		if is_ajax(self.request):
			username = form.cleaned_data.get('username')
			#attempt to authenticate user
			try:
				user = User.objects.get(email=username)
				# Generate password reset link
				token = default_token_generator.make_token(user)
				uid = urlsafe_base64_encode(force_bytes(user.pk))
				current_site = get_current_site(self.request)
				reset_link = self.request.build_absolute_uri(
					reverse_lazy('password_reset_confirm', kwargs={'uidb64': uid, 'token': token})
				)

				# Send email
				subject = "Password Reset Requested"
				message = render_to_string('users/password_reset_email.html', {
					'user': user,
					'reset_link': reset_link,
					'domain': current_site.domain,
					'site_name': current_site.name,
				})
				send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.username], fail_silently=False)

				result = "Success"
				message = "A password reset link has been sent to your email."
			except User.DoesNotExist:
				result = "Error"
				message = "User does not exist."

			
			data = {'result': result, 'message': message}
			return JsonResponse(data)
		
		return response





def sign_out(request):
	'''
	Basic view for user sign out
	'''
	logout(request)
	return redirect(reverse('users:sign-in'))





def trafficInfoList(request):
	traffic_info_list = TrafficInfo.objects.all()
	return render(request, 'lists/traffic_info_list.html', {'traffic_info_list': traffic_info_list})

def trafficInfoData(request):
	update_traffic_info_data()
	markers = TrafficInfo.objects.all().values()
	return JsonResponse(list(markers), safe=False)




def trafficLightsList(request):
	traffic_lights_list = TrafficLight.objects.all()
	return render(request, 'lists/traffic_lights_list.html', {'traffic_lights_list': traffic_lights_list})

def trafficLightsData(request):
	update_traffic_lights_data()
	markers = TrafficLight.objects.all().values()
	return JsonResponse(list(markers), safe=False)




def generateAlertsList(request):
	generate_alerts_list = GenerateAlert.objects.all()
	return render(request, 'lists/generate_alerts_list.html', {'generate_alerts_list': generate_alerts_list})

def generateAlertsData(request):
	update_generate_alerts_data()
	markers = GenerateAlert.objects.all().values()
	return JsonResponse(list(markers), safe=False)




def generateReportsList(request):
	generate_reports_list = GenerateReport.objects.all()
	return render(request, 'lists/generate_reports_list.html', {'generate_reports_list': generate_reports_list})

def generateReportsData(request):
	update_generate_reports_data()
	markers = GenerateReport.objects.all().values()
	return JsonResponse(list(markers), safe=False)




