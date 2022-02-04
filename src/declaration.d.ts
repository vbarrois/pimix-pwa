declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module "@heroicons/vue/*" {
  const content: any;
  export default content;
}

declare module "@heroicons/vue/outline" {
  // https://unpkg.com/browse/@heroicons/vue@1.0.5/outline/
  export { default as ViewListIcon } from "@heroicons/vue/solid/esm/ViewListIcon.js";
}

declare module "@heroicons/vue/solid" {
  // https://unpkg.com/browse/@heroicons/vue@1.0.5/solid/
  export { default as DocumentAddIcon } from "@heroicons/vue/solid/esm/DocumentAddIcon.js";
}