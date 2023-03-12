import { FC, forwardRef, LegacyRef, LinkHTMLAttributes, useRef } from 'react'

const NextLink: FC<LinkHTMLAttributes<HTMLAnchorElement>> = forwardRef((props, ref) => {
  const { href, children, ...rest } = props
  const myRef = ref as LegacyRef<HTMLAnchorElement>

  return (
    <a ref={myRef} href={href} {...rest}>
      {children}
    </a>
  )
})
export default NextLink
