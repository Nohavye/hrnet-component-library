# hrnet-component-library

Library of React components created using `vite`.

## Installation

Run the following command: `npm install @hrnet-public/hrnet-component-library`

## List of components

### Drop-down selector component

-   `<DropdownSelector />`

    #### Props:

    -   `id` : The ID of the dropdown input field.
    -   `items` : The list of items to choose from.
    -   `placeholder`: The placeholder (optional).

    #### Style:

    -   The component has default CSS styling. You can override this style by combining the base CSS class of the target element with the 'overload' CSS class :

    To style all DropDown components in our project, we will use the CSS class `hrnet-dropdown-{element}` replacing `{element}` with the name of the targeted item from this list:

    -   `wrapper` : The main container
    -   `input` : The dropdown input
    -   `items_wrapper` : The container for the list of items
    -   `item` : An item

    Example :

    ```css
    .hrnet-dropdown-wrapper.overload {
        background-color: white;
        padding: 5px 10px;
    }

    .hrnet-dropdown-input.overload {
        font-size: 16px;
    }
    ```

    To style a specific DropDown component, we will use the CSS class `{id}-{element}` replacing `{id}` with the desired DropDown's ID and `{element}` with the name of the targeted element for that DropDown:

    For example, with the ID 'country':

    ```css
    .country-wrapper.overload {
        background-color: gray;
    }

    .country-input.overload {
        font-weight: bold;
    }
    ```

    #### How to retrieve the value of my Dropdown component:

    example, with the ID 'country':

    ```js
    const dropDownInput = document.getElementById('country')
    const dropDownValue = dropDownInput.value
    ```
