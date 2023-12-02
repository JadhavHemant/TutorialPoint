# Generated by Django 4.2.6 on 2023-12-02 17:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('HemanApp', '0002_contentquestionsmodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='CandidateExamModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exam_date', models.CharField(max_length=100)),
                ('exam_start_time', models.CharField(max_length=100)),
                ('exam_end_time', models.CharField(max_length=100)),
                ('exam_status', models.CharField(max_length=100)),
                ('Studednt_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='candidate', to='HemanApp.studentmodel')),
            ],
            options={
                'db_table': 'Student_exam_details',
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='ExamQuestionModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submit_option_number', models.IntegerField()),
                ('exam_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exam', to='HemanApp.candidateexammodel')),
                ('question_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exam', to='HemanApp.contentquestionsmodel')),
            ],
            options={
                'db_table': 'exam_quesion_result',
                'ordering': ('id',),
            },
        ),
    ]