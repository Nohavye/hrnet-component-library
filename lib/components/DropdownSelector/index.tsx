// Styles
import * as priorityStyles from './priorityStyles'
import defaultStyles from './defaultStyles.module.css'

// Hooks
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
    maxHeight?: number | null
    placeholder?: string
}

/**
 * A dropdown selector component that allows users to select from a list of items.
 */
export function DropdownSelector({
    id,
    classNames = null,
    items,
    maxHeight = null,
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
        `${classNames && classNames[name] ? `${classNames[name]} ` : ''}${
            defaultStyles[name] ? `${defaultStyles[name]} ` : ''
        }hrnet_dropdownselector_${name} overload`

    return (
        <div
            id={`${id}_positional_wrapper`}
            style={priorityStyles.POSITIONAL_WRAPPER}
        >
            <div
                id={`${id}_wrapper`}
                className={handleClassName('wrapper')}
                style={
                    maxHeight
                        ? {
                              ...priorityStyles.WRAPPER,
                              ...{
                                  maxHeight: `${maxHeight}px`,
                                  zIndex: `${isOpen ? '9999' : 'auto'}`,
                              },
                          }
                        : {
                              ...priorityStyles.WRAPPER,
                              ...{
                                  zIndex: `${isOpen ? '9999' : 'auto'}`,
                              },
                          }
                }
            >
                <input
                    id={id}
                    className={handleClassName('input')}
                    style={priorityStyles.INPUT}
                    type="text"
                    value={selectedValue}
                    readOnly
                    placeholder={placeholder}
                    onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                    <div
                        className={handleClassName('items_wrapper')}
                        style={
                            maxHeight
                                ? {
                                      ...priorityStyles.ITEMS_WRAPPER,
                                      ...priorityStyles.ITEM_WRAPPER_SCROLLING,
                                  }
                                : priorityStyles.ITEMS_WRAPPER
                        }
                    >
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
