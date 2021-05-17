from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from server.settings.base import AUTH_USER_MODEL
from .models import User
from .serializers import UserSerializer, SellerSignUpSerializer, BuyerSignUpSerializer


@receiver(post_save, sender=AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwaargs):
    if created:
        Token.objects.create(user=instance)


@api_view(['POST'])
def create_auth_seller(request):
    serialized = SellerSignUpSerializer(data=request.data)
    if serialized.is_valid():
        user = serialized.save()
        user.customer_type = 'Seller'
        user.save()
        token = Token.objects.get(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_auth_buyer(request):
    serialized = BuyerSignUpSerializer(data=request.data)
    if serialized.is_valid():
        user = serialized.save()
        user.customer_type = 'Buyer'
        user.save()
        token = Token.objects.get(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        if self.kwargs.get('pk', None) == 'me':
            self.kwargs['pk'] = self.request.user.pk
        return super(UserViewSet, self).get_object()


class VerifyToken(APIView):
    def get(self, request):
        token_header = request.headers['Authorization'].split(' ')
        if len(token_header) == 2:
            token = token_header[1]
        else:
            token = None
        if token and Token.objects.filter(key=token).exists():
            return Response({'verified': True})
        return Response({'verified': False})