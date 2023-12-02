from rest_framework import serializers
from HemanApp.models import *
from rest_framework.relations import PrimaryKeyRelatedField

class DashboardSerializers(serializers.ModelSerializer):
    class Meta:
        model=DashboardModel
        fields=['id','instructions']
    
class StudentSerializers(serializers.ModelSerializer):
    class Meta:
        model=StudentModel
        fields=['id','student_name','student_image','student_email','student_gender','student_college_name','student_dob','standard','username','password']
        
class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=SubjectModel
        fields=['id','subject_name'] 
        
class ChapterSerializer(serializers.ModelSerializer):
    subject_id=PrimaryKeyRelatedField(queryset=SubjectModel.objects.all(),many=False)
    class Meta:
        model=ChapterModel
        fields=['id','subject_id','chapter_name']

class TutorialSerializer(serializers.ModelSerializer):
    chapter_id=PrimaryKeyRelatedField(queryset=ChapterModel.objects.all(),many=False)
    class Meta:
        model=TextTutorial
        fields=['id','chapter_id','tutorial_file']     
        
class VideoSerializer(serializers.ModelSerializer):
    chapter_id=PrimaryKeyRelatedField(queryset=ChapterModel.objects.all(),many=False)
    class Meta:
        model=VideoTutorial
        fields=['id','chapter_id','video_tutorial',"video_caption"]   
        
class StudentExamSerializer(serializers.ModelSerializer):
    student_id=PrimaryKeyRelatedField(queryset=StudentModel.objects.all(),many=False)
    class Meta:
        model=CandidateExamModel
        fields=['id','student_id','exam_date','exam_start_time','exam_end_time','exam_status']
 
class ExamSerializer(serializers.ModelSerializer):
    exam_id=PrimaryKeyRelatedField(queryset=StudentModel.objects.all(),many=False)
    class Meta:
        model=ExamQuestionModel
        fields=["id","exam_id","question_id","submit_option_number"]         
        
        
        
        
        
        
        
        
        
        
        
        
        
             
