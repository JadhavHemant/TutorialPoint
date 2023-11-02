from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from HemanApp.models import *
from HemanApp.Serializer import *
from HemanApp.UploadStudentImage import uploaded_file

class StudentApi(APIView):  
    def get(self, request, format=None):
        model = StudentModel.objects.all()
        serializer = StudentSerializers(model, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        uploaded_file(request.FILES.get('photo'))  
        data = request.data
        serializer = StudentSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentLoginApi(APIView):
    def post(self, request):
        username=request.data.get('username')
        password=request.data.get('password')  
        try:
            Candidate=StudentModel.objects.get(username=username, password=password)
            return Response({'id': Candidate.id}, status=status.HTTP_200_OK)
        except StudentModel.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)   
            
        
class IdWiseStudentData(APIView):
      def get(self, request, id):
        try:
            model = StudentModel.objects.get(pk=id)
        except StudentModel.DoesNotExist:
            return Response({"error": "Candidate not found"}, status=404)      
        serializer = StudentSerializers(model)
        return Response(serializer.data)


class DeleteUpdateStudent(APIView):
    def get_object(self,id):
        try:
           return StudentModel.objects.get(pk=id)
        except StudentModel.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST  
        
    def get(self, request, id, format=None):
        try:
            Stud = self.get_object(id)  
            serializer = StudentSerializers(Stud)  
            return Response(serializer.data)
        except status.HTTP_400_BAD_REQUEST as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,id,format=None):
        uploaded_file(request.FILES.get('photo')) 
        Dash=self.get_object(id)
        serializer=StudentSerializers(Dash,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id, format=None):
        model = self.get_object(id)
        model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)                     
        
        
        
