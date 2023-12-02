from rest_framework.permissions import BasePermission

class IsPetSeeker(BasePermission):
    message = 'Access restricted to pet seekers only'

    def has_permission(self, request, view):
        return request.user.user_type.model == 'petseeker'


class IsShelter(BasePermission):
    message = 'Access restricted to shelters only'

    def has_permission(self, request, view):
        return request.user.user_type.model == 'petshelter'

class ShelterPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'list':
            return True
        elif view.action == 'create':
            return False
        else:
            return request.user.is_authenticated()

class IsShelterSelf(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_user("petshelter", obj.pk)