import './styles.css'
import { useEffect, useState } from 'react'

/**
 * A set of CSS class names for styling different parts of the DropdownSelector component.
 */
type ClassNames = {
    wrapper?: string
    input?: string
    items_wrapper?: string
    item?: string
}

/**
 * Props for the DropdownSelector component.
 */
type Props = {
    id: string
    classNames?: ClassNames | null
    items: Array<string>
    placeholder?: string
}

/**
 * A dropdown selector component that allows users to select from a list of items.
 */
export function DropdownSelector({
    id,
    classNames = null,
    items,
    placeholder = 'Select an item',
}: Props) {
    const [selectedValue, setSelectedValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Update the positional wrapper dimensions based on the wrapper element.
        const wrapper = document.getElementById(
            `${id}_wrapper`
        ) as HTMLDivElement
        const positionalWrapper = document.getElementById(
            `${id}_positional_wrapper`
        ) as HTMLDivElement

        positionalWrapper.style.width = `${wrapper.offsetWidth}px`
        positionalWrapper.style.height = `${wrapper.offsetHeight}px`
    }, [id])

    /**
     * Handle a click on an item in the dropdown.
     * @param value - The selected item's value.
     */
    const handleItemClick = (value: string) => {
        setSelectedValue(value)
        setIsOpen(!open)
    }

    /**
     * Constructs CSS class names.
     *
     * @param name - The key used to index the `classNames` object.
     * @returns A string representing the combined CSS class name.
     */
    const handleClassName = <classname extends keyof ClassNames>(
        name: classname
    ): string =>
        `${
            classNames && classNames[name] ? `${classNames[name]} ` : ''
        }hrnet_dropdownselector_${name}`

    return (
        <div id={`${id}_positional_wrapper`}>
            <div id={`${id}_wrapper`} className={handleClassName('wrapper')}>
                <input
                    id={id}
                    className={handleClassName('input')}
                    type="text"
                    value={selectedValue}
                    readOnly
                    placeholder={placeholder}
                    onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                    <div className={handleClassName('items_wrapper')}>
                        {items.map((item, index) => (
                            <span
                                key={`${id}_item_${index}`}
                                className={handleClassName('item')}
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
