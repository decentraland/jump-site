import { type FC, type ReactNode, useRef, useEffect, useState } from 'react'
import { TextWrapperContainer, TextContent } from './TextWrapper.styled'

interface TextWrapperProps {
  children: ReactNode
  maxHeight: number
  gradientColor: string
}

export const TextWrapper: FC<TextWrapperProps> = ({ children, maxHeight, gradientColor }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      const el = contentRef.current
      if (!el) return

      el.style.height = 'auto'
      const contentHeight = el.scrollHeight
      el.style.height = ''

      setHasOverflow(contentHeight > maxHeight)
    }

    const checkScrollPosition = () => {
      const el = contentRef.current
      if (!el) return

      const reachedBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      setIsAtBottom(reachedBottom)
    }

    const timeoutId = setTimeout(() => {
      checkOverflow()
      checkScrollPosition()
    }, 500)

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow()
    })

    const el = contentRef.current
    if (el) {
      resizeObserver.observe(el)
      el.addEventListener('scroll', checkScrollPosition)
    }

    return () => {
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
      el?.removeEventListener('scroll', checkScrollPosition)
    }
  }, [maxHeight, children])

  return (
    <TextWrapperContainer $maxHeight={maxHeight} $hasGradient={hasOverflow && !isAtBottom} $gradientColor={gradientColor}>
      <TextContent ref={contentRef}>{children}</TextContent>
    </TextWrapperContainer>
  )
}
