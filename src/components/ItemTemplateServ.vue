<template> 
    <div >
      <b-list-group style="text-align: left">
        <b-list-group-item class="div_class" button style="border: none;padding: 5px; color: #494f54; border-radius: 0px; background: #ecece;"><b>[{{item.id }}] - </b> {{item.nameproduct }}</b-list-group-item>
      </b-list-group>
    </div>
</template>
<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script> 
<style scoped>

.div_class{
  z-index: 1051;
  text-align: left;
}
</style>
