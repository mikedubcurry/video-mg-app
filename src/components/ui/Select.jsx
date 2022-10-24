import { useId } from 'react'

function Select({ options, value, onChange, label }) {
    const id = useId()
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <select value={value} id={id} onChange={onChange}>
                {options.map((op) => (
                    <option key={op} value={op}>
                        {op}
                    </option>
                ))}
            </select>
        </>
    )
}

export { Select }
