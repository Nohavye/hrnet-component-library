import * as lib from '../../lib/main'
import * as mock from '../mock'
import styles from './styles.module.css'

// Component to develop
export const TargetComponent = () => (
    <lib.DropdownSelector
        id={mock.DROPDOWN_SELECTOR.ID}
        classNames={{
            wrapper: styles.wrapper,
            input: styles.input,
            item: styles.item,
        }}
        items={mock.DROPDOWN_SELECTOR.ITEMS}
    />
)
