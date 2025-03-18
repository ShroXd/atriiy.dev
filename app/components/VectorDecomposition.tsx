'use client'

import React, { useEffect, useRef, useState } from 'react'

const VectorDecomposition = () => {
  const [hover, setHover] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 200, y: 100 })
  const canvasRef = useRef(null)

  // Constants for canvas
  const width = 400
  const height = 300
  const centerX = width / 2
  const centerY = height / 2
  const gridSize = 20

  // Handle mouse move to update vector
  const handleMouseMove = e => {
    const rect = (canvasRef.current as any).getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Draw the vector and decomposition
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = (canvas as any).getContext('2d')

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw grid with dotted lines
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 0.5
    ctx.setLineDash([2, 2])

    // Vertical grid lines
    for (let x = centerX % gridSize; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let y = centerY % gridSize; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Reset line dash
    ctx.setLineDash([])

    // Draw axes
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2

    // X-axis
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()

    // Label axes
    ctx.fillStyle = '#000'
    ctx.font = '14px Arial'
    ctx.fillText('X', width - 15, centerY - 10)
    ctx.fillText('Y', centerX + 10, 15)

    // Calculate vector components
    const vectorX = mousePos.x - centerX
    const vectorY = centerY - mousePos.y // Invert Y for mathematical coordinates

    // Draw the main vector with a modern blue
    ctx.strokeStyle = '#556DFF' // Modern vibrant blue
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(mousePos.x, mousePos.y)
    ctx.stroke()

    // Draw arrowhead for the main vector
    const angle = Math.atan2(centerY - mousePos.y, mousePos.x - centerX)
    ctx.beginPath()
    ctx.moveTo(mousePos.x, mousePos.y)
    ctx.lineTo(
      mousePos.x - 15 * Math.cos(angle - Math.PI / 6),
      mousePos.y + 15 * Math.sin(angle - Math.PI / 6)
    )
    ctx.lineTo(
      mousePos.x - 15 * Math.cos(angle + Math.PI / 6),
      mousePos.y + 15 * Math.sin(angle + Math.PI / 6)
    )
    ctx.closePath()
    ctx.fillStyle = '#556DFF'
    ctx.fill()

    // Draw decomposed vectors if hovering
    if (hover) {
      // X component along the x-axis
      ctx.strokeStyle = '#FF6B8B' // Modern pink
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + vectorX, centerY)
      ctx.stroke()

      // X component arrowhead
      if (vectorX !== 0) {
        const angleX = vectorX > 0 ? 0 : Math.PI
        ctx.beginPath()
        ctx.moveTo(centerX + vectorX, centerY)
        ctx.lineTo(
          centerX + vectorX - 10 * Math.cos(angleX - Math.PI / 6),
          centerY - 10 * Math.sin(angleX - Math.PI / 6)
        )
        ctx.lineTo(
          centerX + vectorX - 10 * Math.cos(angleX + Math.PI / 6),
          centerY - 10 * Math.sin(angleX + Math.PI / 6)
        )
        ctx.closePath()
        ctx.fillStyle = '#FF6B8B'
        ctx.fill()
      }

      // Y component along the y-axis
      ctx.strokeStyle = '#4ECDC4' // Modern teal
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX, centerY - vectorY)
      ctx.stroke()

      // Y component arrowhead
      if (vectorY !== 0) {
        const angleY = vectorY > 0 ? -Math.PI / 2 : Math.PI / 2
        ctx.beginPath()
        ctx.moveTo(centerX, centerY - vectorY)
        ctx.lineTo(
          centerX - 10 * Math.cos(angleY - Math.PI / 6),
          centerY - vectorY - 10 * Math.sin(angleY - Math.PI / 6)
        )
        ctx.lineTo(
          centerX - 10 * Math.cos(angleY + Math.PI / 6),
          centerY - vectorY - 10 * Math.sin(angleY + Math.PI / 6)
        )
        ctx.closePath()
        ctx.fillStyle = '#4ECDC4'
        ctx.fill()
      }

      // Dotted lines to connect components to the original vector
      ctx.setLineDash([5, 3])

      // Horizontal dotted line from y-component to vector
      ctx.strokeStyle = '#4ECDC4'
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - vectorY)
      ctx.lineTo(mousePos.x, centerY - vectorY)
      ctx.stroke()

      // Vertical dotted line from x-component to vector
      ctx.strokeStyle = '#FF6B8B'
      ctx.beginPath()
      ctx.moveTo(centerX + vectorX, centerY)
      ctx.lineTo(centerX + vectorX, mousePos.y)
      ctx.stroke()

      // Remove dash pattern
      ctx.setLineDash([])

      // Draw component labels
      ctx.font = 'bold 14px Arial'

      // X component label
      ctx.fillStyle = '#FF6B8B'
      const xLabelX = centerX + vectorX / 2
      const xLabelY = centerY + 20

      // Add background to label
      const xLabel = `X: ${vectorX.toFixed(0)}`
      const xLabelWidth = ctx.measureText(xLabel).width
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fillRect(
        xLabelX - xLabelWidth / 2 - 3,
        xLabelY - 14,
        xLabelWidth + 6,
        20
      )

      // Draw text
      ctx.fillStyle = '#FF6B8B'
      ctx.textAlign = 'center'
      ctx.fillText(xLabel, xLabelX, xLabelY)

      // Y component label
      ctx.fillStyle = '#4ECDC4'
      const yLabelX = centerX - 25
      const yLabelY = centerY - vectorY / 2

      // Add background to label
      const yLabel = `Y: ${vectorY.toFixed(0)}`
      const yLabelWidth = ctx.measureText(yLabel).width
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fillRect(yLabelX - 3, yLabelY - 14, yLabelWidth + 6, 20)

      // Draw text
      ctx.fillStyle = '#4ECDC4'
      ctx.textAlign = 'left'
      ctx.fillText(yLabel, yLabelX, yLabelY)

      // Reset text alignment
      ctx.textAlign = 'start'
    }

    // Draw vector label with modern style
    ctx.fillStyle = '#556DFF' // Match the vector color
    ctx.font = 'bold 14px Arial'
    const magnitude = Math.sqrt(vectorX * vectorX + vectorY * vectorY).toFixed(
      0
    )
    const labelX = centerX + vectorX / 2 + 5
    const labelY = centerY - vectorY / 2 - 10

    // Add a subtle background to the labels for better readability
    const labelTextV = `V(${vectorX.toFixed(0)}, ${vectorY.toFixed(0)})`
    const labelTextMag = `|V| = ${magnitude}`
    const textWidth = Math.max(
      ctx.measureText(labelTextV).width,
      ctx.measureText(labelTextMag).width
    )

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.fillRect(labelX - 5, labelY - 15, textWidth + 10, 45)

    ctx.fillStyle = '#556DFF'
    ctx.fillText(labelTextV, labelX, labelY)
    ctx.fillText(labelTextMag, labelX, labelY + 20)
  }, [mousePos, hover])

  return (
    <div className='flex flex-col items-center p-6'>
      <div className='rounded-lg bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 p-1'>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className='rounded-md bg-white shadow-sm'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>
    </div>
  )
}

export default VectorDecomposition
