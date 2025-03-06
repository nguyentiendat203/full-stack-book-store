import { Button, Checkbox, Select } from 'antd'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import groupAPI from '~/api/groupAPI'
import { roleAPI } from '~/api/roleAPI'

function GroupRole() {
  const [listGroup, setListGroup] = useState([])
  const [listRole, setlistRole] = useState([])
  const [assignRoleByGroup, setAssignRoleByGroup] = useState([])
  const [selectGroup, setSelectGroup] = useState('')

  const handleOnChangeCheckBox = (id) => {
    const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup)
    const index = _assignRoleByGroup.findIndex((item) => item.id === id)
    _assignRoleByGroup[index].assign = !_assignRoleByGroup[index].assign
    setAssignRoleByGroup(_assignRoleByGroup)
  }

  const getRoleByGroup = async (groupId) => {
    return await roleAPI.getRoleByGroup(groupId)
  }

  const builDataToAssignRoleByGroup = (allRoles, rolesByGroup) => {
    let result = []
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        const obj = {}
        obj.id = role.id
        obj.url = role.url
        obj.description = role.description
        obj.assign = false

        obj.assign = rolesByGroup.some((item) => obj.url === item.url)
        result.push(obj)
      })
    }
    return result
  }

  const handleOnChangeGroup = async (value) => {
    setSelectGroup(value)
    const res = await getRoleByGroup(value)
    const result = builDataToAssignRoleByGroup(listRole, res.Roles)
    setAssignRoleByGroup(result)
  }

  const builDataToSave = () => {
    const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup)
    let result = {}
    const filterRoles = _assignRoleByGroup.filter((item) => item.assign === true)
    result.groupId = selectGroup
    const dataGroupRole = filterRoles.map((item) => {
      return {
        groupId: selectGroup,
        roleId: item.id
      }
    })
    result.groupRoles = dataGroupRole
    return result
  }
  const handleSave = async () => {
    try {
      const data = builDataToSave()
      await roleAPI.assignRoleToGroup(data)
      toast.success('Assign role to group success')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const fetchAllGroups = async () => {
    try {
      const res = await groupAPI.gettAllGroups()
      if (res && res.length > 0) {
        setListGroup(res)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const fetchAllRole = async () => {
    try {
      const res = await roleAPI.getAllRoles()
      setlistRole(res)
    } catch (error) {
      // toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchAllGroups()
    fetchAllRole()
  }, [])

  return (
    <>
      <div className='rounded-lg bg-white p-4 h-5/6'>
        <p className='text-2xl font-medium mb-4'>Add Role to Group</p>
        <div>
          <span>Select Group:</span> <br></br>
          <Select
            placeholder='Please select your Group'
            onChange={(value) => {
              handleOnChangeGroup(value)
            }}
            options={listGroup.map((item) => {
              return {
                value: item.id,
                label: item.name
              }
            })}
            style={{
              width: 400
            }}
          />
        </div>
        {selectGroup && (
          <div className='mt-4'>
            <p className='text-2xl font-medium mb-4'>Assign Role </p>
            {assignRoleByGroup &&
              assignRoleByGroup.length > 0 &&
              assignRoleByGroup.map((role, index) => {
                return (
                  <>
                    <div key={`key-${index}`}>
                      <Checkbox onChange={() => handleOnChangeCheckBox(role.id)} className='text-lg mb-2' checked={role.assign ? true : false}>
                        {role.url}
                      </Checkbox>
                    </div>
                  </>
                )
              })}
            <Button type='primary' className='mt-4' onClick={handleSave}>
              Save
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default GroupRole
