<template>
  <div id="home" class="ui bottom attached tab segment active" data-tab="home">
    <vuetable
      ref="vuetable"
      :api-mode="false"
      :css="css.table"
      :show-sort-icons="true"
      :fields="fields"
      :per-page="perPage"
      :data-manager="dataManager"
      pagination-path="pagination"
      @vuetable:pagination-data="onPaginationData"
    >
    </vuetable>
    <div style="margin-top:10px">
      <vuetable-pagination ref="pagination"
       :css="css.pagination"
       class="pull-right"
       @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
// import VuetablePagination from '@/components/VuetablePaginationBootstrap4.vue'
import CssConfig from '../util/VuetableStyleConfig.js'
import FieldsDef from '../util/FieldsDef.js'
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'home',

  components: {
    Vuetable,
    VuetablePagination
  },

  data () {
    return {
      css: CssConfig,
      fields: FieldsDef,
      perPage: 10,
      data: []
    }
  },

  watch: {
    data (newVal, oldVal) {
      this.$refs.vuetable.refresh()
    }
  },

  mounted () {
    for (var i = 0; i < 201; i += 20) {
      axios.get('https://cain-api.gameyw.netease.com/cain/site/config?app=3&code=eval_new&start=' + i).then(response => {
        console.log(response.data)
        this.data.push.apply(this.data, response.data)
      })
    }
  },

  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    dataManager (sortOrder, pagination) {
      if (this.data.length < 1) return

      let local = this.data

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        // console.log('orderBy:', sortOrder[0].sortField, sortOrder[0].direction)
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        )
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      )

      // console.log('pagination:', pagination)
      const from = pagination.from - 1
      const to = from + this.perPage

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      }
    }
    // onActionClicked (action, data) {
    //   console.log('slot actions: on-click', data.name)
    // }
  }
}
</script>

<style scoped>
#home {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
button.ui.button {
  padding: 8px 3px 8px 10px;
  margin-top: 1px;
  margin-bottom: 1px;
}
</style>
