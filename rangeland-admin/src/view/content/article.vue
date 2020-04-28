<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
      />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '标题', key: 'title', sortable: true },
        { title: '创建时间', key: 'created', editable: true },
        { title: '作者', key: 'uid.name' },
        { title: '分类', key: 'sort' },
        { title: '积分', key: 'fav' },
        { title: '标签', key: 'tags' },
        { title: '是否结束', key: 'isEnd' },
        { title: '阅读记数', key: 'reads' },
        { title: '回答记数', key: 'answer' },
        { title: '状态', key: 'status' },
        { title: '是否置顶', key: 'isTop' },
        {
          title: '设置',
          key: 'handle',
          options: ['delete'],
          fixed: 'right',
          button: [
            (h, params, vm) => {
              return h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': () => {
                      vm.$emit('on-delete', params)
                      vm.$emit(
                        'input',
                        params.tableData.filter(
                          (item, index) => index !== params.row.initRowIndex
                        )
                      )
                    }
                  }
                },
                [h('Button', '自定义删除')]
              )
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    }
  },
  mounted () {
    getTableData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style>
</style>
