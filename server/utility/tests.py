from django.test import TestCase
from apps.utility.models import Bill, CreditTransfer
from apps.accounts.models import User
import pandas as pd


# Create your tests here.
class BillTestCase(TestCase):
    def setUp(self):
        # setup User (seller)
        cu = User(
            first_name='bb',
            last_name='bb',
            email='bb@email.com',
            demand_safety_factor=100,
            excess_production_safety_factor=100
        )
        cu.save()

        # setup user (buyer)
        bu1 = User(
            first_name='buyer1b',
            last_name='buyer1b',
            email='buyer1b@email.com',
            demand_safety_factor=100,
            excess_production_safety_factor=100,
        )
        bu1.save()

        # date range of interest, latest 12 months w/ no credit transfers
        eom_date_range = pd.date_range(  # makes it at end of month for some reason
            start='2020-01-01',
            end='2020-12-01',
            freq='M'

        )
        # date before date range of interest
        b1 = Bill(
            user=cu,
            date_end=pd.to_datetime('2019-12-31'),
            total_cost=50,
            excess_production_cost=15
        )
        b1.save()

        for date_entry in eom_date_range:
            # seller bills w/ just excess production
            b1 = Bill(
                user=cu,
                date_end=date_entry,
                total_cost=100,
                excess_production_cost=30
            )
            b1.save()

        # dates after range of interest, will contain credit transfers
        eom_date_range2 = pd.date_range(  # makes it at end of month for some reason
            start='2021-01-01',
            end='2021-12-01',
            freq='M'
        )

        for date_entry in eom_date_range2:
            # seller bill's w/ credit transfers
            seller_bill = Bill(
                user=cu,
                date_end=date_entry,
                total_cost=110,
                excess_production_cost=20,
                total_transferred_credit=10
            )
            seller_bill.save()

            # buyer1 bill w/ credit transfer
            buyer1_bill = Bill(
                user=bu1,
                date_end=date_entry,
                total_cost=40,
            )
            buyer1_bill.save()

            # buyer1 credit transfer
            c1 = CreditTransfer(
                seller_bill=seller_bill,
                buyer_bill=buyer1_bill,
                transferred_credit=5
            )
            c1.save()

    def test_initial_average_demand_cost(self):
        cu = User.objects.get(first_name='bb')
        self.assertEqual(
            cu.initial_average_demand_cost,
            100
        )

    def test_initial_excess_production_cost(self):
        cu = User.objects.get(first_name='bb')
        self.assertEqual(cu.initial_average_excess_production_cost, 30)

    def test_initial_credit_to_sell(self):
        cu = User.objects.get(first_name='bb')
        self.assertEqual(cu.initial_credit_to_sell, 30)

    def test_initial_credit_to_buy(self):
        cu = User.objects.get(first_name='bb')
        self.assertEqual(cu.initial_credit_to_buy, 100)

    # def test_total_transferred_credit(self):
    #     # should == 5+5 --> 10
    #     seller = User.objects.get(email='bb@email.com')
    #     buyer = User.objects.get(email='buyer1b@email.com')

    # TODO: test credit_to_buy, credit_to_sell decreases as Deals are made
    # TODO: test total_transferred_credit == sum of all of the related transferred_credit