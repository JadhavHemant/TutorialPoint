from django.db import models

# Create your models here.

class DashboardModel(models.Model):
    instructions=models.CharField(max_length=255)
    class Meta:
        ordering=('id',)
        db_table='dashboard_table'
        def __str__(self):
            return self.instructions


class StudentModel(models.Model):
    student_name=models.CharField(max_length=255)
    student_image=models.CharField(max_length=255)
    student_email=models.CharField(max_length=255)
    student_gender=models.CharField(max_length=100)
    student_college_name=models.CharField(max_length=255)
    student_dob=models.CharField(max_length=255)
    standard=models.CharField(max_length=255)
    username=models.CharField(max_length=255)
    password=models.CharField(max_length=255)
    class Meta:
        ordering =('id',)
        db_table = 'student_table'
        def __str__(self):
            return self.student_name
     
            
class SubjectModel(models.Model):
    subject_name=models.CharField(max_length=100)
    class Meta:
        ordering = ('id',)
        db_table='subject_table'
        def __str__(self):
            return self.subject_name


class ChapterModel(models.Model):   
    subject_id = models.ForeignKey(SubjectModel,related_name='chapter',on_delete=models.CASCADE)
    chapter_name=models.CharField(max_length=100) 
    class Meta:
        ordering =('id',)
        db_table='chapter_table'
        def __str__(self):
            return self.chapter_name


class TextTutorial(models.Model):
    chapter_id = models.ForeignKey(ChapterModel,related_name='text',on_delete=models.CASCADE)
    tutorial_file = models.CharField(max_length=255)
    class Meta:
        ordering = ('id',)
        db_table = 'texttutorial_table'
        def __str__(self):     
            return self.chapter_id  

        
class VideoTutorial(models.Model):
     chapter_id = models.ForeignKey(ChapterModel,related_name='video',on_delete=models.CASCADE)
     video_tutorial=models.CharField(max_length=255)
     video_caption=models.CharField(max_length=255)
     class Meta:
        ordering =('id',)
        db_table='video_tutorial_table'
        def __str__(self):
            return self.video_caption
    
class ContentQuestionsModel(models.Model):
    subject=models.ForeignKey(SubjectModel,related_name='questions',on_delete=models.CASCADE)
    question=models.CharField(max_length=255)
    option_1=models.CharField( max_length=205)
    option_2=models.CharField( max_length=205)
    option_3=models.CharField( max_length=205)
    option_4=models.CharField( max_length=205)
    currect_option=models.IntegerField()
    class Meta:
        ordering=('id',)
        db_table='content_question_tbl'
    def __str__(self):
        return self.question 


# ----------------------------------------------------------------------------------------------------------
class CandidateExamModel(models.Model):
    Studednt_id=models.ForeignKey(StudentModel,related_name='candidate',on_delete=models.CASCADE)  
    exam_date=models.CharField(max_length=100)
    exam_start_time=models.CharField(max_length=100) 
    exam_end_time=models.CharField(max_length=100)
    exam_status=models.CharField(max_length=100)
    class Meta: 
        ordering=('id',)
        db_table='Student_exam_details'
    def __str__(self):
        return self.exam_id 


class ExamQuestionModel(models.Model):
    exam_id=models.ForeignKey(CandidateExamModel,related_name='exam',on_delete=models.CASCADE)
    question_id=models.ForeignKey(ContentQuestionsModel,related_name='exam',on_delete=models.CASCADE)
    # Studednt_id=models.ForeignKey(StudentModel,related_name='exam',on_delete=models.CASCADE)  
    submit_option_number=models.IntegerField()
    class Meta:
        ordering=('id',)
        db_table='exam_quesion_result'  
    def __str__(self):
        return self.exam_question_id

