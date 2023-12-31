// Styles
import * as priorityStyles from './priorityStyles'
import defaultStyles from './defaultStyles.module.css'

// Hooks
import { useEffect, useState } from 'react'

/**
 * A set of CSS class names for styling different parts of the DropdownSelector component.
 */
type ClassNames = {
    /** CSS class for the wrapper element. */
    wrapper?: string
    /** CSS class for the input element. */
    input?: string
    /** CSS class for the items wrapper element. */
    items_wrapper?: string
    /** CSS class for individual item elements. */
    item?: string
}

type Props = {
    /** The unique identifier for the dropdown selector. */
    id: string
    /** (Optional) CSS class names for custom styling. */
    classNames?: ClassNames | null
    /** An array of string items to select from. */
    items: Array<string>
    /** (Optional) maximum height for the dropdown items. */
    maxHeight?: number | null
    /** (Optional) placeholder text for the input field. */
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

    /**
     * Sets up event listeners for handling focus and blur events on the input field
     * and manages the opening and closing of the dropdown selector accordingly.
     */
    useEffect(() => {
        const input = document.getElementById(id) as HTMLInputElement
        const wrapper = document.getElementById(
            `${id}_wrapper`
        ) as HTMLDivElement

        let mouseIsInWrapper: boolean

        const handleMouseEnter = () => {
            mouseIsInWrapper = true
        }

        const handleMouseLeave = () => {
            mouseIsInWrapper = false
        }

        const handleFocus = () => {
            mouseIsInWrapper = true
            wrapper.addEventListener('mouseenter', handleMouseEnter)
            wrapper.addEventListener('mouseleave', handleMouseLeave)
        }

        const handleBlur = () => {
            !mouseIsInWrapper && setIsOpen(false)
            wrapper.removeEventListener('mouseenter', handleMouseEnter)
            wrapper.removeEventListener('mouseleave', handleMouseLeave)
        }

        input.addEventListener('focus', handleFocus)
        input.addEventListener('blur', handleBlur)

        return () => {
            input.removeEventListener('focus', handleFocus)
            input.removeEventListener('blur', handleBlur)
        }
    }, [id])

    /**
     * Updates the dimensions of the positional wrapper based on the dimensions of the wrapper element.
     */
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
