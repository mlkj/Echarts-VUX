<template>
  <div class="inline-calendar">
    <div class="calendar-header" v-show="!hideHeader">
      <div class="calendar-year">
        <span @click="go(year - 1, month)">
          <a class="year-prev vux-prev-icon" href="javascript:"></a>
        </span>
        <a class="calendar-year-txt calendar-title" href="javascript:">{{year}}年</a>
        <span class="calendar-header-right-arrow" @click="go(year + 1, month)">
          <a class="year-next vux-next-icon" href="javascript:"></a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import format from './format'
import { getDays, zero } from './util'
import props from './props'

export default {
  props: props(),
  data() {
    return {
      year: 0,
      month: 0,
      days: [],
      today: format(new Date(), 'YYYY-MM'),
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      currentValue: ''
    }
  },
  created() {
    this.currentValue = this.value
  },
  mounted() {
    this.currentValue = this.convertDate(this.currentValue)
    this.render(this.renderMonth[0], this.renderMonth[1] - 1)
  },
  computed: {
    _replaceTextList() {
      const rs = {}
      for (let i in this.replaceTextList) {
        rs[this.convertDate(i)] = this.replaceTextList[i]
      }
      return rs
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.currentValue = this.convertDate(val)
      if (this.renderOnValueChange) {
        this.render(null, null, val)
      } else {
        this.render(this.year, this.month, this.currentValue)
      }
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    returnSixRows(val) {
      this.render(this.year, this.month, this.currentValue)
    },
    startDate(val) {
      this.render(this.year, this.month, this.currentValue)
    },
    endDate(val) {
      this.render(this.year, this.month, this.currentValue)
    },
    disablePast() {
      this.render(this.year, this.month, this.currentValue)
    },
    disableFuture() {
      this.render(this.year, this.month, this.currentValue)
    }
  },
  methods: {
    replaceText(day, formatDay) {
      return this._replaceTextList[formatDay] || day
    },
    convertDate(date) {
      return date === 'TODAY' ? this.today : date
    },
    render(year, month) {
      let data = getDays({
        year: year,
        month: month,
        value: this.currentValue,
        rangeBegin: this.convertDate(this.startDate),
        rangeEnd: this.convertDate(this.endDate),
        returnSixRows: this.returnSixRows,
        disablePast: this.disablePast,
        disableFuture: this.disableFuture
      })
      this.days = data.days
      this.year = data.year
      this.month = data.month
    },
    go(year, month) {
      this.render(year, month)
      this.currentValue = [this.year, zero(this.month + 1)].join('-')
    }
  }
}
</script>
 
<style scoped>
.calendar-year>span {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  padding: 8px;
  width: 24px;
  height: 24px;
}

.calendar-year>span.calendar-header-right-arrow {
  left: auto;
  right: 0;
}

.calendar-title {
  padding: 0 6%;
  color: #333;
}

.vux-prev-icon,
.vux-next-icon {
  position: absolute;
  left: 0;
  top: 15px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #04BE02;
  border-radius: 0;
  border-top: none;
  border-right: none;
  transform: rotate(45deg);
  margin-left: 1px;
  line-height: 40px;
}

.vux-next-icon {
  transform: rotate(-135deg);
  left: auto;
  top: 14px;
  right: 1px;
}

.inline-calendar a {
  text-decoration: none;
}

.calendar-year {
  position: relative;
}

.calendar-header {
  line-height: 40px;
  font-size: 1.05em;
  overflow: hidden;
  margin-right: 30px;
}

.calendar-header>div {
  float: right;
  width: 70%;
  text-align: center;
  overflow: hidden;
}

.calendar-header span:last-of-type {
  float: right;
  vertical-align: bottom;
}
</style>
