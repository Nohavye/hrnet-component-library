# hrnet-component-library

React component library for the HRnet application.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed:

-   [Node.js](https://nodejs.org/) (minimum recommended version: 16.14)
-   [React](https://reactjs.org/) (minimum recommended version: 18.2.0)
-   [React DOM](https://reactjs.org/docs/react-dom.html) (minimum recommended version: 18.2.0)
-   Modern web browser (e.g., Chrome, Firefox, Safari)

_NOTE: We strongly recommend using Visual Studio Code as your integrated development environment (IDE) for this project. It provides excellent support for JavaScript, TypeScript and web development._

## Installation

Run the following command :

With npm :

```bash
npm install @hrnet-org/hrnet-component-library
```

Or yarn :

```bash
yarn add @hrnet-org/hrnet-component-library
```

## List of components

### Drop-down selector component

-   `<DropdownSelector />`

    #### Props :

    -   `id: string` - The ID of the dropdown input field.

    -   `classNames?: ClassNames | null` - (Optional) Literal object used to define a CSS class for styling each element of the dropdown.
        ```ts
        type ClassNames = {
            wrapper?: string
            input?: string
            items_wrapper?: string
            item?: string
        }
        ```
    -   `items: Array<string>` - The list of items to choose from.

    -   `maxHeight?: number | null` - (Optional) Maximum dropdown height.

    -   `placeholder?: string` - (Optional, default value: `'Select an item'`) The placeholder.

    #### Style :

    -   The component has a default CSS style. You can override this style using certain predefined CSS classes or through the `classNames` prop :

    ##### All the Dropdown :

    To style all the Dropdown components in your project, I recommend using the CSS class `hrnet_dropdownselector_{element}` in conjunction with the CSS class `overload` replacing `{element}` with the name of the targeted item from this list:

    -   `wrapper` : The main container
    -   `input` : The dropdown input
    -   `items_wrapper` : The container for the list of items
    -   `item` : An item

    Example :

    ```css
    .hrnet_dropdownselector_wrapper.overload {
        background-color: white;
        padding: 5px 10px;
    }

    .hrnet_dropdownselector_input.overload {
        font-size: 16px;
    }
    ```

    ##### A specific Dropdown :

    To style a specific Dropdown component, we will use the 'classNames' prop of the component, and I recommend using it with CSS modules, as shown in the example below :

    Example :

    ```css
    /* styles.module.css */

    .wrapper {
        background-color: gray;
        padding: 10px 20px;
    }

    .input {
        font-size: 20px;
    }

    .item:hover {
        background-color: rgb(80, 80, 136);
    }
    ```

    ```jsx
    // index.jsx
    import { DropdownSelector } from '@hrnet-org/hrnet-component-library'
    import styles from './styles.module.css'

    const MyDropDown = () => (
        <DropdownSelector
            id="my_dropdown"
            classNames={{
                wrapper: styles.wrapper,
                input: styles.input,
                item: styles.item,
            }}
            items={['item 1', 'item 2', 'item 3']}
        />
    )
    ```

    _IMPORTANT : To make the magic happen, you should first import the Dropdown component before importing the CSS module._

    #### How to retrieve the value of my Dropdown component:

    Example, with the ID 'country':

    ```js
    const dropDownInput = document.getElementById('country')
    const dropDownValue = dropDownInput.value
    ```
