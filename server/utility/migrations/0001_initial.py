# Generated by Django 3.2.2 on 2021-05-06 14:33

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
            name='Bill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(blank=True, max_length=255)),
                ('utility', models.CharField(blank=True, max_length=255)),
                ('meter_number', models.CharField(blank=True, max_length=100)),
                ('date_start', models.DateField(blank=True, null=True)),
                ('date_end', models.DateField(blank=True, null=True)),
                ('total_cost', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('excess_production_cost', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('total_transferred_credit', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bills', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CreditTransfer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transferred_credit', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('buyer_bill', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='buyer_transfer', to='utility.bill')),
                ('seller_bill', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='seller_transfer', to='utility.bill')),
            ],
        ),
    ]
