import React from 'react'

export default function InventoryTable({items, setItems}){
  const updateCount = (index, delta) => {
    items[index].counted = (items[index].counted||0) + delta
    if(items[index].counted < 0) items[index].counted = 0
    setItems([...items])
  }

  return (
    <div>
      <table className='w-full text-sm'>
        <thead>
          <tr className='text-left'>
            <th>الكود</th>
            <th>الاسم</th>
            <th>المسجل</th>
            <th>المجرود</th>
            <th>الفرق</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx)=>(
            <tr key={idx} className='border-t'>
              <td className='p-2'>{it.code}</td>
              <td className='p-2'>{it.name}</td>
              <td className='p-2'>{it.qty || it.registered || 0}</td>
              <td className='p-2'>{it.counted || 0}</td>
              <td className='p-2'>{(it.counted||0) - (it.qty||0)}</td>
              <td className='p-2'>
                <div className='flex gap-1'>
                  <button className='px-2 bg-gray-200 rounded' onClick={()=>updateCount(idx,-1)}>-</button>
                  <button className='px-2 bg-gray-200 rounded' onClick={()=>updateCount(idx,1)}>+</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
