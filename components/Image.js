import IdealImage from 'react-ideal-image'

export default function Image({ details }) {
  console.log('image', details)
  return (
    <IdealImage
      placeholder={{ lqip: details.base64.url }}
      alt={details.alternativeText}
      height={details.height}
      width={details.width}
      srcSet={sourceSet(details)}
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
