<template>
  <div style="width: 256px">
    <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button> -->
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item 
        v-if="!item.children" 
        :key="item.path"
         @click="()=>$router.push({path:item.path,query:$route.query})">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
// recommend use functional component
// <template functional>
//   <a-sub-menu :key="props.menuInfo.key">
//     <span slot="title">
//       <a-icon type="mail" /><span>{{ props.menuInfo.title }}</span>
//     </span>
//     <template v-for="item in props.menuInfo.children">
//       <a-menu-item v-if="!item.children" :key="item.key">
//         <a-icon type="pie-chart" />
//         <span>{{ item.title }}</span>
//       </a-menu-item>
//       <sub-menu v-else :key="item.key" :menu-info="item" />
//     </template>
//   </a-sub-menu>
// </template>
// export default {
//   props: ['menuInfo'],
// };
import SubMenu from './SubMenu'
// const SubMenu = {
//   template: `
//       <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
//         <span slot="title">
//           <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
//         </span>
//         <template v-for="item in menuInfo.children">
//           <a-menu-item v-if="!item.children" :key="item.key">
//             <a-icon type="pie-chart" />
//             <span>{{ item.title }}</span>
//           </a-menu-item>
//           <sub-menu v-else :key="item.key" :menu-info="item" />
//         </template>
//       </a-sub-menu>
//     `,
//   name: 'SubMenu',
//   // must add isSubMenu: true
//   isSubMenu: true,
//   props: {
//     ...Menu.SubMenu.props,
//     // Cannot overlap with properties within Menu.SubMenu.props
//     menuInfo: {
//       type: Object,
//       default: () => ({}),
//     },
//   },
// };
export default {
  components: {
    'sub-menu': SubMenu,
  },
  data() {
    this.selectedKeysMaps = {};
    this.openKeysMaps = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      //菜单
      menuData,
      selectedKeys:this.selectedKeysMaps[this.$route.path],
      openKeys:this.collapsed ? [] : this.openKeysMaps[this.$route.path]
    };
  },
  props:{
      theme:{
          type:String,
          default:"dark"
      }
  },
  watch:{
      "$route.path":function (val) {
          this.selectedKeys = this.selectedKeysMaps[val];
          this.openKeys = this.collapsed ? [] : this.openKeysMaps[val];
      }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKey){
        // debugger
        const menuData = [];
        routes.forEach(item => {
            if (item.name && !item.hideInMenu) {
                this.openKeysMaps[item.path] = parentKeys;
                this.selectedKeysMaps[item.path] = [ selectedKey || item.path];
                const newItem = {...item};
                delete newItem.children;
                if (item.children && !item.hideChildrenInMenu) {
                    newItem.children = this.getMenuData(item.children,[...parentKeys,item.path]);
                } else {
                    this.getMenuData(
                        item.children,
                        selectedKey ? parentKeys : [...parentKeys,item.path],
                        selectedKey || item.path
                        );
                }
                menuData.push(newItem);
            } else if(item.children && !item.hideInMenu && !item.hideChildrenInMenu){
                menuData.push(...this.getMenuData(item.children));
            }
        });
        return menuData;
    }
  },
};
</script>
