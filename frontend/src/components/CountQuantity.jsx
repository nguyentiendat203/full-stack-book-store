import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CountQuantity({ quantity, setQuantity }) {
  return (
    <>
      <button className='p-2 hover:scale-125' onClick={() => setQuantity((quantity) => (quantity > 1 ? quantity - 1 : 1))}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <span className='px-4'>{quantity}</span>
      <button className='p-2 hover:scale-125' onClick={() => setQuantity((quantity) => quantity + 1)}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </>
  )
}

export default CountQuantity
