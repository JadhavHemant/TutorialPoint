from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from HemanApp.models import *
from HemanApp.Serializer import *
from HemanApp.VedioUpload import uploaded_file

class VideoApi(APIView):  
    def get(self, request, format=None):
        model = VideoTutorial.objects.all()
        serializer = VideoSerializer(model, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        uploaded_file(request.FILES.get('video'))  
        data = request.data
        serializer = VideoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VideoIdWiseApi(APIView):
    def get(self, request, id):
        chapter = VideoTutorial.objects.filter(id=id)
        serializer = VideoSerializer(chapter, many=True)
        return Response(serializer.data)

class DeleteUpdateVideo(APIView):
    def get_object(self,id):
        try:
           return VideoTutorial.objects.get(pk=id)
        except VideoTutorial.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST  
        
    def get(self, request, id, format=None):
        try:
            Stud = self.get_object(id)  
            serializer = VideoSerializer(Stud)  
            return Response(serializer.data)
        except status.HTTP_400_BAD_REQUEST as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,id,format=None):
        uploaded_file(request.FILES.get('video')) 
        Dash=self.get_object(id)
        serializer=VideoSerializer(Dash,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id, format=None):
        model = self.get_object(id)
        model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)                     
        
        
        
