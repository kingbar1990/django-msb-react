from django.db import models
from django.conf import settings
from apps.accounts.models import User


class Deal(models.Model):
    buyer = models.ForeignKey(  # .OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='buyer',
        blank=True,
        null=True,
    )
    seller = models.ForeignKey(  # OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='seller',
        blank=True,
        null=True,
    )
    # percent_excess = models.PositiveSmallIntegerField(blank=True)
    percent_transaction_fee = models.PositiveSmallIntegerField(blank=True, null=True)
    percent_credit_discount = models.PositiveSmallIntegerField(blank=True, null=True)
    min_percent_excess = models.PositiveSmallIntegerField(blank=True, null=True)
    date_initiated = models.DateField(blank=True, null=True)
    date_end = models.DateField(blank=True, null=True)
    is_approved = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    is_terminated = models.BooleanField(default=False)

    # is_valid = models.BooleanField(default=False)
    @property
    def is_valid(self):
        # is valid if
        # seller user_type == "seller" and buyer user_type == "buyer"
        # if seller has a seller code, and buyer has a seller code, they match (TODO)
        # buyer has payment method, valid bills (TODO)
        # seller has payment email, valid bills  (TODO)
        # percent_excess > 10% or min threshold for that deal
        # seller_credit_type == "NM":
        #       buyer and seller in same load_zone, utility_zone
        # seller_credit_type == "AOBC"
        #       buyer and seller in same utility_zone
        buyer = User.objects.filter(buyer=self.buyer)
        buyer_type = buyer.values('customer_type')['customer_type']
        buyer_utility_zone = buyer.values('utility_zone')['utility_zone']
        buyer_load_zone = buyer.values('load_zone')['load_zone']
        buyer_credit_to_buy = buyer.values('credit_to_buy')['credit_to_buy']
        buyer_deal_code = buyer.values('deal_code')['deal_code']
        seller = User.objects.filter(seller=self.seller)
        seller_type = seller.values('customer_type')['customer_type']
        seller_utility_zone = seller.values('utility_zone')['utility_zone']
        seller_load_zone = seller.values('load_zone')['load_zone']
        seller_credit_to_sell = seller.values('credit_to_sell')['credit_to_sell']
        seller_deal_code = seller.values('deal_code')['deal_code']

        perc_excess_threshold = self.percent_excess > self.min_percent_excess
        credit_gt_zero_threshold = ((seller_credit_to_sell > 0) & (buyer_credit_to_buy > 0))

        seller_credit_type = seller.values('credit_type')['credit_type']
        if seller_credit_type == 'NM':
            zone_match = (
                    (seller_load_zone == buyer_load_zone) &
                    (seller_utility_zone == buyer_utility_zone)
            )
        else:  # for now only have two choices, NM or AOBC
            zone_match = (
                (seller_utility_zone == buyer_utility_zone)
            )
        deal_code_match = (buyer_deal_code == seller_deal_code)

        logic_eval = (
                ((buyer_type == 'BUYER') & (seller_type == 'SELLER')) &
                (perc_excess_threshold) &
                (credit_gt_zero_threshold) &
                (zone_match) &
                (deal_code_match)
        )
        return logic_eval

    @property
    def percent_excess(self):
        # % excess = min(credit_to_buy,credit_to_sell) / initial_credit_to_sell
        credit_to_buy = User.objects.filter(id=self.buyer, credit_type=User.CustomerType.BUYER.name).values_list(
            'credit_to_buy', flat=True
        )
        credit_to_sell = User.objects.filter(id=self.seller, credit_type=User.CustomerType.SELLER.name).values_list(
            'credit_to_sell', flat=True
        )
        # credit_to_buy = buyer.values('credit_to_buy')['credit_to_buy']
        # credit_to_sell = seller.values('credit_to_sell')['credit_to_sell']
        # initial_credit_to_sell = seller.values('credit_to_sell')['credit_to_sell']

        # TODO: ask about initial credit to sell
        initial_credit_to_sell = credit_to_sell
        return round(100 * min(credit_to_buy, credit_to_sell) / initial_credit_to_sell)
