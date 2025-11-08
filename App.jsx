import React, {useState} from 'react'
import FileUploader from './components/FileUploader'
import InventoryTable from './components/InventoryTable'
import LanguageSwitcher from './components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function App(){
  const { t } = useTranslation()
  const [items, setItems] = useState([]) // {code, name, qty, counted}
  const [supplier, setSupplier] = useState('')
  const [counts, setCounts] = useState([])

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <header className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>{t('app_name')}</h1>
        <div className='flex gap-3 items-center'>
          <LanguageSwitcher/>
        </div>
      </header>

      <main className='space-y-4'>
        <FileUploader setItems={setItems} setSupplier={setSupplier}/>
        <div className='bg-white p-4 rounded shadow'>
          <div className='flex gap-2 mb-3'>
            <input id='code' placeholder={t('search_code')} className='border p-2 flex-1 rounded' onKeyDown={(e)=> {
              if(e.key==='Enter'){
                const code = e.target.value.trim()
                if(!code) return
                const itm = items.find(i=>i.code===code)
                if(itm){
                  itm.counted = (itm.counted||0) + 1
                  setItems([...items])
                } else {
                  alert(t('not_found'))
                }
                e.target.value=''
              }
            }}/>
            <button className='bg-blue-600 text-white px-4 rounded'>{t('scan_barcode')}</button>
          </div>
          <InventoryTable items={items} setItems={setItems}/>
        </div>

        <div className='flex gap-2'>
          <button className='bg-green-600 text-white px-4 py-2 rounded' onClick={()=>{
            // export to excel
            import('./utils/excelWriter').then(m=>m.exportExcel(items, supplier))
          }}>{t('export_excel')}</button>
        </div>
      </main>
    </div>
  )
}
