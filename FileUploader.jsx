import React from 'react'
import { readExcel } from '../utils/excelReader'
import { extractTextFromPdf } from '../utils/pdfExtractor'
import { useTranslation } from 'react-i18next'

export default function FileUploader({setItems, setSupplier}){
  const { t } = useTranslation()

  const handleFile = async (file) => {
    const name = file.name.toLowerCase()
    if(name.endsWith('.xlsx') || name.endsWith('.xls') || name.endsWith('.csv')){
      const rows = await readExcel(file)
      setSupplier(rows.supplier||'')
      setItems(rows.items || [])
    } else if(name.endsWith('.pdf')){
      const text = await extractTextFromPdf(file)
      // basic parser for the style in your PDF - looks for lines with code and qty
      const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean)
      const items = []
      for(let i=0;i<lines.length;i++){
        const ln = lines[i]
        // try to match code (digits of length >=5)
        const codeMatch = ln.match(/\b0?\d{4,}\b/)
        if(codeMatch){
          const code = codeMatch[0]
          const qtyLine = lines[i+1] || ''
          const qtyMatch = qtyLine.match(/(-?\d+(?:[.,]\d+)?)/)
          const name = lines[i+2] || ''
          const qty = qtyMatch ? parseFloat(qtyMatch[0].replace(',','.')) : 0
          items.push({code, name, qty, counted:0})
        }
      }
      setSupplier('')
      setItems(items)
    } else {
      alert('صيغة الملف غير مدعومة')
    }
  }

  const onChange = (e)=>{
    const f = e.target.files[0]
    if(f) handleFile(f)
  }

  return (
    <div className='bg-white p-4 rounded shadow'>
      <label className='block mb-2 font-semibold'>{t('load_file')}</label>
      <input type='file' accept='.xlsx,.xls,.csv,.pdf' onChange={onChange}/>
      <p className='text-sm text-gray-500 mt-2'>{t('upload_hint')}</p>
    </div>
  )
}
