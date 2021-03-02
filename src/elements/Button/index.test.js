import React from 'react';
import { render } from '@testing-library/react';
import Button from './index';

test("Should not allowed click button if isDisabled is present", () => {
  const {container} = render(<Button isDisabled></Button>)

  expect(container.querySelector('span.disabled')).toBeInTheDocument()
})

test("Should render <a> tag", () => {
  const { container } = render(<Button type="link" isExternal></Button>)

  expect(container.querySelector("a")).toBeInTheDocument()
})