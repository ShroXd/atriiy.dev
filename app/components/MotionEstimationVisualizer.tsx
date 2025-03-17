'use client'

import React, { useEffect, useRef, useState } from 'react'

interface MotionEstimationVisualizerProps {
  className?: string
}

export const MotionEstimationVisualizer = ({
  className,
}: MotionEstimationVisualizerProps) => {
  // State to track mouse position and interaction
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [activeFrame, setActiveFrame] = useState(null)
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 })

  // Container references to get relative positioning
  const frame1Ref = useRef(null)
  const frame2Ref = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate frame size based on container width
  useEffect(() => {
    const updateFrameSize = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth
      const isMobile = containerWidth < 768 // Breakpoint for mobile view

      // In mobile view, each frame takes full width
      // In desktop view, each frame takes roughly half the container width
      const frameWidth = isMobile
        ? containerWidth - 16
        : (containerWidth - 32) / 2

      // Maintain 4:3 aspect ratio
      const frameHeight = frameWidth * 0.75

      setFrameSize({ width: frameWidth, height: frameHeight })
    }

    // Initial size calculation
    updateFrameSize()

    // Update on window resize
    window.addEventListener('resize', updateFrameSize)
    return () => window.removeEventListener('resize', updateFrameSize)
  }, [])

  // Define object positions in both frames - using relative positions (0-1 scale)
  // This allows scaling with container size
  const objectPositions = [
    // Blue square
    {
      type: 'rect',
      color: 'blue',
      frame1: { x: 0.22, y: 0.3, width: 0.28, height: 0.37 },
      frame2: { x: 0.31, y: 0.37, width: 0.28, height: 0.37 },
    },
    // Red circle
    {
      type: 'circle',
      color: 'red',
      frame1: { x: 0.67, y: 0.59, radius: 0.19 },
      frame2: { x: 0.61, y: 0.52, radius: 0.19 },
    },
  ]

  // Convert relative positions to actual pixel values based on frame size
  const getScaledPosition = (pos, isCircleRadius = false) => {
    if (isCircleRadius) {
      return pos * Math.min(frameSize.width, frameSize.height)
    }
    return (
      pos *
      (isCircleRadius
        ? Math.min(frameSize.width, frameSize.height)
        : frameSize.width)
    )
  }

  // Calculate motion vectors based on scaled object positions
  const getMotionVectors = () => {
    return objectPositions
      .map(obj => {
        if (obj.type === 'rect') {
          const x1 = getScaledPosition(obj.frame1.x)
          const y1 = getScaledPosition(obj.frame1.y, true)
          const width1 = getScaledPosition(obj.frame1.width)
          const height1 = getScaledPosition(obj.frame1.height, true)

          const x2 = getScaledPosition(obj.frame2.x)
          const y2 = getScaledPosition(obj.frame2.y, true)
          const width2 = getScaledPosition(obj.frame2.width)
          const height2 = getScaledPosition(obj.frame2.height, true)

          return {
            fromX: x1 + width1 / 2,
            fromY: y1 + height1 / 2,
            toX: x2 + width2 / 2,
            toY: y2 + height2 / 2,
            vecX: x2 - x1 + (width2 - width1) / 2,
            vecY: y2 - y1 + (height2 - height1) / 2,
          }
        } else if (obj.type === 'circle') {
          const x1 = getScaledPosition(obj.frame1.x)
          const y1 = getScaledPosition(obj.frame1.y, true)
          const x2 = getScaledPosition(obj.frame2.x)
          const y2 = getScaledPosition(obj.frame2.y, true)

          return {
            fromX: x1,
            fromY: y1,
            toX: x2,
            toY: y2,
            vecX: x2 - x1,
            vecY: y2 - y1,
          }
        }
        return null
      })
      .filter(v => v !== null)
  }

  // Handle mouse movement
  const handleMouseMove = (e, frameRef, frameType) => {
    if (!frameRef.current) return

    const bounds = frameRef.current.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top

    // Make sure coordinates are within bounds
    const validX = Math.max(0, Math.min(bounds.width, x))
    const validY = Math.max(0, Math.min(bounds.height, y))

    setMousePosition({ x: validX, y: validY })
    setIsHovering(true)
    setActiveFrame(frameType)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setActiveFrame(null)
  }

  // Render objects in frames
  const renderObjects = frameNum => {
    return objectPositions.map((obj, idx) => {
      const frameData = frameNum === 1 ? obj.frame1 : obj.frame2

      if (obj.type === 'rect') {
        const x = getScaledPosition(frameData.x)
        const y = getScaledPosition(frameData.y, true)
        const width = getScaledPosition(frameData.width)
        const height = getScaledPosition(frameData.height, true)

        return (
          <div
            key={`${frameNum}-rect-${idx}`}
            className={`absolute rounded-lg bg-${obj.color}-200 border border-${obj.color}-400`}
            style={{
              left: x,
              top: y,
              width: width,
              height: height,
            }}
          />
        )
      } else if (obj.type === 'circle') {
        const x = getScaledPosition(frameData.x)
        const y = getScaledPosition(frameData.y, true)
        const radius = getScaledPosition(frameData.radius, true)

        return (
          <div
            key={`${frameNum}-circle-${idx}`}
            className={`absolute rounded-full bg-${obj.color}-200 border border-${obj.color}-400`}
            style={{
              left: x - radius,
              top: y - radius,
              width: radius * 2,
              height: radius * 2,
            }}
          />
        )
      }
      return null
    })
  }

  const renderBlock = (x, y, isReference) => {
    // Scale block size based on frame dimensions
    const blockSize = Math.min(frameSize.width, frameSize.height) * 0.15
    const halfBlock = blockSize / 2

    const blockStyle = isReference
      ? {
          borderColor: 'rgba(59, 130, 246, 0.9)',
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)',
        }
      : {
          borderColor: 'rgba(239, 68, 68, 0.9)',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.3)',
        }

    return (
      <div
        className='pointer-events-none absolute rounded-sm border-2'
        style={{
          left: x - halfBlock,
          top: y - halfBlock,
          width: blockSize,
          height: blockSize,
          ...blockStyle,
          zIndex: 20,
        }}
      />
    )
  }

  const renderMotionVectors = () => {
    const vectors = getMotionVectors()

    return vectors.map(({ fromX, fromY, toX, toY, vecX, vecY }, idx) => {
      // Calculate distance from mouse position to the vector start point
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - fromX, 2) +
          Math.pow(mousePosition.y - fromY, 2)
      )

      // Highlight the vector if mouse is close to it
      const isHighlighted = isHovering && distance < frameSize.width * 0.11

      // Vector magnitude for display
      const vectorLength = Math.round(
        Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2))
      )

      return (
        <React.Fragment key={idx}>
          {/* Vector line */}
          <svg
            className='pointer-events-none absolute top-0 left-0 h-full w-full'
            style={{ zIndex: 15 }}
          >
            <defs>
              <marker
                id={`arrowhead-${idx}-${isHighlighted ? 'highlighted' : 'normal'}`}
                markerWidth='10'
                markerHeight='7'
                refX='0'
                refY='3.5'
                orient='auto'
              >
                <polygon
                  points='0 0, 10 3.5, 0 7'
                  fill={isHighlighted ? '#ef4444' : '#3b82f6'}
                />
              </marker>
            </defs>
            <line
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke={isHighlighted ? '#ef4444' : '#3b82f6'}
              strokeWidth={isHighlighted ? 3 : 2}
              strokeDasharray={isHighlighted ? '' : '4,2'}
              markerEnd={`url(#arrowhead-${idx}-${isHighlighted ? 'highlighted' : 'normal'})`}
            />

            {/* Show distance label for vectors */}
            <text
              x={(fromX + toX) / 2}
              y={(fromY + toY) / 2 - 10}
              fill={isHighlighted ? '#ef4444' : '#3b82f6'}
              fontSize={frameSize.width * 0.033}
              fontWeight='bold'
              textAnchor='middle'
              style={{
                opacity: isHighlighted ? 1 : 0.8,
              }}
            >
              {vectorLength}px
            </text>
          </svg>

          {/* Show blocks on hover */}
          {isHighlighted && (
            <>
              {renderBlock(fromX, fromY, true)}
              {renderBlock(toX, toY, false)}
            </>
          )}
        </React.Fragment>
      )
    })
  }

  const renderGrid = () => {
    // Scale grid size based on frame dimensions
    const blockSize = Math.min(frameSize.width, frameSize.height) * 0.15

    // Use array to store grid lines
    const gridLines: JSX.Element[] = []

    // Vertical lines
    for (let x = blockSize; x < frameSize.width; x += blockSize) {
      gridLines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1='0'
          x2={x}
          y2={frameSize.height}
          stroke='rgba(148, 163, 184, 0.5)'
          strokeWidth='1'
          strokeDasharray='3,3'
        />
      )
    }

    // Horizontal lines
    for (let y = blockSize; y < frameSize.height; y += blockSize) {
      gridLines.push(
        <line
          key={`h-${y}`}
          x1='0'
          y1={y}
          x2={frameSize.width}
          y2={y}
          stroke='rgba(148, 163, 184, 0.5)'
          strokeWidth='1'
          strokeDasharray='3,3'
        />
      )
    }

    return (
      <svg className='pointer-events-none absolute top-0 left-0 h-full w-full'>
        {gridLines}
      </svg>
    )
  }

  return (
    <div className={`mx-auto w-full ${className}`} ref={containerRef}>
      <div className='flex flex-col justify-center gap-4 md:flex-row'>
        {/* Reference Frame (Previous) */}
        <div className='relative flex-1'>
          <div className='mb-2 flex items-center font-medium text-gray-700'>
            <div className='mr-2 h-3 w-3 rounded-full bg-blue-500'></div>
            Reference Frame
          </div>
          <div
            className='relative overflow-hidden rounded-lg border-2 border-blue-500 bg-white shadow-md'
            style={{
              width: `${frameSize.width}px`,
              height: `${frameSize.height}px`,
              maxWidth: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              ref={frame1Ref}
              className='relative h-full w-full'
              onMouseMove={e => handleMouseMove(e, frame1Ref, 'reference')}
              onMouseLeave={handleMouseLeave}
            >
              {/* Render objects in reference frame */}
              {renderObjects(1)}

              {renderGrid()}

              {/* Highlight area around mouse on hover */}
              {isHovering && activeFrame === 'reference' && (
                <div
                  className='bg-opacity-20 pointer-events-none absolute z-30 rounded-sm border-2 border-blue-500 bg-blue-500'
                  style={{
                    left: mousePosition.x - frameSize.width * 0.05,
                    top: mousePosition.y - frameSize.height * 0.07,
                    width: frameSize.width * 0.1,
                    height: frameSize.height * 0.14,
                    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.15)',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Current Frame */}
        <div className='relative flex-1'>
          <div className='mb-2 flex items-center font-medium text-gray-700'>
            <div className='mr-2 h-3 w-3 rounded-full bg-red-500'></div>
            Current Frame
          </div>
          <div
            className='relative overflow-hidden rounded-lg border-2 border-red-500 bg-white shadow-md'
            style={{
              width: `${frameSize.width}px`,
              height: `${frameSize.height}px`,
              maxWidth: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              ref={frame2Ref}
              className='relative h-full w-full'
              onMouseMove={e => handleMouseMove(e, frame2Ref, 'current')}
              onMouseLeave={handleMouseLeave}
            >
              {/* Render objects in current frame */}
              {renderObjects(2)}

              {renderGrid()}

              {/* Show motion vectors overlay */}
              {renderMotionVectors()}

              {/* Highlight area around mouse on hover */}
              {isHovering && activeFrame === 'current' && (
                <div
                  className='bg-opacity-20 pointer-events-none absolute z-30 rounded-sm border-2 border-red-500 bg-red-500'
                  style={{
                    left: mousePosition.x - frameSize.width * 0.05,
                    top: mousePosition.y - frameSize.height * 0.07,
                    width: frameSize.width * 0.1,
                    height: frameSize.height * 0.14,
                    boxShadow: '0 0 0 4px rgba(239, 68, 68, 0.15)',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
