# Generated by Django 4.2.6 on 2023-10-16 17:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('HemanApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContentQuestionsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=255)),
                ('option_1', models.CharField(max_length=205)),
                ('option_2', models.CharField(max_length=205)),
                ('option_3', models.CharField(max_length=205)),
                ('option_4', models.CharField(max_length=205)),
                ('currect_option', models.IntegerField()),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='HemanApp.subjectmodel')),
            ],
            options={
                'db_table': 'content_question_tbl',
                'ordering': ('id',),
            },
        ),
    ]
