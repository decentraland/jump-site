import { flattenMessages } from '../contexts/locale/utils'
import en from './en.json'

export const messages = {
  en: flattenMessages(en)
}

export default messages
