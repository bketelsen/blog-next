import Image from 'next/image'
export default function ImageWrapper({ details }) {
  return (
    <Image
      placeholder={{ lqip: details.base64.url }}
      alt={details.alternativeText}
      height={details.height}
      width={details.width}
      src={details.url}
    />
  )
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
