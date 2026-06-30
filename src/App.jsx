import React, { useEffect, useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

import { executeSqlView } from './services/sqlViewService'
import { extractParameters } from './services/parameterParser'

import SqlParametersForm from './components/SqlParametersForm'
import ResultsGrid from './components/ResultsGrid'

const query = {
    sqlViews: {
        resource: 'sqlViews',
        params: {
            fields: 'id,displayName,sqlQuery',
            paging: false,
        },
    },
}

export default function App() {
    const { loading, data } = useDataQuery(query)

    const [selected, setSelected] = useState(null)
    const [params, setParams] = useState([])
    const [result, setResult] = useState(null)

    const sqlViews = data?.sqlViews?.sqlViews || []

    const selectView = (view) => {
        setSelected(view)
        setParams(extractParameters(view))
        setResult(null)
    }

    const run = async (values) => {
        const res = await executeSqlView(selected.id, values)
        setResult(res)
    }

    if (loading) return <p>Loading...</p>

    return (
        <div style={{ display: 'flex', padding: 20, gap: 20 }}>

            {/* LISTE */}
            <div style={{ width: '30%' }}>
                <h3>SQL Views</h3>

                {sqlViews.map((v) => (
                    <div
                        key={v.id}
                        onClick={() => selectView(v)}
                        style={{
                            padding: 10,
                            border: '1px solid #ddd',
                            marginBottom: 10,
                            cursor: 'pointer',
                            background:
                                selected?.id === v.id
                                    ? '#e6f2ff'
                                    : 'white',
                        }}
                    >
                        {v.displayName}
                    </div>
                ))}
            </div>

            {/* CENTRE */}
            <div style={{ width: '70%' }}>
                {selected && (
                    <>
                        <h3>{selected.displayName}</h3>

                        {params.length > 0 && (
                            <SqlParametersForm
                                params={params}
                                onRun={run}
                            />
                        )}

                        {result && (
                            <ResultsGrid data={result} />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}