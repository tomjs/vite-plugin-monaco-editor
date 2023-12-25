<template>
  <div
    id="editor"
    style="display: block; width: 800px; height: 600px; border: 1px solid grey"
  ></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
  monaco.editor.create(document.querySelector('#editor')!, {
    value: `// simple javascript code
function x() {
  return 3 + 5;
}`,
    language: 'javascript',
  });
});
</script>
