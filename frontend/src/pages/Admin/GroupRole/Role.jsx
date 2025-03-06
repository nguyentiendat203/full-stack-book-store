import { faCirclePlus, faExclamation, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Input } from 'antd'
import { useRef, useState } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { roleAPI } from '~/api/roleAPI'
import TableRole from './TableRole/TableRole'

function Role() {
  const dataChildDefault = { url: '', description: '', isValidUrl: true }
  const [listChilds, setListChilds] = useState({ child0: dataChildDefault })
  const childRef = useRef()

  const handleOnchangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds)
    _listChilds[key][name] = value
    if (value && name === 'url') {
      _listChilds[key]['isValidUrl'] = true
    }
    setListChilds(_listChilds)
  }

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds)
    _listChilds[`child-${uuidv4()}`] = dataChildDefault
    setListChilds(_listChilds)
  }
  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds)
    delete _listChilds[key]
    setListChilds(_listChilds)
  }

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds)
    const result = []
    Object.entries(_listChilds).map(([key, value]) => {
      result.push({
        url: value.url,
        description: value.description
      })
    })
    return result
  }

  const handleSave = async () => {
    const inValidObj = Object.entries(listChilds).find(([key, value]) => !value.url)

    if (!inValidObj) {
      const data = buildDataToPersist()
      const res = await roleAPI.createRoles(data)
      toast.success(res.message)
      setListChilds({ child0: dataChildDefault })
      childRef.current.fetchAllRole()
    } else {
      let _listChilds = _.cloneDeep(listChilds)
      const key = inValidObj[0]
      _listChilds[key]['isValidUrl'] = false
      toast.error('URL not to be empty !!!')
      setListChilds(_listChilds)
    }
  }

  return (
    <>
      <div className='rounded-lg bg-white p-4'>
        <p className='text-2xl font-medium mb-4'>Add new Role</p>
        <div>
          {Object.entries(listChilds).map(([key, value], index) => {
            return (
              <>
                <div key={`child-${key}`}>
                  <div className={`flex flex-row ${key}`}>
                    <div className='basis-1/3 mr-4'>
                      <span>URL</span>
                      <Input
                        status={value.isValidUrl ? undefined : 'error'}
                        suffix={!value.isValidUrl && <FontAwesomeIcon icon={faExclamation} />}
                        value={value.url}
                        onChange={(e) => handleOnchangeInput('url', e.target.value.trim(), key)}
                      />
                    </div>
                    <div className='basis-1/3 mr-4'>
                      <span>Description</span>
                      <Input value={value.description} onChange={(e) => handleOnchangeInput('description', e.target.value, key)} />
                    </div>
                    <div className='flex items-center pt-6 mb-6'>
                      <FontAwesomeIcon icon={faCirclePlus} className='text-2xl cursor-pointer mr-4 text-emerald-600' onClick={handleAddNewInput} />
                      {index > 0 && <FontAwesomeIcon icon={faTrash} className='text-2xl cursor-pointer text-red-500' onClick={() => handleDeleteInput(key)} />}
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        <Button type='primary' onClick={() => handleSave()}>
          Save
        </Button>
        <div className='mt-6'>
          <p className='text-2xl font-medium mb-4'>All Roles</p>
          <TableRole ref={childRef} />
        </div>
      </div>
    </>
  )
}

export default Role
