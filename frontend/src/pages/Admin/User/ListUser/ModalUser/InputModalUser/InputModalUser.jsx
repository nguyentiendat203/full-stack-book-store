import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from 'antd'

function InputModalUser({ value, validInput, placeholder, handleOnChangeInput, inputName, action }) {
  return (
    <>
      <Input
        disabled={action && action === 'UPDATE' ? true : false}
        value={value}
        status={validInput ? '' : 'error'}
        suffix={!validInput && <FontAwesomeIcon icon={faExclamation} />}
        placeholder={placeholder}
        onChange={(e) => handleOnChangeInput(e.target.value, `${inputName}`)}
      />
    </>
  )
}

export default InputModalUser
