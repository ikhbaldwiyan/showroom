import React from "react";
import { Link } from 'react-router-dom'
import propTypes from 'prop-types';

export default function Button(props) {
  const className = [props.className]
  if (props.isPrimary) className.push('bnt-primary')
  if (props.isLarge) className.push('bnt-lg')
  if (props.isSmall) className.push('bnt-sm')
  if (props.isBlock) className.push('bnt-block')
  if (props.hasShadow) className.push('bnt-shadow')

  const onClick = () => {
    if (props.onClick) props.onClick()
  }

  if (props.isDisabled || props.isLoading) {
    if (props.isDisabled) className.push("disabled")
    return (
      <span className={className.join(" ")} style={props.style}>
        {props.isLoading ? <span className="spinner-border-sm mx-5"></span> : props.children}
      </span>
    )
  }

  if (props.type == "link") {
    if (props.isExternal) {
      return (
        <a href={props.href}
          className={className.join(" ")}
          style={props.style}
          target={props.target === "_blank" ? "_blank" : ""}
          rel={props.target === "_blank" ? "noopener noreferrer" : ""}
        >
          {props.children}
        </a>
      )
    } else {
      <Link
        to={props.href}
        className={className.join(" ")}
        style={props.style}
        onClick={onClick}
      >
        {props.children}
      </Link>
    }
  }

  return <button
    className={className.join(" ")}
    style={props.style}
    onClick={onClick}
  >
    {props.children}
  </button>
}

Button.propTypes = {
  type: propTypes.oneOf(["button", "link"]),
  onClick: propTypes.func,
  href: propTypes.string,
  className: propTypes.string,
  isDisabled: propTypes.bool,
  isLoading: propTypes.bool,
  isSmall: propTypes.bool,
  isLarge: propTypes.bool,
  isBlock: propTypes.bool,
  isExternal: propTypes.bool,
  hasShadow: propTypes.bool,
}