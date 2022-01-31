import { request } from "./REST";
import _ from 'lodash'
import { AxiosResponse } from "axios";

export default {
  computed: {
    pagedSong(): any[] {
      return this.songList.slice(
        this.curpage * this.perpage,
        (this.curpage + 1) * this.perpage
      );
    },
    nbPages(): number {
      return Math.ceil(this.songList.length / this.perpage);
    },
  },
  mounted() {
    request("api/songs")
      .then((response: AxiosResponse) => {
        this.songList = response.data;
        this.resultsAvaible = true;
      })
      .catch((err) => {
        this.resultsAvaible = false;
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
    },
  }
}