import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { 
    faTimes,
    faBars,
    faPlus,
    faPencilAlt,
    faTrash,
    faTrashAlt,
    faArrowUp,
} from '@fortawesome/free-solid-svg-icons'
library.add({
    faTimes,
    faBars,
    faPlus,
    faPencilAlt,
    faTrash,
    faTrashAlt,
    faArrowUp,
})
 
Vue.component('Icon', FontAwesomeIcon)