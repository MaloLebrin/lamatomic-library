import { PluginFunction } from 'vue'

interface InstallFunction extends PluginFunction<any> {
    installed?: boolean
}

declare const Lamatomic: { install: InstallFunction }
export default Lamatomic
