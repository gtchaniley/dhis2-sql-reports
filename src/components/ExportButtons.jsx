import React from 'react'
import { Button } from '@dhis2/ui'
import {
    exportToExcel,
    exportToCSV,
    exportToPDF,
} from '../services/exportService'

export default function ExportButtons({ gridApi, columns }) {
    if (!gridApi) return null

    return (
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <Button onClick={() => exportToExcel(gridApi, columns)}>
                Excel
            </Button>

            <Button onClick={() => exportToCSV(gridApi)}>
                CSV
            </Button>

            <Button onClick={() => exportToPDF(gridApi, columns)}>
                PDF
            </Button>
        </div>
    )
}