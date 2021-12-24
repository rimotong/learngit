<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.car" placeholder="车辆id" style="width: 200px"
        class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-autocomplete
        v-model="listQuery.project" :fetch-suggestions="querySearchAsync" placeholder="项目名称" class="filter-item" 
        clearable @clear="setBlur()" @keyup.enter.native="handleFilter" />
      <el-date-picker v-model="listQuery.startTime" type="datetime" placeholder="选择开始日期时间"
        class="filter-item" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss"
      />
      <el-date-picker
        v-model="listQuery.endTime"
        type="datetime"
        placeholder="选择结束日期时间"
        class="filter-item"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
      <el-button-group>
        <el-button
          class="filter-item"
          style="margin-left: 20px"
          icon="el-icon-search"
          plain
          round
          @click="handleFilter"
        > 搜索
        </el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          icon="el-icon-circle-plus-outline"
          plain
          round
          @click="add"
        > 新增
        </el-button>
      </el-button-group>
    </div>

    <el-form ref="form" :model="form" :rules="rules">
      <el-table v-loading="loading" :data="form.tableData" style="width: 100%" border fit>
        <el-table-column label="车辆" min-width="15%" prop="car" align="center">
          <template v-slot="{row,$index}">
            <span v-show="!row.edit">{{ row.car }}</span>
            <span v-show="row.edit">
              <el-form-item :prop="'tableData.'+$index+'.car'" :rules="rules.car">
                <el-input v-model="row.car" clearable size="small" />
              </el-form-item>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="项目" min-width="15%" prop="project" align="center">
          <template v-slot="{row,$index}">
            <span v-show="!row.edit">{{ row.project }}</span>
            <span v-show="row.edit">
              <el-form-item :prop="'tableData.'+$index+'.project'" :rules="rules.project">
                <el-input v-model="row.project" clearable size="small"/>
              </el-form-item>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="开始日期" min-width="20%" align="center">
          <template v-slot="{row,$index}">
            <span v-show="row.edit">
              <el-form-item :prop="'tableData.'+$index+'.startTime'" :rules="rules.startTime">
                <el-date-picker
                  v-model="row.startTime"
                  type="datetime"
                  placeholder="请选择日期"
                  align="center"
                  size="small"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </span>
            <span v-show="!row.edit">
              <i class="el-icon-time" />
              <span>{{ row.startTime }}</span>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="结束日期" min-width="20%" align="center">
          <template v-slot="{row,$index}">
            <span v-show="row.edit">
              <el-form-item :prop="'tableData.'+$index+'.endTime'" :rules="rules.endTime">
                <el-date-picker
                  v-model="row.endTime"
                  type="datetime"
                  placeholder="请选择日期"
                  align="center"
                  size="small"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </span>
            <span v-show="!row.edit">
              <i class="el-icon-time" />
              <span>{{ row.endTime }}</span>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="20%" align="center">
          <template slot-scope="{row,$index}">
            <template v-if="!row.edit">
              <!--加div是为了和下面else中的button不一样,可以避免点击按钮后不失焦-->
              <div>
                <el-button
                  id="edit-button"
                  size="small"
                  plain
                  round
                  icon="el-icon-edit"
                  type="primary"
                  @click="handleEdit(row)"
                >
                  修改
                </el-button>
                <el-button
                  :id="'deleteButton'+$index"
                  size="small"
                  style="margin-left: 15px"
                  plain
                  round
                  icon="el-icon-delete"
                  type="danger"
                  @click="confirmDelete($index,row)"
                >
                  删除
                </el-button>
              </div>
            </template>

            <template v-else>
              <el-button
                id="confirm-save-button"
                size="small"
                plain
                round
                icon="el-icon-circle-check"
                type="success"
                @click="confirmSave($index,row)"
              >{{
                '保存'
              }}
              </el-button>
              <el-button
                id="cancel-save-button"
                style="margin-left: 15px"
                size="small"
                plain
                round
                icon="el-icon-circle-close"
                type="info"
                @click="cancelSave($index,row)"
              >{{
                '取消保存'
              }}
              </el-button>
            </template>

          </template>
        </el-table-column>

      </el-table>
    </el-form>
    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :page-sizes.sync="pageSizes"
      @pagination="getTableData"
    /> -->
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination'

