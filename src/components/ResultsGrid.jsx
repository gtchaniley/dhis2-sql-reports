import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

export default function ResultsGrid({ data }) {
    if (!data?.listGrid) return null

    const columns = data.listGrid.headers.map((h) => ({
        headerName: h.name,
        field: h.name,
        sortable: true,
        filter: true,
        resizable: true,
    }))

    const rows = data.listGrid.rows.map((r) => {
        const obj = {}
        data.listGrid.headers.forEach((h, i) => {
            obj[h.name] = r[i]
        })
        return obj
    })

    const isBigData = rows.length > 50000

    return (
        <div className="ag-theme-alpine" style={{ height: 600 }}>
            <AgGridReact
                ref={gridRef}
                rowData={rows}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}

                pagination
                paginationPageSize={100}

                animateRows={false}

                rowBuffer={20}

                suppressCellFocus={false}

                suppressRowClickSelection={false}

                enableCellTextSelection

                ensureDomOrder

                tooltipShowDelay={500}

                rowSelection="multiple"
            />
        </div>
    )
}