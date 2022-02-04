<script lang='ts'>
import _ from 'lodash'
import { Options, Vue, setup } from 'vue-class-component'
import { SongController } from '../controllers/SongController'
import { shallowRef } from '@vue/reactivity'
import { defineAsyncComponent } from '@vue/runtime-core'

@Options({
  props: {
    params: Object
  }
})
export default class SongIDCard extends Vue {
  controller = setup(() => SongController())
  params: any

  SongTools = shallowRef(
    defineAsyncComponent(() =>
      import('@/components/cards/SongTools.vue')
    )
  )

  mounted () {
    this.controller.loadInfos(this.params?.song.id)
  }

  created() {
  }
}
</script>

<template>

  <div
    v-if="params?.song"
    class="max-w lg:max-w-full lg:flex bg-white text-gray-800 rounded-3xl m-5">
    <div class="p-4">
      <img
        v-lazy="controller.getCover(params.song.id)"
        class="mx-auto h-[300px] lg:h-38 w-auto rounded-3xl border-4 border-white" />
      <component
        :is="SongTools"
        :params="params"
        :toolbar="false"
        class="my-3 bg-opacity-80">
      </component>
    </div>
    <div class="flex-auto bg-white">
      <div class="flex flex-col">

        <div class="flex flex-col p-5">
          <div class="font-bold">Titre</div>
          <div>{{ controller.controller.title }}</div>
          <div class="font-bold">Database ID</div>
          <div>#{{ controller.controller.id }}</div>
          <div class="font-bold">Chemin d'accès</div>
          <div>{{ controller.controller.filepath }}</div>
          <div class="font-bold">Taille fichier</div>
          <div>{{ controller.controller.size.toFixed(1) }} Mo</div>
          <div class="font-bold">Nom de fichier</div>
          <div>{{ controller.controller.filename }}</div>
          <div class="font-bold">Album:</div>
          <div>{{ controller.controller.album }}</div>
          <div class="font-bold">Artistes:</div>
          <div>{{ controller.controller.artists }}</div>
          <div class="font-bold">Genres:</div>
          <div>{{ controller.controller.genres }}</div>
          <div class="font-bold">Durée:</div>
          <div>{{ controller.controller.duration }}</div>
          <div class="font-bold">Année:</div>
          <div>{{ controller.controller.year }}</div>
          <div class="font-bold">Echantillonage:</div>
          <div>{{ controller.controller.samplerate }} Hz</div>
          <div class="font-bold">Bit rate:</div>
          <div>{{ controller.controller.bitrate }} kbs</div>
          <div class="font-bold">Date création:</div>
          <div>{{ controller.controller.birth }}</div>
          <div class="font-bold">Date ajout:</div>
          <div>{{ controller.controller.createdAt }}</div>
          <div class="font-bold">Dernière modification:</div>
          <div>{{ controller.controller.updatedAt }}</div>
          <div class="font-bold">Nombre total d'écoutes:</div>
          <div>{{ controller.controller.playcount }}</div>
          <div class="font-bold">Pourcentage d'écoute:</div>
          <div>{{ controller.controller.listenratio.toFixed(0) }}%</div>
          <div class="font-bold">Nombre de votes:</div>
          <div>{{ controller.controller.votescount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>