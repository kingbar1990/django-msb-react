from django.db import models
from django.conf import settings


class Bill(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='bills'
    )
    address = models.CharField(max_length=255, blank=True)
    utility = models.CharField(max_length=255, blank=True)
    meter_number = models.CharField(max_length=100, blank=True)
    date_start = models.DateField(blank=True, null=True)
    date_end = models.DateField(blank=True, null=True)
    total_cost = models.DecimalField(decimal_places=2, max_digits=6, blank=True,
                                     null=True)  # bill cost $ before credits
    excess_production_cost = models.DecimalField(decimal_places=2, max_digits=6, blank=True,
                                                 null=True)  # full net metering credits $

    # TODO: turn this into a property that sums the transferred_credit fields of all related CreditTransfer
    total_transferred_credit = models.DecimalField(decimal_places=2, max_digits=6, blank=True, null=True)

    # TODO: issue with filtering with property in accounts.models.py, may want to use signal instead.
    # @property
    # def total_transferred_credit(self):
    #     qs = CreditTransfer.objects.filter(
    #         Q(seller_bill=self.user) | Q(buyer_bill=self.user)
    #     )
    #     return qs.values('transferred_credit').aggregate(Sum('transferred_credit'))['transferred_credit__sum']


# we can have multiple excess credit transfers per month on a single seller bill
class CreditTransfer(models.Model):
    seller_bill = models.ForeignKey(
        Bill,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='seller_transfer'
    )
    buyer_bill = models.ForeignKey(
        Bill,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='buyer_transfer'
    )
    transferred_credit = models.DecimalField(decimal_places=2, max_digits=6, blank=True, null=True)
