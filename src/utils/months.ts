import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import * as localForage from "localforage";

const capitalize = (string: string): string => {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const monthsList = [
  capitalize(format(new Date().setMonth(0), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(1), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(2), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(3), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(4), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(5), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(6), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(7), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(8), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(9), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(10), 'MMMM', {locale: enUS})),
  capitalize(format(new Date().setMonth(11), 'MMMM', {locale: enUS}))
]

export default monthsList;