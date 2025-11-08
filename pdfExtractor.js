import pdfjsLib from 'pdfjs-dist/build/pdf'
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js'

export async function extractTextFromPdf(file){
  const data = await file.arrayBuffer()
  const loadingTask = pdfjsLib.getDocument({data})
  const doc = await loadingTask.promise
  let full = ''
  for(let i=1;i<=doc.numPages;i++){
    const page = await doc.getPage(i)
    const txt = await page.getTextContent()
    const pageText = txt.items.map(it=>it.str).join(' ')
    full += '\n' + pageText
  }
  await doc.destroy()
  return full
}
