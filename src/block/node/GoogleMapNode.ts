import { convertToLineNodes } from '.'

import type { NodeParser } from '.'

const googleMapRegExp = /^(?<left>.*?)\[(?<latitude>([NS]\d+(\.\d+)?),(?<longitude>[EW]\d+(\.\d+)?)(?<zoom>(,Z\d+)?))(?<place>)\](?<right>.*)$/
const leftGoogleMapRegExp = /^(?<left>.*?)\[(?<place>[^\]]*[^\s])\s+(?<latitude>([NS]\d+(\.\d+)?),(?<longitude>[EW]\d+(\.\d+)?)(?<zoom>(,Z\d+)?))\](?<right>.*)$/
const rightGoogleMapRegExp = /^(?<left>.*?)\[(?<latitude>([NS]\d+(\.\d+)?),(?<longitude>[EW]\d+(\.\d+)?)(?<zoom>(,Z\d+)?))\s+(?<place>[^\]]*[^\s])\](?<right>.*)$/

interface googleMapMatch {
  groups: {
    left: string
    right: string
    latitude: string
    longitude: string
    zoom: string
    place: string
  }
}

const isGoogleMapMatch = (obj: any): obj is googleMapMatch => (obj?.groups?.latitude !== undefined)

export interface GoogleMapNode {
  type: 'googleMap'
  latitude: number
  longitude: number
  zoom: number
  place: string
  url: string
}

const createGoogleMapNode = (_latitude: string, _longitude: string, _zoom: string, place: string): GoogleMapNode => {
  const latitude = parseFloat(_latitude.replace(/^N/, '').replace(/^S/, '-'))
  const longitude = parseFloat(_longitude.replace(/^E/, '').replace(/^W/, '-'))
  const zoom = /^,Z\d+$/.test(_zoom) ? parseInt(_zoom.replace(/^,Z/, ''), 10) : 14
  const url = place !== ''
    ? `https://www.google.com/maps/place/${encodeURIComponent(place)}/@${latitude},${longitude},${zoom}z`
    : `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`

  return {
    type: 'googleMap',
    latitude,
    longitude,
    zoom,
    place,
    url
  }
}

export const GoogleMapNodeParser: NodeParser = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const googleMapMatch = text.match(googleMapRegExp) ??
                   text.match(leftGoogleMapRegExp) ??
                   text.match(rightGoogleMapRegExp)
  if (!isGoogleMapMatch(googleMapMatch)) return next()

  const { left, latitude, longitude, zoom, place, right } = googleMapMatch.groups
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createGoogleMapNode(latitude, longitude, zoom, place),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
