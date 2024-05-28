# Generated by Django 5.0.6 on 2024-05-28 22:44

import django.db.models.deletion
import django.utils.timezone
import userAPI.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAPI', '0003_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Profile',
            new_name='UserProfile',
        ),
        migrations.AlterModelManagers(
            name='bar',
            managers=[
                ('objects', userAPI.models.BarManager()),
            ],
        ),
        migrations.AddField(
            model_name='bar',
            name='email',
            field=models.EmailField(default=django.utils.timezone.now, max_length=255, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bar',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='bar',
            name='password',
            field=models.CharField(default=django.utils.timezone.now, max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='BarProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(blank=True, max_length=255)),
                ('hours', models.CharField(blank=True, max_length=255)),
                ('future_promotions', models.CharField(blank=True, max_length=255)),
                ('bar', models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='bar_profile', to='userAPI.bar')),
            ],
        ),
        migrations.CreateModel(
            name='PromotionPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('bar', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='promotions', to='userAPI.bar')),
                ('likes', models.ManyToManyField(blank=True, related_name='likes', to='userAPI.user')),
            ],
            options={
                'ordering': ('-date',),
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_comments', to='userAPI.user')),
                ('post', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='post_comments', to='userAPI.promotionpost')),
            ],
            options={
                'ordering': ('-date',),
            },
        ),
    ]
