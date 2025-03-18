'use client'

import React, { useEffect, useRef, useState } from 'react'

const DCTVisualization = () => {
  const [hover, setHover] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const canvasRef = useRef(null)

  // State for component toggles and quantization values
  const [componentToggles, setComponentToggles] = useState([
    true, // DC component
    true, // Low frequency
    true, // Mid frequency
    true, // High frequency
  ])

  // Add quantization controls - values represent percentage of coefficient to preserve
  // 100% = full coefficient, 0% = completely removed
  const [quantizationValues, setQuantizationValues] = useState([
    100, // DC component quantization (100% preserved)
    100, // Low frequency quantization (100% preserved)
    100, // Mid frequency quantization (100% preserved)
    100, // High frequency quantization (100% preserved)
  ])

  // Canvas dimensions - make them responsive to container width
  const width = 700
  const height = 750
  const padding = 40
  const graphHeight = 90
  const topMargin = 20
  const reconstructionSpacing = 30

  // Create a more pronounced signal with greater oscillation
  const createSignal = () => {
    const points: { x: number; y: number }[] = []
    const numPoints = 100

    for (let i = 0; i < numPoints; i++) {
      const x = (i * (width - 2 * padding)) / numPoints + padding

      // Create a signal with multiple frequency components
      // Using larger amplitudes for low frequencies and smaller for high frequencies
      // to match real-world signals
      let y =
        60 * Math.sin(i * 0.02 * Math.PI + 0.3) + // Very low frequency (larger amplitude)
        35 * Math.sin(i * 0.08 * Math.PI + 0.5) + // Low frequency
        20 * Math.sin(i * 0.2 * Math.PI) + // Medium frequency
        10 * Math.sin(i * 0.5 * Math.PI - 0.2) // High frequency (smaller amplitude)

      // Center vertically within graph area with increased amplitude
      y = graphHeight / 2 - y * 0.5

      points.push({ x, y })
    }

    return points
  }

  // Generate DCT basis functions
  const createDCTBasis = (k, numPoints) => {
    const points: { x: number; y: number }[] = []

    for (let i = 0; i < numPoints; i++) {
      const x = (i * (width - 2 * padding)) / numPoints + padding
      let y = 0

      if (k === 0) {
        // DC component (constant value - the average)
        y = graphHeight / 2 - 40 // Increased offset for more visual impact
      } else {
        // Cosine component with frequency determined by k
        // Amplitude decreases for higher frequencies to match real-world signals
        const amplitude = Math.min(40, 60 / k) // Increased overall amplitude
        y =
          graphHeight / 2 -
          amplitude * Math.cos((Math.PI * k * i) / (numPoints / 2))
      }

      points.push({ x, y })
    }

    return points
  }

  // Calculate DCT coefficients for the signal - using proper DCT formula
  const calculateDCTCoefficients = (signalData, numCoefficients) => {
    try {
      const N = signalData.length
      const coefficients: number[] = []

      for (let k = 0; k < numCoefficients; k++) {
        let sum = 0
        const normalizer = k === 0 ? Math.sqrt(1 / N) : Math.sqrt(2 / N)

        for (let n = 0; n < N; n++) {
          // Standard DCT-II formula used in image/video compression
          const value = signalData[n] || 0
          sum += value * Math.cos((Math.PI * k * (2 * n + 1)) / (2 * N))
        }

        coefficients.push(sum * normalizer)
      }

      return coefficients
    } catch (error) {
      console.error('Error calculating DCT coefficients:', error)
      return [1, 0, 0, 0]
    }
  }

  // Reconstruct signal from DCT coefficients
  const reconstructSignalFromDCT = (coefficients, numPoints) => {
    try {
      const reconstructedSignal = new Array(numPoints).fill(0)

      if (!coefficients || !coefficients.length) {
        return reconstructedSignal
      }

      for (let n = 0; n < numPoints; n++) {
        let sum = 0

        for (let k = 0; k < coefficients.length; k++) {
          const normalizer =
            k === 0 ? Math.sqrt(1 / numPoints) : Math.sqrt(2 / numPoints)
          const coef = coefficients[k] || 0
          sum +=
            normalizer *
            coef *
            Math.cos((Math.PI * k * (2 * n + 1)) / (2 * numPoints))
        }

        reconstructedSignal[n] = sum
      }

      return reconstructedSignal
    } catch (error) {
      console.error('Error reconstructing signal:', error)
      return new Array(numPoints).fill(0)
    }
  }

  // Apply quantization to DCT coefficients
  const applyQuantization = (coefficients, quantizationFactors) => {
    return coefficients.map((coef, index) => {
      // Apply the quantization factor (percentage of coefficient to preserve)
      return coef * (quantizationFactors[index] / 100)
    })
  }

  // Handle mouse movement
  const handleMouseMove = e => {
    const rect = (canvasRef.current as any)?.getBoundingClientRect()
    if (!rect) return

    const scaleX = width / rect.width
    const canvasX = (e.clientX - rect.left) * scaleX

    setMouseX(canvasX)
  }

  // Toggle a DCT component
  const toggleComponent = index => {
    const newToggles = [...componentToggles]
    newToggles[index] = !newToggles[index]
    setComponentToggles(newToggles)
  }

  // Update quantization value
  const updateQuantization = (index, value) => {
    const newValues = [...quantizationValues]
    newValues[index] = value
    setQuantizationValues(newValues)
  }

  // Preset for "Reduce High Frequencies" demo
  const setReduceHighFreqPreset = () => {
    setQuantizationValues([100, 100, 50, 10]) // Preserve DC and low, reduce mid and high
    setComponentToggles([true, true, true, true]) // Show all components
  }

  // Preset for "Reduce Low Frequencies" demo
  const setReduceLowFreqPreset = () => {
    setQuantizationValues([50, 60, 100, 100]) // Reduce DC and low, preserve mid and high
    setComponentToggles([true, true, true, true]) // Show all components
  }

  // Reset all settings
  const resetAllSettings = () => {
    setQuantizationValues([100, 100, 100, 100]) // Full preservation
    setComponentToggles([true, true, true, true]) // Show all components
  }

  // Calculate original signal
  const originalSignalPoints = createSignal()

  // Draw everything
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = (canvas as any).getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Use the original signal points
    const signalPoints = originalSignalPoints

    // Calculate DCT coefficients
    const signalData = signalPoints.map(point => point.y) // Extract y values
    const dctCoefficients = calculateDCTCoefficients(signalData, 4)

    // Apply quantization to coefficients
    const quantizedCoefficients = applyQuantization(
      dctCoefficients,
      quantizationValues
    )

    // Apply toggles and quantization for final reconstruction
    const filteredCoefficients = quantizedCoefficients.map((coef, index) =>
      componentToggles[index] ? coef : 0
    )

    // Quantized reconstruction
    const quantizedReconstructionValues = reconstructSignalFromDCT(
      filteredCoefficients,
      signalPoints.length
    )

    // Convert quantized reconstruction to points
    const quantizedReconstructionPoints = quantizedReconstructionValues.map(
      (y, i) => {
        const x = (i * (width - 2 * padding)) / signalPoints.length + padding
        return {
          x,
          y: graphHeight / 2 - y * 0.5, // Match original signal scaling
        }
      }
    )

    // Calculate original signal's full reconstruction (using all coefficients, unaffected by quantization)
    const fullDCTCoefficients = calculateDCTCoefficients(signalData, 4)
    const fullReconstructionValues = reconstructSignalFromDCT(
      fullDCTCoefficients,
      signalPoints.length
    )

    // Convert full reconstruction values to points
    const fullReconstructionPoints = fullReconstructionValues.map((y, i) => {
      const x = (i * (width - 2 * padding)) / signalPoints.length + padding
      return {
        x,
        y: graphHeight / 2 - y * 0.5, // Match original signal scaling
      }
    })

    // Use full reconstruction points as the effective signal
    const effectiveSignalPoints = fullReconstructionPoints

    // Background styling
    ctx.fillStyle = '#f8f9fa'
    ctx.fillRect(0, 0, width, height)

    // Draw grid with dotted lines
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 0.5
    ctx.setLineDash([2, 2])

    // Vertical grid lines
    for (let x = padding; x <= width - padding; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Horizontal grid lines - one set for each graph (now including original signal + 6 graphs total)
    for (let graph = 0; graph < 7; graph++) {
      // 1 original + 4 DCT components + 1 reconstructed with full coefficients + 1 with quantized coefficients
      const yOffset = graph * graphHeight + topMargin // 添加顶部边距
      const yCenter = yOffset + graphHeight / 2

      // Center line for this graph (axis)
      ctx.strokeStyle = '#d0d0d0'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(padding, yCenter)
      ctx.lineTo(width - padding, yCenter)
      ctx.stroke()

      // Upper and lower bounds
      ctx.strokeStyle = '#e8e8e8'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(padding, yCenter - graphHeight / 2 + 10)
      ctx.lineTo(width - padding, yCenter - graphHeight / 2 + 10)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(padding, yCenter + graphHeight / 2 - 10)
      ctx.lineTo(width - padding, yCenter + graphHeight / 2 - 10)
      ctx.stroke()
    }
    ctx.setLineDash([])

    // Draw a signal on the graph
    const drawSignal = (
      points,
      yOffset,
      color,
      title,
      isActive = true,
      quantInfo = null
    ) => {
      // Add title
      ctx.fillStyle = isActive ? '#333' : '#aaa'
      ctx.font = 'bold 14px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(title, padding, yOffset + 15)

      // Add coefficient value if applicable
      if (title.includes('DCT')) {
        const k = parseInt(title.slice(-1))

        if (dctCoefficients && dctCoefficients[k] !== undefined) {
          const origCoef = dctCoefficients[k].toFixed(1)
          const quantCoef = quantizedCoefficients[k].toFixed(1)

          // Add coefficient and quantization info
          ctx.fillStyle = isActive ? color : '#aaa'
          ctx.font = 'bold 12px Arial'
          ctx.textAlign = 'right'

          // Show both original and quantized values
          if (quantizationValues[k] !== 100) {
            ctx.fillText(
              `Coef: ${origCoef} → ${quantCoef} (${quantizationValues[k]}%)`,
              width - padding - 5,
              yOffset + 15
            )
          } else {
            ctx.fillText(`Coef: ${origCoef}`, width - padding - 5, yOffset + 15)
          }
        }
      }
      // Add quantization info for reconstructed signals
      else if (quantInfo) {
        ctx.fillStyle = '#555'
        ctx.font = '12px Arial'
        ctx.textAlign = 'right'
        ctx.fillText(quantInfo, width - padding - 5, yOffset + 15)
      }

      if (!points || points.length === 0) return

      // Draw the actual signal line
      ctx.strokeStyle = isActive ? color : '#ddd'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y + yOffset)

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y + yOffset)
      }
      ctx.stroke()

      // Add gradient fill beneath curve for better visualization
      if (isActive) {
        const gradient = ctx.createLinearGradient(
          padding,
          yOffset,
          width - padding,
          yOffset
        )
        gradient.addColorStop(0, color + '10') // Very transparent
        gradient.addColorStop(0.5, color + '30') // Semi-transparent
        gradient.addColorStop(1, color + '10') // Very transparent

        // Fill area under curve
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(points[0].x, yOffset + graphHeight / 2)
        for (let i = 0; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y + yOffset)
        }
        ctx.lineTo(points[points.length - 1].x, yOffset + graphHeight / 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    // 绘制原始信号 - 始终使用完整重建的信号
    drawSignal(
      fullReconstructionPoints,
      topMargin,
      '#6366F1',
      'Original Signal'
    )

    // Draw each DCT component
    const colors = ['#F87171', '#34D399', '#FBBF24', '#A78BFA'] // Red, green, amber, purple
    const shortLabels = ['DC Component', 'Low Freq', 'Mid Freq', 'High Freq']

    for (let k = 0; k < 4; k++) {
      const basisPoints = createDCTBasis(k, signalPoints.length)
      const yOffset = (k + 1) * graphHeight + topMargin // 添加顶部边距

      // Scale factor to show the contribution of this component
      let scaleFactor = 1
      if (dctCoefficients && dctCoefficients[k] !== undefined) {
        // Use the quantized coefficient for visualization
        scaleFactor = Math.abs(quantizedCoefficients[k]) / 50
      }

      const scaledBasisPoints = basisPoints.map(point => ({
        x: point.x,
        y: point.y * scaleFactor,
      }))

      // Draw the component
      drawSignal(
        scaledBasisPoints,
        yOffset,
        colors[k],
        `${shortLabels[k]} (DCT ${k})`,
        componentToggles[k]
      )
    }

    // Draw full reconstruction
    drawSignal(
      fullReconstructionPoints,
      5 * graphHeight + topMargin + reconstructionSpacing,
      '#3B82F6',
      'Full DCT Reconstruction',
      true
    )

    // Draw quantized reconstruction
    drawSignal(
      quantizedReconstructionPoints,
      6 * graphHeight + topMargin + 2 * reconstructionSpacing,
      '#EC4899', // Pink color for quantized
      'Quantized Reconstruction',
      true
    )

    // Calculate Mean Squared Error (MSE) between original and quantized signals
    const calculateMSE = (original, reconstructed) => {
      if (
        !original ||
        !reconstructed ||
        original.length !== reconstructed.length
      ) {
        return 0
      }

      let sumSquaredError = 0
      for (let i = 0; i < original.length; i++) {
        const error = original[i].y - reconstructed[i].y
        sumSquaredError += error * error
      }

      return sumSquaredError / original.length
    }

    const mse = calculateMSE(
      fullReconstructionPoints,
      quantizedReconstructionPoints
    )

    // Add MSE info at bottom of canvas
    ctx.fillStyle = '#333'
    ctx.font = '12px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(
      `Mean Squared Error (MSE): ${mse.toFixed(2)} - Lower value means better reconstruction`,
      padding,
      height - 30 // 调整底部文字位置
    )

    // If hovering, show interactive elements
    if (hover && mouseX >= padding && mouseX <= width - padding) {
      try {
        // Find x-position in signal data
        const signalIndex = Math.min(
          Math.floor(
            (mouseX - padding) / ((width - 2 * padding) / signalPoints.length)
          ),
          signalPoints.length - 1
        )

        // Ensure valid index
        if (signalIndex >= 0 && signalIndex < signalPoints.length) {
          const signalX = signalPoints[signalIndex].x

          // Draw vertical line at mouse position
          ctx.setLineDash([5, 3])
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(signalX, 10)
          ctx.lineTo(signalX, height - 40) // 调整垂直线的长度
          ctx.stroke()
          ctx.setLineDash([])

          // Draw intersection points
          const drawIntersectionPoint = (
            graphIndex,
            y,
            color,
            isActive = true
          ) => {
            // 为重建图表添加额外的垂直偏移
            let yOffset = graphIndex * graphHeight + topMargin

            // 为Full DCT Reconstruction添加额外间距
            if (graphIndex === 5) {
              yOffset += reconstructionSpacing
            }
            // 为Quantized Reconstruction添加额外间距
            else if (graphIndex === 6) {
              yOffset += 2 * reconstructionSpacing
            }

            if (y !== undefined && !isNaN(y)) {
              // Draw dot at intersection
              ctx.fillStyle = isActive ? color : '#ddd'
              ctx.beginPath()
              ctx.arc(signalX, y + yOffset, 4, 0, Math.PI * 2)
              ctx.fill()

              // Draw white outline
              ctx.strokeStyle = 'white'
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.arc(signalX, y + yOffset, 4, 0, Math.PI * 2)
              ctx.stroke()

              // Draw value
              ctx.fillStyle = isActive ? color : '#aaa'
              ctx.font = '12px Arial'
              ctx.textAlign = 'left'

              // Background for better readability
              const valueText = `${y.toFixed(1)}`
              const textWidth = ctx.measureText(valueText).width
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
              ctx.fillRect(signalX + 5, y + yOffset - 10, textWidth + 6, 14)

              // Draw text
              ctx.fillStyle = isActive ? color : '#aaa'
              ctx.fillText(valueText, signalX + 8, y + yOffset + 2)
            }
          }

          // Draw original signal intersection
          if (
            fullReconstructionPoints &&
            fullReconstructionPoints[signalIndex]
          ) {
            drawIntersectionPoint(
              0,
              fullReconstructionPoints[signalIndex].y,
              '#6366F1'
            )
          }

          // DCT component intersections
          for (let k = 0; k < 4; k++) {
            const basisPoints = createDCTBasis(k, signalPoints.length)
            let scaleFactor = 1

            if (
              quantizedCoefficients &&
              quantizedCoefficients[k] !== undefined
            ) {
              scaleFactor = Math.abs(quantizedCoefficients[k]) / 50
            }

            if (basisPoints[signalIndex]) {
              const y = basisPoints[signalIndex].y * scaleFactor
              drawIntersectionPoint(k + 1, y, colors[k], componentToggles[k])
            }
          }

          // Full reconstruction intersection
          if (fullReconstructionPoints[signalIndex]) {
            drawIntersectionPoint(
              5,
              fullReconstructionPoints[signalIndex].y,
              '#3B82F6'
            )
          }

          // Quantized reconstruction intersection
          if (quantizedReconstructionPoints[signalIndex]) {
            drawIntersectionPoint(
              6,
              quantizedReconstructionPoints[signalIndex].y,
              '#EC4899'
            )
          }
        }
      } catch (error) {
        console.error('Error drawing interactive elements:', error)
      }
    }
  }, [hover, mouseX, componentToggles, quantizationValues])

  return (
    <div className='my-8 flex w-full flex-col items-center px-6'>
      <div className='w-full max-w-4xl rounded-lg bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 p-1'>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className='w-full rounded-lg bg-white'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>

      {/* Preset buttons */}
      <div className='mt-6 flex flex-wrap justify-center gap-3'>
        <button
          onClick={resetAllSettings}
          className='rounded-md border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50'
        >
          Reset All
        </button>
        <button
          onClick={setReduceHighFreqPreset}
          className='rounded-md border border-indigo-200 bg-white py-2 px-4 text-sm font-medium text-indigo-600 shadow-sm transition hover:bg-indigo-50'
        >
          Reduce High Frequencies
        </button>
        <button
          onClick={setReduceLowFreqPreset}
          className='rounded-md border border-pink-200 bg-white py-2 px-4 text-sm font-medium text-pink-600 shadow-sm transition hover:bg-pink-50'
        >
          Reduce Low Frequencies
        </button>
      </div>

      {/* DCT components and quantization controls */}
      <div className='mt-6 mb-2 w-full max-w-4xl'>
        <div className='mb-4 text-center text-sm font-medium text-gray-700'>
          Toggle components and adjust quantization values to see the effect on
          reconstruction
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {[
            'DC Component',
            'Low Frequency',
            'Mid Frequency',
            'High Frequency',
          ].map((label, index) => (
            <div
              key={index}
              className={`rounded-md border p-3 ${
                componentToggles[index]
                  ? 'border-gray-200 bg-white'
                  : 'border-gray-200 bg-gray-50'
              } transition`}
            >
              <div className='mb-2 flex items-center justify-between'>
                <label className='flex cursor-pointer items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={componentToggles[index]}
                    onChange={() => toggleComponent(index)}
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                  />
                  <span
                    style={{
                      color: componentToggles[index]
                        ? ['#F87171', '#34D399', '#FBBF24', '#A78BFA'][index]
                        : '#999',
                    }}
                    className='text-sm font-medium'
                  >
                    {label}
                  </span>
                </label>
                <span className='text-xs text-gray-500'>
                  {quantizationValues[index]}%
                </span>
              </div>

              {/* Quantization slider */}
              <input
                type='range'
                min='0'
                max='100'
                step='10'
                value={quantizationValues[index]}
                onChange={e =>
                  updateQuantization(index, parseInt(e.target.value))
                }
                className='h-1.5 w-full cursor-pointer appearance-none rounded-md bg-gray-200 accent-indigo-600'
                disabled={!componentToggles[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DCTVisualization
