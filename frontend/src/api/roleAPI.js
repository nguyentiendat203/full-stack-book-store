import axiosClient from './axiosClient'

export const roleAPI = {
  createRoles: (roles) => {
    const url = '/role/create'
    return axiosClient.post(url, [...roles])
  },
  getAllRoles: () => {
    const url = '/role/read'
    return axiosClient.get(url)
  },
  deleteRole: (id) => {
    const url = `role/delete?id=${id}`
    return axiosClient.delete(url)
  },
  updateRole: (data) => {
    const url = 'role/update'
    return axiosClient.put(url, data)
  },
  getRoleByGroup: (groupId) => {
    const url = `role/by-group/${groupId}`
    return axiosClient.get(url)
  },
  assignRoleToGroup: (data) => {
    const url = 'role/assign-role-group'
    return axiosClient.post(url, data)
  }
}
