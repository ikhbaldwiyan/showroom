const { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } = require("reactstrap");

export const FilterDropdown = ({ dropdownList,isOpen,toggler }) => (
  <Dropdown isOpen={isOpen} toggle={toggler} direction="down">
    <DropdownToggle caret color="light" className="text-dark">
      {dropdownList.current}
    </DropdownToggle>
    <DropdownMenu
      right
      modifiers={{
        preventOverflow: { enabled: true, boundariesElement: "viewport" },
      }}
    >
      <DropdownItem header>{dropdownList.title}</DropdownItem>
      {dropdownList.dropdown.map(({ action, disabled, name }) => (
        <DropdownItem tag="button" onClick={action} disabled={disabled}>
          {name}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);

export default FilterDropdown;