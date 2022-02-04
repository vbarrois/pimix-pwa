<script lang='ts'>
import _ from 'lodash'
import { Options, setup, Vue } from 'vue-class-component'
import { eventBus } from '@/components/mixins/EventsManager'
import { reactive } from '@vue/reactivity'
import { MenuController } from '@/components/controllers/MenuController'

@Options({})
export default class AppMenu extends Vue {

  controller = setup(() => MenuController())

  router = reactive({
    state: false,
    attachedPimixId: null
  })

  activeButton = 'dashboard'

  mounted () {
    eventBus.on('router', (_event: { status: boolean, attachedPimixId?: string }) => {
      console.log('router message', _event)
      this.router.state = _event.status
      this.router.attachedPimixId = _event.attachedPimixId
    })
  }

  unmounted () {
    eventBus.off('router')
  }

  loadComponent (_name: string): void {
    this.activeButton = _name
    eventBus.emit('container', { component: this.activeButton })
  }

  buttonClass (_name: string): string {
    return this.activeButton === _name ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 hover:text-gray-300'
  }

  routerStateClass (): string {
    if (!this.router.state) {
      return 'bg-red-500'
    } else {
      return !_.isNil(this.router.attachedPimixId) ? 'bg-green-500' : 'bg-yellow-500'
    }
  }
}
</script>

