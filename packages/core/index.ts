import { makeInstaller } from '@xmk-ui/utils'
import components from './components'
import '@xmk-ui/theme/index.css'

const installer = makeInstaller(components)
export * from '@xmk-ui/components'
export default installer
