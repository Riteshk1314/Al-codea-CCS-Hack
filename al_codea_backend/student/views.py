# from pyexpat.errors import messages
from django.shortcuts import render,redirect
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
import cv2
import mediapipe as mp
import numpy as np


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



# import cv2
# from django.shortcuts import render,redirect
# import threading
# from django.http import StreamingHttpResponse

# def camera(request):
#     try:
#         cam=VideoCamera()
#         return StreamingHttpResponse(gen(cam),content_type="multipart/x-mixed-replace;boundary=frame")
#     except:
#         pass
#     return render(request,'index.html')

# class VideoCamera(object):
#     def __init__(self):
#         self.video = cv2.VideoCapture(0)
#         (self.grabbed, self.frame) = self.video.read()
#         threading.Thread(target=self.update, args=()).start()
    
#     def __del__(self):
#         self.video.release()
    
#     def get_frame(self):
#         image = self.frame
#         _, jpeg = cv2.imencode('.jpg', image)
#         return jpeg.tobytes()
    
#     def update(self):
#         while True:
#             (self.grabbed, self.frame) = self.video.read()
            
# def gen(camera):
#     while True:
#         frame = camera.get_frame()
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')




from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import numpy as np
import cv2

# Define a global variable to store the camera object
video_camera = None

# Define a global variable to store the video stream generator
video_stream_generator = None

# Initialize the camera and generator
def initialize_camera(request):
    global video_camera, video_stream_generator
    video_camera = cv2.VideoCapture(0)
    video_stream_generator = gen(video_camera)

# Release the camera
def release_camera():
    global video_camera
    if video_camera:
        video_camera.release()

# Receive frames from the frontend and return the video stream
@csrf_exempt
def video_feed(request):
    if request.method == 'GET':
        return HttpResponse(video_stream(), content_type='multipart/x-mixed-replace; boundary=frame')

# Generator function to continuously yield video frames
def gen(camera):
    while True:
        success, frame = camera.read()
        if not success:
            break
        _, jpeg = cv2.imencode('.jpg', frame)
        frame_bytes = jpeg.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n\r\n')

# Return video stream as a byte string
def video_stream():
    global video_stream_generator
    for frame in video_stream_generator:
        yield frame

# Initialize the camera when the Django app starts



from rest_framework import generics
from rest_framework.response import Response
from .serializer import FrameSerializer

class CameraFrameView(generics.CreateAPIView):
    serializer_class = FrameSerializer

    def post(self, request, *args, **kwargs):
        # Check if 'frame' is present in the request
        if 'frame' not in request.FILES:
            return Response({'error': 'No frame found'}, status=400)

        # Extract the frame file from the request data
        frame_file = request.FILES['frame']

        # Create a serializer instance with the frame data
        serializer = self.get_serializer(data={'frame': frame_file})

        # Validate the serializer
        if serializer.is_valid():
            # Save the frame instance
            serializer.save()

            # Return success response
            return Response({'message': 'Frame received and saved successfully'}, status=201)
        else:
            # Return error response if serializer is not valid
            return Response(serializer.errors, status=400)




from django.http import HttpResponse
from django.shortcuts import render
from .models import *
from django.core.mail import EmailMessage
from django.views.decorators import gzip
from django.http import StreamingHttpResponse
import cv2
import threading

import cv2
import mediapipe as mp
import numpy as np


def Home(request):
    try:
        
        mp_face_mesh = mp.solutions.face_mesh
        face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)
                    
        cap = cv2.VideoCapture(0)
        prev_state = "STABLE!"

        while cap.isOpened():
            success, image = cap.read()
                
            image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)

            image.flags.writeable = False
            
            results = face_mesh.process(image)
            
            image.flags.writeable = True
            
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            img_h, img_w, img_c = image.shape
            face_3d = []
            face_2d = []

            if results.multi_face_landmarks:
                for face_landmarks in results.multi_face_landmarks:
                    for idx, lm in enumerate(face_landmarks.landmark):
                        if idx == 33 or idx == 263 or idx == 1 or idx == 61 or idx == 291 or idx == 199:
                            
                            x, y = int(lm.x * img_w), int(lm.y * img_h)

                            face_2d.append([x, y])

                            face_3d.append([x, y, lm.z])       
                    
                    face_2d = np.array(face_2d, dtype=np.float64)

                    face_3d = np.array(face_3d, dtype=np.float64)

                    focal_length = 1 * img_w

                    cam_matrix = np.array([ [focal_length, 0, img_h / 2],
                                            [0, focal_length, img_w / 2],
                                            [0, 0, 1]])

                    dist_matrix = np.zeros((4, 1), dtype=np.float64)

                    success, rot_vec, trans_vec = cv2.solvePnP(face_3d, face_2d, cam_matrix, dist_matrix)
                    
                    rmat, jac = cv2.Rodrigues(rot_vec)

                    angles, mtxR, mtxQ, Qx, Qy, Qz = cv2.RQDecomp3x3(rmat)

                    x = angles[0] * 360
                    y = angles[1] * 360

                    if y < -17:
                        text = "WARNING!"
                    elif y > 15:
                        text = "WARNING!"
                    elif x>19:
                        text = "WARNING!"
                    else:
                        text = "STABLE"

                    if prev_state != text:
                        print(text)
                        prev_state = text
                    
                    
                    cv2.putText(image, text, (20, 20), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

            else:
                text = "WARNING"
                cv2.putText(image, text, (20, 20), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                if prev_state != text:
                        print(text)
                        prev_state = text
                
            cv2.imshow('MARS TEST PROCTORING', image)

            if cv2.waitKey(5) & 0xFF == 27:
                break

        return StreamingHttpResponse(cap, content_type="multipart/x-mixed-replace;boundary=frame")
    except:
        pass
    return render(request, 'app1.html')

# #to capture video class
# class VideoCamera(object):
#     def __init__(self):
#         self.video = cv2.VideoCapture(0)
#         (self.grabbed, self.frame) = self.video.read()
#         threading.Thread(target=self.update, args=()).start()

#     def __del__(self):
#         self.video.release()

#     def get_frame(self):
#         image = self.frame
#         _, jpeg = cv2.imencode('.jpg', image)
#         return jpeg.tobytes()

#     def update(self):
#         while True:
#             (self.grabbed, self.frame) = self.video.read()
            
#     def ml(self):
        

# def gen(camera):
#     while True:
#         frame = camera.get_frame()
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
        
        

