
import { useState } from 'react';
import type { RootState } from '../../app/store'
import { useSelector } from 'react-redux'
import { PForm } from '../../components/PForm';
import { fetchProperties } from '../../features/property/propertySlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store';

export function Property() {
  const dispatch = useDispatch<AppDispatch>()
  const properties = useSelector((state: RootState) => state.property.list);
  
  const [isOpen, setIsOpen] = useState(false);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  useEffect(() => {
    dispatch(fetchProperties())
  }, [dispatch])

  return (
    <div className='item-container'>
      <button onClick={() => setIsOpen(true)}>Add Property</button>
      {properties.map(e => {
        return (
          <div key={e.id} className='item'>
            <p>{e.address}</p>
            <p>{e.description}</p>
          </div>)
      })}
      {isOpen && <PForm setIsOpen={setIsOpen} scrollToBottom={scrollToBottom} />}
    </div>
  )
}