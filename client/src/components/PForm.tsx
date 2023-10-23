
import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store';
import { saveProperty } from '../features/property/propertySlice'

export function PForm({ setIsOpen, scrollToBottom }: {
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  scrollToBottom: () => void
}) {
  const dispatch = useDispatch<AppDispatch>()
  const [error, setError] = useState('');
  const [info, setIfno] = useState({
    address: '',
    description: ''
  });

  const createProperty = () => {
    if (info.address && info.description) {
      scrollToBottom()
      dispatch(saveProperty(info))
      setIsOpen(false)
    } else {
      setError('Please fill out empty fields')
    }
  }

  return (
    <div className='form-container'>
      <div className='p-form'>
        <p>Create new property</p>
        <input
          type="text"
          placeholder='address'
          value={info.address}
          onChange={(e) => setIfno({ ...info, address: e.target.value.trim() })}
        />
        <textarea
          rows={6}
          placeholder='description'
          value={info.description}
          onChange={(e) => setIfno({ ...info, description: e.target.value.trim() })}
        />
        <b>{error}</b>
        <button onClick={createProperty}>Create</button>
        <img src="./close.svg" alt="Close" onClick={() => setIsOpen(false)} />
      </div>
    </div>
  )
}