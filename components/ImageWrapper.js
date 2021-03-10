import Image from 'next/image'
export default function ImageWrapper({ size, details, className }) {
  const responsive = getSize(size, details)
  return (
    <Image
      alt={details.alternativeText}
      height={responsive.height}
      width={responsive.width}
      src={responsive.url}
      className={className}
    />
  )
}
export const sizes = {
  small: '400',
  medium: '800',
  large: '1200',
  xl: '1600',
}
const getSize = (size, details) => {
  const keys = Object.keys(details.formats)
  var responsive = {}

  keys.forEach(function (f) {
    if (size == f) {
      if (Array.isArray(details.formats[f])) {
        return details.formats[f].map((s) => {
          if (s.ext === '.webp') {
            responsive = s
          }
        })
      } else {
        console.log('not found!!')
      }
    }
  })
  return responsive
}

const sourceSet = (details) => {
  var srcSet = []
  const keys = Object.keys(details.formats)
  keys.forEach(function (f) {
    if (Array.isArray(details.formats[f])) {
      details.formats[f].map((s) => {
        srcSet.push({
          width: s.width,
          height: s.height,
          src: s.url,
        })
      })
    }
  })
  return srcSet
}
