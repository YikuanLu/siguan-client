import Vue from 'vue'
import GameTypeIcon from '~/components/common/GameTypeIcon.jsx'
import ListLoading from '~/components/common/ListLoading'
import UserModal from '~/components/loginModal'
import Nodata from '~/components/common/Nodata'
import TableLink from '~/components/common/TableLink'

Vue.component('GameTypeIcon', GameTypeIcon)
Vue.component('ListLoading', ListLoading)
Vue.component('TableLink', TableLink)
Vue.component('Nodata', Nodata)
Vue.use(UserModal)
