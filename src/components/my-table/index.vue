<template>
  <div class="my-table">
    <table>
      <thead>
        <tr>
          <th style="width:100px;">序号</th>
          <th
            v-for="(item, index) in columns"
            :key="index"
            :style="'min-width:' + item.width + 'px'"
          >
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-for="(item2, index2) in columns" :key="index2">
            <slot>{{ item[item2.key] }}</slot>
            <slot :name="item2.slotName" :row="item"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "MyTable",
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tHead: {
      type: Array,
      default: function() {
        return [];
      }
    },
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>
<style lang="less" scoped>
table {
  // width: 700px;
  border: 1px solid #ccc;
  border-top: 2px solid skyblue;
  border-collapse: collapse;
  td,
  th {
    border: 1px solid #ccc;
    text-align: center;
  }
  td {
    line-height: 30px;
    padding: 15px;
  }
  th {
    background-color: #ededed;
    line-height: 30px;
  }
}
</style>
