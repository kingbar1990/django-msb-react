from enum import Enum

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db.models import Avg

from utility.models import Bill
from accounts.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, blank=True)
    class CustomerType(Enum):
        SELLER = 'Seller'
        BUYER = 'Buyer'

    class LoadZone(Enum):
        NEMA_BOS = 'NEMA-Boston'
        SEMA = 'SEMA'
        WEMA = 'Western Mass'

    class UtilityZone(Enum):
        EVRSRC = 'Eversource'
        NG = 'National Grid'

    class CreditType(Enum):
        AOBC = 'AltOnBillCredits'
        NM = 'NetMetering'

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    address = models.CharField(blank=True, max_length=255, default='')
    phone_number = models.CharField(blank=True, max_length=255, default='')
    avatar = models.FileField(upload_to='avatars/' ,blank=True)
    is_staff = models.BooleanField(default=True)
    customer_type = models.CharField(
        max_length=255,
        choices=tuple((tag.name, tag.value) for tag in CustomerType),
        blank=True
    )
    load_zone = models.CharField(
        max_length=255,
        choices=tuple((tag.name, tag.value) for tag in LoadZone),
        blank=True,
        default=LoadZone.NEMA_BOS.name
    )
    utility_zone = models.CharField(
        max_length=255,
        choices=tuple((tag.name, tag.value) for tag in UtilityZone),
        blank=True
    )
    credit_type = models.CharField(
        max_length=255,
        choices=tuple((tag.name, tag.value) for tag in CreditType),
        blank=True
    )
    deal_code = models.CharField(max_length=255, blank=True)
    seller_code = models.CharField(max_length=255, blank=True)
    payment_api_key = models.CharField(max_length=255, blank=True)
    utility_api_key = models.CharField(max_length=255, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    objects = UserManager()

    # should be calculated as initial_average_excess_production_cost * excess_production_safety_factor
    # only calculated once
    excess_production_safety_factor = models.PositiveSmallIntegerField(blank=True, null=True)

    # should be calculated as initial_average_demand_cost * demand_safety_factor
    # only calculated once
    demand_safety_factor = models.PositiveSmallIntegerField(blank=True, null=True)

    # should be re-calculated on an ongoing basis:
    # credit_to_sell = initial_credit_to_sell - sum(Deal.percent_excess) * initial_average_excess_production_cost
    credit_to_sell = models.DecimalField(decimal_places=2, max_digits=6, blank=True, null=True)
    # credit_to_buy = initial_credit_to_buy - sum(Deal.percent_excess) * Deal.Seller.initial_average_excess_production_cost
    credit_to_buy = models.DecimalField(decimal_places=2, max_digits=6, blank=True, null=True)

    def initial_average_demand_cost(self):
        qs = Bill.objects.filter(
            user=self,
            total_transferred_credit=None,
        ).order_by(
            '-date_end'
        )[:11]
        if len(qs) < 11:
            return None
        return qs.values('total_cost').aggregate(Avg('total_cost'))['total_cost__avg']

    def initial_average_excess_production_cost(self):
        qs = Bill.objects.filter(
            user=self,
            total_transferred_credit=None,
            excess_production_cost__gt=0  # should be when system is producing
        ).order_by(
            '-date_end'
        )[:11]
        if len(qs) < 11:
            return None
        return qs.values('excess_production_cost').aggregate(Avg('excess_production_cost'))[
            'excess_production_cost__avg']

    # initial_credit_to_sell = models.DecimalField(decimal_places=2, max_digits=6,blank=True, null=True)
    @property
    def initial_credit_to_sell(self):
        return (self.excess_production_safety_factor / 100.0) * float(self.initial_average_excess_production_cost())

    # initial_credit_to_buy = models.DecimalField(decimal_places=2, max_digits=6,blank=True, null=True)
    @property
    def initial_credit_to_buy(self):
        return (self.demand_safety_factor / 100.0) * float(self.initial_average_demand_cost())

    def __str__(self):
        return self.email
