import Vue from 'vue'

// Calendar
import Calendar from 'v-calendar'
Vue.use(Calendar)

// Alert
import VueSweetalert2 from 'vue-sweetalert2'
Vue.use(VueSweetalert2)

// Notify
import Snotify, { SnotifyPosition } from 'vue-snotify'
const options = {
    toast: {
        position: SnotifyPosition.rightBottom,
        pauseOnHover: true,
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: true,
    }
}
Vue.use(Snotify, options)
