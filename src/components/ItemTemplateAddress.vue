<template> 
    <div style="width: 100%;" >
      <b-list-group style="text-align: left">
        <b-list-group-item class="div_class" button style="border: 1px solid #eaeaea; border-radius: 0; border-radius: 0; border-bottom-color: #eaeaea;"> 
          <img v-if="item.pais_id == 1" src="/img/usa.png" width="15" height="10">
          <img v-if="item.pais_id == 2" src="/img/mex.png" width="15" height="10">
          <b v-if="item.pais_id == 1"> {{item.pais_name }}, {{item.estado_name }}, {{item.municipio }}, {{item.codigo_postal }} </b>
          <b v-if="item.pais_id == 2"> {{item.pais_name }}, {{item.estado_name }}, {{item.asentamiento }}, {{item.municipio }}, {{item.codigo_postal }} </b>
        </b-list-group-item>
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
  border-radius: 0;
  border-bottom-color: #eaeaea;
}

</style>
