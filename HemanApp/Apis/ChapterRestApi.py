from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from HemanApp.models import *
from HemanApp.Serializer import *


class Chapterapi(APIView):
    def get(self,request,format=None):
        model=ChapterModel.objects.all()
        serializer=ChapterSerializer(model,many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        data=request.data
        serializer=ChapterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class ChapterWiseTutorialAPIView(APIView):
    def get(self, request, id):
        tutorial = TextTutorial.objects.filter(chapter_id=id)
        serializer = TutorialSerializer(tutorial, many=True)
        return Response(serializer.data)

class ChapterWiseVideoAPIView(APIView):
    def get(self, request, id):
        tutorial = VideoTutorial.objects.filter(chapter_id=id)
        serializer = VideoSerializer(tutorial, many=True)
        return Response(serializer.data)


class ChapterUpdateDelete(APIView):
    def get_object(self,id):
        try:
           return ChapterModel.objects.get(pk=id)
        except ChapterModel.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST  
        
    def get(self, request, id, format=None):
        try:
            Dash = self.get_object(id)  
            serializer = ChapterSerializer(Dash)  
            return Response(serializer.data)
        except status.HTTP_400_BAD_REQUEST as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,id,format=None):
        Dash=self.get_object(id)
        serializer=ChapterSerializer(Dash,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id, format=None):
        model = self.get_object(id)
        model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)                     
        
        
        