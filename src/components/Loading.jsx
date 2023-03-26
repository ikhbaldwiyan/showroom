import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";

export default function Loading({ color, size }) {
  return (
    <PulseLoader
      size={size ?? 12}
      color={color ?? "#D1D7E0"}
    />
  )
}
