from django.db import models
from django.conf import settings


class Payment(models.Model):
    deal = models.ForeignKey(
        'deals.Deal',
        on_delete=models.CASCADE
    )
    payer = models.OneToOneField(  # makes the payment
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    ),
    payee = models.OneToOneField(  # recieves the payment
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    ),
    date = models.CharField(max_length=255, blank=True)
    total_cost = models.DecimalField(decimal_places=2, max_digits=6)
    total_transaction_fee = models.DecimalField(decimal_places=2, max_digits=6)
