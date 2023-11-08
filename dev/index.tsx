import * as lib from '../lib/main'
import * as mock from './mock'

// Component to develop
export const TargetComponent = () => (
    <lib.DropdownSelector
        id={mock.DROPDOWN_SELECTOR.ID}
        maxHeight={300}
        items={mock.DROPDOWN_SELECTOR.ITEMS}
    />
)