export default {
//   components: { Pagination },
  data() {
    return {
      // 输入建议
      restaurants: [],
      // 加载状态
      loading: true,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 12,
        car: undefined,
        project: undefined,
        startTime: undefined,
        endTime: undefined
      },
      pageSizes: [12, 24, 36],
      form: {
        tableData: []
      },
      rules: {
        car: [{
          type: 'string',
          required: true,
          trigger: 'change',
          message: '车辆不能为空'
        }],
        project: [{
          type: 'string',
          required: true,
          trigger: 'change',
          message: '项目不能为空'
        }],
        startTime: [{
          type: 'string',
          required: true,
          trigger: 'change',
          message: '开始时间不能为空'
        }]
      },
      // 时间选项
      pickerOptions: {
        shortcuts: [
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '三天前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', date)
            }
          }, {
            text: '七天前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
      }

    }
  },
  mounted() {
    this.getTableData()
    this.inputSuggest()
  },
  methods: {
    async getTableData() {
      this.$axios.get("/calc").then((res) => {
          this.form.tableData = res.data.resultList
      })
      this.form.tableData.map((v) => {
        this.$set(v, 'edit', false)
        // v.edit = false // 不能被v-if监听到
        return v
      })
      this.loading = false
    },
    handleFilter() {
      this.loading = true
      this.getTableData()
      this.loading = false
    },
    handleEdit(row) {
      if (row.temp === undefined) {
        row.temp = Object.assign({}, row) // 复制对象,为了取消修改后还原数据
      } else if (row.temp.car === '') {
        delete row.temp
        row.temp = Object.assign({}, row) // 复制对象,为了取消修改后还原数据
      }
      row.edit = !row.edit
    },
    validateField(form, index) {
      let result = true
      for (const item of this.$refs[form].fields) {
        if (parseInt(item.prop.split('.')[1]) === index) {
          this.$refs.form.validateField(item.prop, (error) => {
            if (error) {
              result = false
            }
          })
        }
        if (!result) break
      }
      return result
    },
    async confirmSave(index, row) {
      if (!this.validateField('form', index)) {
        this.$message({
          type: 'info',
          message: '保存修改失败,请检查是否有未填字段',
          center: true
        })
        return
      }
      // 判断值是否有改变,如果没有则不做下面的操作
      const tmp = Object.assign({}, row)
      const rowTmp = Object.assign({}, tmp.temp)
      delete rowTmp.edit
      delete tmp.temp
      delete tmp.edit
      if (JSON.stringify(rowTmp) === JSON.stringify(tmp)) {
        row.edit = !row.edit
        return
      }
      // 配置发送的请求参数
      this.loading = true
      const response = { 'data': { 'code': 200 }}
      this.loading = false
      let type, message
      if (response.data.code === 500) {
        type = 'error'
        message = '保存出错,请联系开发人员修复'
      } else if (response.data.code === 200) {
        type = 'success'
        message = '保存成功'
      } else {
        type = 'info'
        message = response.data.message
      }
      this.$message({
        type: type,
        message: message,
        center: true
      })
      // info为保存数据重复等问题，直接返回
      if (type === 'info') {
        return
      }
      row.edit = !row.edit
      delete row.temp
      row.temp = Object.assign({}, row) // 复制对象,为了取消修改后还原数据
    },
    cancelSave(index, row) {
      if (row.temp.car === '') {
        this.$delete(this.form.tableData, index)
        return
      }
      this.$set(this.form.tableData, index, row.temp) // 取消后还原数据到修改前状态
    },
    // 删除数据
    async confirmDelete(index, row) {
      // 让按钮失焦防止在提示时按多次enter键导致多次提交
      document.getElementById('deleteButton' + index).blur()
      // 设置弹窗样式
      const h = this.$createElement
      const confirmText1 = ['车辆 : ', '项目 : ', '开始时间 : ', '结束时间 : ']
      const confirmText2 = [row.car, row.project, row.startTime, row.endTime]
      const newData = []
      for (const i in confirmText1) {
        newData.push(h('span', null, confirmText1[i]))
        newData.push(h('i', { style: 'color: teal' }, confirmText2[i]))
        newData.push(h('div', null, null))
      }
      const confirm = await this.$msgbox({
        title: '确定删除该条数据吗',
        message: h('p', null, newData),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          center: true
        })
      })
      if (confirm === 'confirm') {
        this.loading = true
        const response = { 'data': { 'code': 200 }}
        const type = response.data.code === 200 ? 'success' : 'error'
        const message = response.data.code === 200 ? '成功删除数据' : '删除数据失败,请联系开发人员修复'
        this.$delete(this.form.tableData, index)
        this.loading = false
        this.$message({
          type: type,
          message: message,
          center: true
        })
      }
    },
    // 新增时重新初始化一个插入第一行
    add() {
      const temp = {
        car: '',
        project: '',
        startTime: '',
        endTime: '',
        edit: true,
        temp: {
          car: '',
          project: '',
          startTime: '',
          endTime: ''
        }
      }
      this.form.tableData.unshift(temp)
    },
    // 获取项目输入框建议
    async inputSuggest() {
      // const tmp = await api8899.search_project()
      const tmp = { data: { data: [{ value: '某个项目b' }, { value: '某个项目a' }] }}
      this.restaurants = tmp.data.data
    },
    // 处理输入框建议,restaurants必须是包含value属性的对象 [ {value:'xxx'} , ...]
    querySearchAsync(queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      cb(results)
    },
    // 输入框建议过滤规则
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 清空输入框时取消聚焦 使用户重新点击来展示建议下拉框
    setBlur() {
      document.activeElement.blur()
    }
  }
}
</script>

<style scoped>
.filter-container {
  text-align: left;
  padding-bottom: 10px;
}

.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
}

.app-container {
  padding: 20px;
}

.el-form-item {
  margin-bottom: 0
}

.el-input__inner {
  text-align: center;
}

.el-button--text {
  display: none;
}
</style>