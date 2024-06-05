# from django.shortcuts import render
# from django.template.loader import render_to_string
# from django.contrib.sites.shortcuts import get_current_site
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_str
# from django.core.mail import EmailMessage

# from .tokens import account_activation_token
# @user_not_authenticated
# def register(request):
#     if request.method == "POST":
#         form = UserRegistrationForm(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)
#             user.is_active = False
#             user.save()
#             activateEmail(request, user, form.cleaned_data.get('email'))
#             return redirect('homepage')

#         else:
#             for error in list(form.errors.values()):
#                 messages.error(request, error)

#     else:
#         form = UserRegistrationForm()

#     return render(
#         request=request,
#         template_name="users/register.html",
#         context={"form": form}
#         )
    
    
# def activateEmail(request, user, to_email):
#     mail_subject = 'Activate your user account.'
#     message = render_to_string('template_activate_account.html', {
#         'user': user.username,
#         'domain': get_current_site(request).domain,
#         'uid': urlsafe_base64_encode(force_bytes(user.pk)),
#         'token': account_activation_token.make_token(user),
#         'protocol': 'https' if request.is_secure() else 'http'
#     })
#     email = EmailMessage(mail_subject, message, to=[to_email])
#     if email.send():
#         messages.success(request, f'Dear <b>{user}</b>, please go to you email <b>{to_email}</b> inbox and click on \
#             received activation link to confirm and complete the registration. <b>Note:</b> Check your spam folder.')
#     else:
#         messages.error(request, f'Problem sending confirmation email to {to_email}, check if you typed it correctly.')
# def activate(request, uidb64, token):
#     User = get_user_model()
#     try:
#         uid = force_str(urlsafe_base64_decode(uidb64))
#         user = User.objects.get(pk=uid)
#     except(TypeError, ValueError, OverflowError, User.DoesNotExist):
#         user = None

#     if user is not None and account_activation_token.check_token(user, token):
#         user.is_active = True
#         user.save()

#         messages.success(request, 'Thank you for your email confirmation. Now you can login your account.')
#         return redirect('login')
#     else:
#         messages.error(request, 'Activation link is invalid!')
    
#     return redirect('homepage')