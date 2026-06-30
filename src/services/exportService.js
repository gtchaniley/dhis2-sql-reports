import ExcelJS from 'exceljs'
import Papa from 'papaparse'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export async function exportToExcel(gridApi, columns, filename = 'report') {
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Data')

    const rows = []

    gridApi.forEachNodeAfterFilterAndSort((node) => {
        rows.push(node.data)
    })

    sheet.columns = columns.map((c) => ({
        header: c.headerName,
        key: c.field,
        width: 20,
    }))

    sheet.addRows(rows)

    const buffer = await workbook.xlsx.writeBuffer()

    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    downloadBlob(blob, `${filename}.xlsx`)
}

export function exportToCSV(gridApi, filename = 'report') {
    const rows = []
    gridApi.forEachNodeAfterFilterAndSort((node) => {
        rows.push(node.data)
    })

    const csv = Papa.unparse(rows)

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

    downloadBlob(blob, `${filename}.csv`)
}

export function exportToPDF(gridApi, columns, filename = 'report') {
    const doc = new jsPDF()

    const rows = []
    gridApi.forEachNodeAfterFilterAndSort((node) => {
        rows.push(Object.values(node.data))
    })

    doc.text('DHIS2 SQL Report', 14, 10)

    doc.autoTable({
        head: [columns.map((c) => c.headerName)],
        body: rows,
    })

    doc.save(`${filename}.pdf`)
}

function downloadBlob(blob, filename) {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
}