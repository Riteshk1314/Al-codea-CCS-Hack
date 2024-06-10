from django.http import HttpResponse
from django.shortcuts import render

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



#to capture video class
class VideoCamera(object):
    def _init_(self):
        self.video = cv2.VideoCapture(0)
        (self.grabbed, self.frame) = self.video.read()
        threading.Thread(target=self.update, args=()).start()

    def _del_(self):
        self.video.release()

    def get_frame(self):
        image = self.frame
        _, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()
@gzip.gzip_page
def home(request):
    try:
        mp_face_mesh = mp.solutions.face_mesh
        face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)
        cam = VideoCamera()
        prev_state = "STABLE!"  # Define prev_state outside the gen function

        def gen(camera):
            nonlocal prev_state  # Declare prev_state as a non-local variable

            while True:
                success, image = camera.video.read()

                if not success:
                    break

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
                        cam_matrix = np.array([[focal_length, 0, img_h / 2],
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
                        elif x > 19:
                            text = "WARNING!"
                        else:
                            text = "STABLE"

                        if prev_state != text:
                            print(text)
                            prev_state = text  # Update the non-local variable

                        cv2.putText(image, text, (20, 20), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

                else:
                    text = "WARNING"
                    cv2.putText(image, text, (20, 20), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                    if prev_state != text:
                        print(text)
                        prev_state = text  # Update the non-local variable

                ret, jpeg = cv2.imencode('.jpg', image)
                frame = jpeg.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

        return StreamingHttpResponse(gen(cam), content_type='multipart/x-mixed-replace; boundary=frame')

    except Exception as e:
        print(f"An error occurred: {e}")
        pass

    return render(request, '')


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
