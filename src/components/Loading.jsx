import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";

export default function Loading() {
  return (
    <div style={{marginBottom: 10, marginTop: 10}}>
      <PulseLoader
        size={12}
        color="#D1D7E0"
      />
    </div>
  )
}
