
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from drf_extra_fields.fields import Base64ImageField


from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework.exceptions import ValidationError

from .models import User


class UserSerializer(serializers.ModelSerializer):
    avatar = Base64ImageField(
        required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'phone_number', 'avatar', 'auth_token')


class SignUpSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(max_length=50, required=True, write_only=True)

    class Meta:
        fields = ('username', 'email', 'phone_number', 'load_zone', 'utility_zone',
                  'seller_code', 'customer_type', 'avatar', 'password', 'password_confirm', 'address')
        model = User
        extra_kwargs = dict.fromkeys(['phone_number', 'load_zone', 'utility_zone', 'seller_code',
                                      'password', 'password_confirm'], {'required': True})

    def validate(self, data):
        super().validate(data)
        if data.get('password') != data.get('password_confirm'):
            raise ValidationError({'password_confirm': 'password and password confirm didn\'t match'})
        return data

    def save(self):
        data = self.validated_data.copy()
        del data['password_confirm']
        user = User(**self.validated_data)
        user.set_password(self.validated_data['password'])
        user.save()
        return user

class SellerSignUpSerializer(SignUpSerializer):
    def validate(self, data):
        super().validate(data)
        sellers = User.objects.filter(seller_code=data['seller_code'])
        if len(sellers):
            raise ValidationError({"seller_code: ""seller with code '{}' already exists".format(data['seller_code'])})
        return data


class BuyerSignUpSerializer(SignUpSerializer):
    def validate(self, data):
        super().validate(data)
        
        sellers = User.objects.filter(seller_code=data['seller_code'])
        if len(sellers):
            return data
        raise ValidationError({"seller_code": 'no seller with appropriate code'})


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    username = serializers.CharField(required=False, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(
                _("The two password fields didn't match."))
        return data

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.save()
        return user
