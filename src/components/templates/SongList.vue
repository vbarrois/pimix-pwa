<script lang='ts'>
import { defineComponent, defineProps, ref } from 'vue'
import _ from 'lodash'
import { request } from '@/components/mixins/REST'
import { AxiosResponse } from "axios";

export default defineComponent({
  setup() {
    const resultsAvailable = ref(false);
    const songList = ref([]);
    const perpage = ref(10);
    const curpage = ref(0);
    const pageSizes = ref([-1, 5, 10, 20, 50]);
    const editedField = ref({ id: 0, field: "" });
    const columns = [
      {
        field: "Artists",
        class: "w-1/4 whitespace-nowrap truncate",
        publish: (_value: string) => {
          console.log(_value.split(","));
          return _.map(_value.split(","), (artist) => {
            return {
              name: artist.trim(),
            };
          });
        },
        content: (_song) => {
          return _.map(_song.Artists, (artist) => {
            return artist.name;
          }).join(", ");
        },
      },
      {
        field: "title",
        class: "w-1/2 whitespace-nowrap truncate",
        publish: (_value: string) => {
          return _value;
        },
        content: (_song) => {
          return _song.title;
        },
      },
      {
        field: "album",
        class: "w-1/4 whitespace-nowrap truncate",
        publish: (_value: string) => {
          return _value;
        },
        content: (_song) => {
          return _song.album;
        },
      },
    ];
  },
  computed: {
    pagedSong (): any[] {
      return this.songList.slice(
        this.curpage * this.perpage,
        (this.curpage + 1) * this.perpage
      );
    },
    nbPages (): number {
      return Math.ceil(this.songList.length / this.perpage);
    },
    isResultsAvailable (): boolean {
      return this.resultsAvaible
    }
  },
  mounted() {
    console.log('mounted')
    request("api/songs")
      .then((response: AxiosResponse) => {
        this.songList = response.data;
        this.resultsAvailable = true;
      })
      .catch((err) => {
        console.log(err.toString())
        this.resultsAvailable = false;
        console.error(err);
      });
  },
  methods: {
    buildKey: (_column, _song) => {
      return `${_column.field}-${_song.id}`;
    },
    edit: function (_id: number, _field: string): void {
      this.editedField = { id: _id, field: _field };
      this.$nextTick(() => {
        const inputEl: HTMLInputElement = this.$refs[
          `${_field}-${_id}`
        ][0] as HTMLInputElement;
        inputEl.select();
      });
    },
    isFieldEdited(_id: number, _field: string): boolean {
      return this.editedField.id === _id && this.editedField.field === _field;
    },
    publish(_song: any, _column: any, _event: any): void {
      const value = _event.target.value;
      const edited = _.find(this.songList, (song) => {
        return song.id === _song.id;
      });
      if (!_.isNil(edited)) {
        edited[_column.field] = _column.publish(value);
      }
      this.leaveEdit();
    },
    leaveEdit(): void {
      this.editedField = { id: 0, field: "" };
    },
    nextEdit(): void {
      const pos = _.findIndex(this.columns, (col: any) => {
        return col.field === this.editedField.field;
      });
      const curSongId = this.editedField.id;
      const nextCol = pos + 1 < this.columns.length ? pos + 1 : 0;
      this.edit(curSongId, this.columns[nextCol].field);
    }
  }
})
</script>


<template>
  <div>
    <h1 class="text-3xl font-bold">Liste des titres</h1>
    <div v-if="isResultsAvailable" class="inline-flex mt-3">
      <button
        :disabled="curpage == 0"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        @click="curpage--"
      >
        Prev
      </button>
      <button class="p-3 font-bold border">
        {{ curpage + 1 }} / {{ nbPages }}
      </button>
      <button
        :disabled="curpage == nbPages - 1"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        @click="curpage++"
      >
        Next
      </button>
      <!-- <select
        class="form-select px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label=".form-select-lg example"
      >
        <option
          v-for="size in pageSizes"
          :key="size"
          value="size"
          @click="perpage = size"
        >
          {{ size }}
        </option>
      </select> -->
    </div>
    <div v-if="isResultsAvailable" class="m-4">
      <div
        v-for="song in pagedSong"
        :key="song.id"
        class="flex hover:bg-green-50 cursor-pointer border-b-4 p-2"
      >
        <div
          v-for="column in columns"
          :key="buildKey(column, song)"
          :class="column.class"
          class="my-auto"
        >
          <div v-if="isFieldEdited(song.id, column.field)">
            <input
              :ref="`${column.field}-${song.id}`"
              type="text"
              class="px-4 py-2 leading-tight w-full border"
              :value="column.content(song)"
              @change.prevent="publish(song, column, $event)"
              @keydown.esc.prevent="leaveEdit"
              @keydown.tab.prevent="nextEdit"
            />
          </div>
          <div v-else @click="edit(song.id, column.field)">
            {{ column.content(song) }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Impossible d'obtenir la liste des titres.<br /><span
        class="text-sm italic"
        >Check the network configuration.</span
      >
    </div>
  </div>
</template>
