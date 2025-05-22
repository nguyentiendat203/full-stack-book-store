import useAuthStore from '~/store/useAuthStore'

const usePermission = () => {
  const { currentUser } = useAuthStore()

  const hasPermission = (permission) =>
    !!currentUser &&
    !!currentUser.Group &&
    Array.isArray(currentUser.Group.Roles) &&
    currentUser.Group.Roles.some((role) => {
      return role?.description && role.description.includes(permission)
    })

  return { hasPermission }
}
export default usePermission
