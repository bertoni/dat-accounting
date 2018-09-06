export const padStart = (text, padlen, padchar) => {
  padchar = typeof padchar !== 'undefined' ? padchar : '0'
  let pad = new Array(1 + padlen).join(padchar)
  return (pad + text).slice(-pad.length)
}
