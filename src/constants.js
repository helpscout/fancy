/**
 * ID / Namespaces
 */
export const ID = '__REACT_FANCY_STYLES__'
export const FANCY_PRIMITIVE = '__IS_TOTES_A_FANCY_PRIMITIVE__'
export const PRIMITIVE_CLASSNAME = 'fs'

/**
 * Stylis / Tokens
 */
export const DELIMETER = '/*|*/'
export const SEP = '/*||*/'
export const SCOPE = '/*00*/'

/**
 * Elements
 * Source:
 * https://react-cn.github.io/react/docs/tags-and-attributes.html
 */
export const HTML_TAGS = `
a abbr address area article aside audio b base bdi bdo big blockquote body br
button canvas caption cite code col colgroup data datalist dd del details dfn
dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5
h6 head header hr html i iframe img input ins kbd keygen label legend li link
main map mark menu menuitem meta meter nav noscript object ol optgroup option
output p param picture pre progress q rp rt ruby s samp script section select
small source span strong style sub summary sup table tbody td textarea tfoot th
thead time title tr track u ul var video wbr
`.trim()

export const SVG_TAGS = `
circle clipPath defs ellipse g line linearGradient mask path pattern polygon polyline
radialGradient rect stop svg text tspan
`.trim()

export const ELEMENT_TAGS = `${HTML_TAGS} ${SVG_TAGS}`.trim()
export const ELEMENT_TAGS_LIST = ELEMENT_TAGS.split(' ')
