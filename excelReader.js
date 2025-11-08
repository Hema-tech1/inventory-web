import * as XLSX from 'xlsx'

export async function readExcel(file){
  const data = await file.arrayBuffer()
  const workbook = XLSX.read(data, {type:'array'})
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const json = XLSX.utils.sheet_to_json(sheet, {header:1})
  // Try to find columns: code, name, qty
  const header = json[0] || []
  let codeIdx = 0, nameIdx = 1, qtyIdx = 2
  // naive mapping by header names
  for(let i=0;i<header.length;i++){
    const h = String(header[i]).toLowerCase()
    if(h.includes('كود')||h.includes('code')) codeIdx = i
    if(h.includes('اسم')||h.includes('name')) nameIdx = i
    if(h.includes('كمية')||h.includes('qty')||h.includes('quantity')) qtyIdx = i
  }
  const items = []
  for(let r=1;r<json.length;r++){
    const row = json[r]
    if(!row) continue
    const code = row[codeIdx] ? String(row[codeIdx]).trim() : ''
    const name = row[nameIdx] ? String(row[nameIdx]).trim() : ''
    const qty = row[qtyIdx] ? Number(row[qtyIdx]) : 0
    if(code || name) items.push({code, name, qty, counted:0})
  }
  return { items }
}
