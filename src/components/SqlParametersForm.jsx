import React, { useState } from 'react'
import { Button, Input } from '@dhis2/ui'

export default function SqlParametersForm({ params, onRun }) {
    const [values, setValues] = useState({})

    const update = (key, value) => {
        setValues({ ...values, [key]: value })
    }

    return (
        <div style={{ padding: 10, border: '1px solid #ddd' }}>
            <h4>Paramètres</h4>

            {params.map((p) => (
                <div key={p} style={{ marginBottom: 10 }}>
                    <Input
                        label={p}
                        value={values[p] || ''}
                        onChange={({ value }) => update(p, value)}
                    />
                </div>
            ))}

            <Button primary onClick={() => onRun(values)}>
                Exécuter
            </Button>
        </div>
    )
}