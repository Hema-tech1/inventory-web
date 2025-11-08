import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ar: {
    translation: {
      app_name: "تطبيق جرد",
      load_file: "تحميل ملف المورد (Excel / PDF)",
      scan_barcode: "سكان باركود",
      search_code: "بحث بالكود",
      start_count: "بدء الجرد",
      finish_count: "إنهاء الجرد",
      select_supplier: "اختيار المورد",
      upload_hint: "اسحب الملف أو اضغط للاختيار",
      export_excel: "تصدير إلى Excel",
      language: "اللغة",
      add_count: "إضافة للجرد",
      not_found: "⚠️ الصنف غير تابع لهذا المورد"
    }
  },
  en: {
    translation: {
      app_name: "Inventory App",
      load_file: "Load supplier file (Excel / PDF)",
      scan_barcode: "Scan barcode",
      search_code: "Search by code",
      start_count: "Start counting",
      finish_count: "Finish counting",
      select_supplier: "Select supplier",
      upload_hint: "Drop file or click to choose",
      export_excel: "Export to Excel",
      language: "Language",
      add_count: "Add to count",
      not_found: "⚠️ Item not found in this supplier"
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ar',
  fallbackLng: 'ar',
  interpolation: { escapeValue: false }
})

export default i18n
