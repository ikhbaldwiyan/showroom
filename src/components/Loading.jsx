import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({ color, size }) {
  return (
    <ClipLoader
      size={size ?? 12}
      color={color ?? "#D1D7E0"}
    />
  )
}
