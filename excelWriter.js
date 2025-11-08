import * as XLSX from 'xlsx'

export function exportExcel(items, supplier='supplier'){
  const header = ['كود','الاسم','الكمية المسجلة','الكمية المجرودة','الفرق','الحالة']
  const data = items.map(it=>{
    const diff = (it.counted||0) - (it.qty||0)
    const state = (it.counted===0) ? 'لم تُجرد' : (diff>0? 'زيادة' : (diff<0? 'نقص' : 'متطابق'))
    return [it.code, it.name, it.qty||0, it.counted||0, diff, state]
  })
  const ws = XLSX.utils.aoa_to_sheet([header, ...data])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Results')
  const wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'})
  const blob = new Blob([wbout], {type:'application/octet-stream'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = supplier + '-inventory.xlsx'
  a.click()
  URL.revokeObjectURL(url)
}
