# Generated by Django 3.2.2 on 2021-05-17 11:38

import accounts.managers
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(blank=True, max_length=50)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(blank=True, max_length=50)),
                ('last_name', models.CharField(blank=True, max_length=50)),
                ('address', models.CharField(blank=True, default='', max_length=255)),
                ('phone_number', models.CharField(blank=True, default='', max_length=255)),
                ('avatar', models.FileField(blank=True, upload_to='avatars/')),
                ('is_staff', models.BooleanField(default=True)),
                ('customer_type', models.CharField(blank=True, choices=[('SELLER', 'Seller'), ('BUYER', 'Buyer')], max_length=255)),
                ('load_zone', models.CharField(blank=True, choices=[('NEMA_BOS', 'NEMA-Boston'), ('SEMA', 'SEMA'), ('WEMA', 'Western Mass')], default='NEMA_BOS', max_length=255)),
                ('utility_zone', models.CharField(blank=True, choices=[('EVRSRC', 'Eversource'), ('NG', 'National Grid')], max_length=255)),
                ('credit_type', models.CharField(blank=True, choices=[('AOBC', 'AltOnBillCredits'), ('NM', 'NetMetering')], max_length=255)),
                ('deal_code', models.CharField(blank=True, max_length=255)),
                ('seller_code', models.CharField(blank=True, max_length=255)),
                ('payment_api_key', models.CharField(blank=True, max_length=255)),
                ('utility_api_key', models.CharField(blank=True, max_length=255)),
                ('excess_production_safety_factor', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('demand_safety_factor', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('credit_to_sell', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('credit_to_buy', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', accounts.managers.UserManager()),
            ],
        ),
    ]
