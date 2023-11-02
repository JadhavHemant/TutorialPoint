from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from HemanApp.models import *
from HemanApp.Serializer import *



class Subapi(APIView):
    def get(self,request,format=None):
        model=SubjectModel.objects.all()
        serializer=SubjectSerializer(model,many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        data=request.data
        serializer=SubjectSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class SubjectWiseChapterAPIView(APIView):
    def get(self, request, id):
        chapter = ChapterModel.objects.filter(subject_id=id)
        serializer = ChapterSerializer(chapter, many=True)
        return Response(serializer.data)


class SubUpdateDelete(APIView):
    def get_object(self,id):
        try:
           return SubjectModel.objects.get(pk=id)
        except SubjectModel.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST  
        
    def get(self, request, id, format=None):
        try:
            Dash = self.get_object(id)  
            serializer = SubjectSerializer(Dash)  
            return Response(serializer.data)
        except status.HTTP_400_BAD_REQUEST as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,id,format=None):
        Dash=self.get_object(id)
        serializer=SubjectSerializer(Dash,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id, format=None):
        model = self.get_object(id)
        model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)                     
        
        
        