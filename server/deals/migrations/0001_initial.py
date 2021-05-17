# Generated by Django 3.2.2 on 2021-05-17 10:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Deal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('percent_transaction_fee', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('percent_credit_discount', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('min_percent_excess', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('date_initiated', models.DateField(blank=True, null=True)),
                ('date_end', models.DateField(blank=True, null=True)),
                ('is_approved', models.BooleanField(default=False)),
                ('is_rejected', models.BooleanField(default=False)),
                ('is_terminated', models.BooleanField(default=False)),
                ('buyer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='buyer', to=settings.AUTH_USER_MODEL)),
                ('seller', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='seller', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
