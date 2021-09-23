<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      width="300px"
    >
      <template v-slot:handle>
          <div class="handle" @click="visible = !visible">
              <a-icon :type="visible?'close':'setting'"></a-icon>
          </div>
      </template>
      <template>
        <h3>整体风格定制</h3>
        <a-radio-group name="radioGroup"
          :value="$route.query.navTheme || 'dark'"
          @change="(e)=>handleChangeSetting('navTheme',e.target.value)">
          <a-radio value="dark">
            深色
          </a-radio>
          <a-radio value="light">
            浅色
          </a-radio>
        </a-radio-group>
        <h3>导航模式</h3>
        <a-radio-group name="radioGroup"
          :value="$route.query.navLayout || 'left'"
          @change="(e)=>handleChangeSetting('navLayout',e.target.value)">
          <a-radio value="left">
            左侧
          </a-radio>
          <a-radio value="top">
            顶部
          </a-radio>
        </a-radio-group>
    </template>

    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      navTheme:"dark",
      navLayout:"left"
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    onClose() {
      this.visible = false;
    },
    handleChangeSetting(type, value) {
      this.$router.push({query:{...this.$route.query,[type]:value}});
    }
  },
};
</script>

<style scoped>
    .handle{
        position: absolute;
        top: 240px;
        right: 300px;
        width: 48px;
        height: 48px;
        line-height: 48px;
        background-color: #1890ff;
        color: #fff;
        text-align: center;
        font-size: 20px;
        border-radius: 3px;
    }
</style>
