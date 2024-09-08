import {makeInstaller} from '@xmk-ui/utils'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import components from './components'
import '@xmk-ui/theme/index.css'

library.add(fas)
const installer = makeInstaller(components)

export * from '@xmk-ui/components'
export default installer