<template>
  <!-- Component Start -->
  <div
    class="flex flex-col items-center w-full h-full overflow-hidden text-gray-400"
  >
    <a class="relative flex items-center w-full px-3 mt-3" href="#">
      <svg
        class="w-8 h-8 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
        />
      </svg>
      <span class="ml-2 hidden md:block text-xl font-bold">MixMe</span>
      <span
        class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2  rounded-full" :class="routerStateClass()"
      ></span>
    </a>
    <div class="w-full px-2">
      <div
        class="flex flex-col items-center w-full mt-3 border-t border-gray-700"
      >
        <a
          class="flex items-center w-full h-12 px-3 mt-2 rounded"
          href="#"
          :class="buttonClass('dashboard')"
           @click="loadComponent('dashboard')"
        >
          <svg
            class="w-6 h-6 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span class="hidden md:block ml-2 text-sm font-medium">Dasboard</span>
        </a>
        <a
          class="relative flex items-center w-full h-12 px-3 mt-2 rounded"
          href="#"
          :class="buttonClass('playlist')"
          @click="loadComponent('playlist')"
        >
          <svg class="w-6 h-6 text-white" viewBox="0 0 20 20">
            <path 
              fill="none"
              stroke="currentColor"
              d="M10,1.529c-4.679,0-8.471,3.792-8.471,8.471c0,4.68,3.792,8.471,8.471,8.471c4.68,0,8.471-3.791,8.471-8.471C18.471,5.321,14.68,1.529,10,1.529 M10,17.579c-4.18,0-7.579-3.399-7.579-7.579S5.82,2.421,10,2.421S17.579,5.82,17.579,10S14.18,17.579,10,17.579 M14.348,10c0,0.245-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.201-0.446-0.446s0.2-0.446,0.446-0.446h5C14.146,9.554,14.348,9.755,14.348,10 M14.348,12.675c0,0.245-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.201-0.446-0.446s0.2-0.445,0.446-0.445h5C14.146,12.229,14.348,12.43,14.348,12.675 M7.394,10c0,0.245-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.201-0.446-0.446s0.201-0.446,0.446-0.446h0.849C7.194,9.554,7.394,9.755,7.394,10 M7.394,12.675c0,0.245-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.201-0.446-0.446s0.201-0.445,0.446-0.445h0.849C7.194,12.229,7.394,12.43,7.394,12.675 M14.348,7.325c0,0.246-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.2-0.446-0.446c0-0.245,0.2-0.446,0.446-0.446h5C14.146,6.879,14.348,7.08,14.348,7.325 M7.394,7.325c0,0.246-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.2-0.446-0.446c0-0.245,0.201-0.446,0.446-0.446h0.849C7.194,6.879,7.394,7.08,7.394,7.325"></path>
          </svg>
          <span class="hidden md:block ml-2 text-sm font-medium">Playlist</span>
          <span
            v-if="controller.store.votes.length > 0"
            class="absolute top-0 left-0 w-5 h-5 text-center font mt-2 ml-2 text-[12px] text-white font- bg-green-500 rounded-full pt-[1px]"
          >{{ controller.store.votes.length }}</span>
        </a>
        <a
          class="relative flex items-center w-full h-12 px-3 mt-2 rounded"
          href="#"
          :class="buttonClass('IDCard')"
          @click="loadComponent('IDCard')"
        >
          <svg class="w-6 h-6 text-white" viewBox="0 0 20 20">
            <path 
              fill="currentColor"
              stroke="currentColor"
              d="M18.737,9.691h-5.462c-0.279,0-0.527,0.174-0.619,0.437l-1.444,4.104L8.984,3.195c-0.059-0.29-0.307-0.506-0.603-0.523C8.09,2.657,7.814,2.838,7.721,3.12L5.568,9.668H1.244c-0.36,0-0.655,0.291-0.655,0.655c0,0.36,0.294,0.655,0.655,0.655h4.8c0.281,0,0.532-0.182,0.621-0.45l1.526-4.645l2.207,10.938c0.059,0.289,0.304,0.502,0.595,0.524c0.016,0,0.031,0,0.046,0c0.276,0,0.524-0.174,0.619-0.437L13.738,11h4.999c0.363,0,0.655-0.294,0.655-0.655C19.392,9.982,19.1,9.691,18.737,9.691z"></path>
          </svg>
          <span class="hidden md:block ml-2 text-sm font-medium">Player</span>
        </a>
        <a
          class="flex items-center w-full h-12 px-3 mt-2 rounded"
          href="#"
          :class="buttonClass('songs')"
          @click="loadComponent('songs')"
        >
          <svg class="w-6 h-6 text-white" viewBox="0 0 20 20">
            <path 
              fill="none"
              stroke="currentColor"
              d="M16.899,3.05c-0.085-0.068-0.192-0.095-0.299-0.074L7.947,4.779c-0.17,0.034-0.291,0.182-0.291,0.353v7.364c-0.494-0.536-1.199-0.873-1.983-0.873c-1.491,0-2.704,1.213-2.704,2.704s1.213,2.704,2.704,2.704c1.491,0,2.705-1.213,2.705-2.704V7.952l7.933-1.659v4.399c-0.494-0.535-1.199-0.873-1.983-0.873c-1.491,0-2.704,1.213-2.704,2.704c0,1.492,1.213,2.705,2.704,2.705c1.49,0,2.704-1.213,2.704-2.705V3.33C17.031,3.221,16.982,3.119,16.899,3.05 M5.673,16.311c-1.094,0-1.983-0.889-1.983-1.983s0.889-1.983,1.983-1.983c1.095,0,1.983,0.889,1.983,1.983S6.768,16.311,5.673,16.311 M14.327,14.508c-1.095,0-1.983-0.889-1.983-1.984c0-1.094,0.889-1.982,1.983-1.982c1.094,0,1.983,0.889,1.983,1.982C16.311,13.619,15.421,14.508,14.327,14.508 M16.311,5.558L8.377,7.217V5.428l7.933-1.659V5.558z"></path>
          </svg>
          <span class="hidden md:block ml-2 text-sm font-medium">Songs</span>
        </a>
        <a
          class="flex items-center w-full h-12 px-3 mt-2 rounded"
          href="#"
          :class="buttonClass('artists')"
          @click="loadComponent('artists')"
        >
          <svg class="w-6 h-6 text-white" viewBox="0 0 20 20">
            <path 
              fill="none"
              stroke="currentColor"
              d="M15.573,11.624c0.568-0.478,0.947-1.219,0.947-2.019c0-1.37-1.108-2.569-2.371-2.569s-2.371,1.2-2.371,2.569c0,0.8,0.379,1.542,0.946,2.019c-0.253,0.089-0.496,0.2-0.728,0.332c-0.743-0.898-1.745-1.573-2.891-1.911c0.877-0.61,1.486-1.666,1.486-2.812c0-1.79-1.479-3.359-3.162-3.359S4.269,5.443,4.269,7.233c0,1.146,0.608,2.202,1.486,2.812c-2.454,0.725-4.252,2.998-4.252,5.685c0,0.218,0.178,0.396,0.395,0.396h16.203c0.218,0,0.396-0.178,0.396-0.396C18.497,13.831,17.273,12.216,15.573,11.624 M12.568,9.605c0-0.822,0.689-1.779,1.581-1.779s1.58,0.957,1.58,1.779s-0.688,1.779-1.58,1.779S12.568,10.427,12.568,9.605 M5.06,7.233c0-1.213,1.014-2.569,2.371-2.569c1.358,0,2.371,1.355,2.371,2.569S8.789,9.802,7.431,9.802C6.073,9.802,5.06,8.447,5.06,7.233 M2.309,15.335c0.202-2.649,2.423-4.742,5.122-4.742s4.921,2.093,5.122,4.742H2.309z M13.346,15.335c-0.067-0.997-0.382-1.928-0.882-2.732c0.502-0.271,1.075-0.429,1.686-0.429c1.828,0,3.338,1.385,3.535,3.161H13.346z"></path>
          </svg>
          <span class="hidden md:block ml-2 text-sm font-medium">Artists</span>
        </a>
        <a
          class="flex items-center w-full h-12 px-3 mt-2 rounded"
          href="#"
          :class="buttonClass('genres')"
          @click="loadComponent('genres')"
        >
          <svg class="w-6 h-6 text-white" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              stroke="none"
              d="M7.228,11.464H1.996c-0.723,0-1.308,0.587-1.308,1.309v5.232c0,0.722,0.585,1.308,1.308,1.308h5.232
              c0.723,0,1.308-0.586,1.308-1.308v-5.232C8.536,12.051,7.95,11.464,7.228,11.464z M7.228,17.351c0,0.361-0.293,0.654-0.654,0.654
              H2.649c-0.361,0-0.654-0.293-0.654-0.654v-3.924c0-0.361,0.292-0.654,0.654-0.654h3.924c0.361,0,0.654,0.293,0.654,0.654V17.351z
              M17.692,11.464H12.46c-0.723,0-1.308,0.587-1.308,1.309v5.232c0,0.722,0.585,1.308,1.308,1.308h5.232
              c0.722,0,1.308-0.586,1.308-1.308v-5.232C19,12.051,18.414,11.464,17.692,11.464z M17.692,17.351c0,0.361-0.293,0.654-0.654,0.654
              h-3.924c-0.361,0-0.654-0.293-0.654-0.654v-3.924c0-0.361,0.293-0.654,0.654-0.654h3.924c0.361,0,0.654,0.293,0.654,0.654V17.351z
              M7.228,1H1.996C1.273,1,0.688,1.585,0.688,2.308V7.54c0,0.723,0.585,1.308,1.308,1.308h5.232c0.723,0,1.308-0.585,1.308-1.308
              V2.308C8.536,1.585,7.95,1,7.228,1z M7.228,6.886c0,0.361-0.293,0.654-0.654,0.654H2.649c-0.361,0-0.654-0.292-0.654-0.654V2.962
              c0-0.361,0.292-0.654,0.654-0.654h3.924c0.361,0,0.654,0.292,0.654,0.654V6.886z M17.692,1H12.46c-0.723,0-1.308,0.585-1.308,1.308
              V7.54c0,0.723,0.585,1.308,1.308,1.308h5.232C18.414,8.848,19,8.263,19,7.54V2.308C19,1.585,18.414,1,17.692,1z M17.692,6.886
              c0,0.361-0.293,0.654-0.654,0.654h-3.924c-0.361,0-0.654-0.292-0.654-0.654V2.962c0-0.361,0.293-0.654,0.654-0.654h3.924
              c0.361,0,0.654,0.292,0.654,0.654V6.886z"></path>
          </svg>
          <span class="hidden md:block ml-2 text-sm font-medium">Genres</span>
        </a>
      </div>
      <div
        class="flex flex-col items-center w-full mt-2 border-t border-gray-700"
      >
        <a
          class="flex items-center w-full h-12 px-3 mt-2 rounded"
          href="#"
          :class="buttonClass('settings')"
          @click="loadComponent('settings')"
        >
          <svg class="w-6 h-6 text-white" viewBox="0 0 20 20">
            <path
              fill="none"
              stroke="currentColor"
              d="M6.176,7.241V6.78c0-0.221-0.181-0.402-0.402-0.402c-0.221,0-0.403,0.181-0.403,0.402v0.461C4.79,7.416,4.365,7.955,4.365,8.591c0,0.636,0.424,1.175,1.006,1.35v3.278c0,0.222,0.182,0.402,0.403,0.402c0.222,0,0.402-0.181,0.402-0.402V9.941c0.582-0.175,1.006-0.714,1.006-1.35C7.183,7.955,6.758,7.416,6.176,7.241 M5.774,9.195c-0.332,0-0.604-0.272-0.604-0.604c0-0.332,0.272-0.604,0.604-0.604c0.332,0,0.604,0.272,0.604,0.604C6.377,8.923,6.105,9.195,5.774,9.195 M10.402,10.058V6.78c0-0.221-0.181-0.402-0.402-0.402c-0.222,0-0.402,0.181-0.402,0.402v3.278c-0.582,0.175-1.006,0.714-1.006,1.35c0,0.637,0.424,1.175,1.006,1.351v0.461c0,0.222,0.181,0.402,0.402,0.402c0.221,0,0.402-0.181,0.402-0.402v-0.461c0.582-0.176,1.006-0.714,1.006-1.351C11.408,10.772,10.984,10.233,10.402,10.058M10,12.013c-0.333,0-0.604-0.272-0.604-0.604S9.667,10.805,10,10.805c0.332,0,0.604,0.271,0.604,0.604S10.332,12.013,10,12.013M14.629,8.448V6.78c0-0.221-0.182-0.402-0.403-0.402c-0.221,0-0.402,0.181-0.402,0.402v1.668c-0.581,0.175-1.006,0.714-1.006,1.35c0,0.636,0.425,1.176,1.006,1.351v2.07c0,0.222,0.182,0.402,0.402,0.402c0.222,0,0.403-0.181,0.403-0.402v-2.07c0.581-0.175,1.006-0.715,1.006-1.351C15.635,9.163,15.21,8.624,14.629,8.448 M14.226,10.402c-0.331,0-0.604-0.272-0.604-0.604c0-0.332,0.272-0.604,0.604-0.604c0.332,0,0.604,0.272,0.604,0.604C14.83,10.13,14.558,10.402,14.226,10.402 M17.647,3.962H2.353c-0.221,0-0.402,0.181-0.402,0.402v11.27c0,0.222,0.181,0.402,0.402,0.402h15.295c0.222,0,0.402-0.181,0.402-0.402V4.365C18.05,4.144,17.869,3.962,17.647,3.962 M17.245,15.232H2.755V4.768h14.49V15.232z"></path>
          </svg>
          <span class="hidden md:block ml-2 text-sm font-medium">Settings</span>
        </a>
        
      </div>
    </div>
    <a
      class="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
      href="#"
    >
      <svg
        class="w-6 h-6 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="hidden md:block ml-2 text-sm font-medium">Account</span>
    </a>
  </div>
  <!-- Component End  -->
</template>
