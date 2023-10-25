import './styles.css'
import { useEffect, useState } from 'react'

type Props = {
    id: string
    items: Array<string>
    placeholder?: string
}

export function DropdownSelector({
    id,
    items,
    placeholder = 'Select an item',
}: Props) {
    const [selectedValue, setSelectedValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const wrapper = document.querySelector(
            `.${id}_wrapper`
        ) as HTMLDivElement
        const positionalWrapper = document.querySelector(
            `.${id}_positional_wrapper`
        ) as HTMLDivElement

        positionalWrapper.style.width = `${wrapper.offsetWidth}px`
        positionalWrapper.style.height = `${wrapper.offsetHeight}px`
    }, [id])

    const handleItemClick = (value: string) => {
        setSelectedValue(value)
        setIsOpen(!open)
    }

    return (
        <div
            className={`hrnet_dropdownselector_positional_wrapper ${id}_positional_wrapper`}
        >
            <div
                className={`hrnet_dropdownselector_wrapper ${id}_wrapper overload`}
            >
                <input
                    id={id}
                    className={`hrnet_dropdownselector_input ${id}_input overload`}
                    type="text"
                    value={selectedValue}
                    readOnly
                    placeholder={placeholder}
                    onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                    <div
                        className={`hrnet_dropdownselector_items_wrapper ${id}_items_wrapper overload`}
                    >
                        {items.map((item, index) => (
                            <span
                                key={`${id}_item_${index}`}
                                className={`hrnet_dropdownselector_item ${id}_item overload`}
                                onClick={() => handleItemClick(item)}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
