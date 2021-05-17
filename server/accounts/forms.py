from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms import forms
from .models import User


class UserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = UserChangeForm.Meta.fields
