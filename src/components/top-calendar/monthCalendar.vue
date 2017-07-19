<template>
  <div class="inline-calendar" >
    <div class="calendar-header" v-show="!hideHeader">
      <div class="calendar-year">
        <span @click="go(year - 1, month)">
          <a class="year-prev vux-prev-icon" href="javascript:"></a>
        </span>
        <a class="calendar-year-txt calendar-title" href="javascript:">{{year}}</a>
        <span class="calendar-header-right-arrow" @click="go(year + 1, month)">
          <a class="year-next vux-next-icon" href="javascript:"></a>
        </span>
      </div>

      <div class="calendar-month">
        <span @click="prev">
          <a class="month-prev vux-prev-icon" href="javascript:"></a>
        </span>
        <a class="calendar-month-txt calendar-title" href="javascript:">{{months[month]}}</a>
        <span @click="next" class="calendar-header-right-arrow">
          <a class="month-next vux-next-icon" href="javascript:"></a>
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
  data () {
    return {
      year: 0,
      month: 0,
      days: [],
      today: format(new Date(), 'YYYY-MM'),
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      currentValue: ''
    }
  },
  created () {
    this.currentValue = this.value
  },
  mounted () {
    this.currentValue = this.convertDate(this.currentValue)
    this.render(this.renderMonth[0], this.renderMonth[1] - 1)
  },
  computed: {
    _replaceTextList () {
      const rs = {}
      for (let i in this.replaceTextList) {
        rs[this.convertDate(i)] = this.replaceTextList[i]
      }
      return rs
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.currentValue = this.convertDate(val)
      if (this.renderOnValueChange) {
        this.render(null, null, val)
      } else {
        this.render(this.year, this.month, this.currentValue)
      }
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    returnSixRows (val) {
      this.render(this.year, this.month, this.currentValue)
    },
    startDate (val) {
      this.render(this.year, this.month, this.currentValue)
    },
    endDate (val) {
      this.render(this.year, this.month, this.currentValue)
    },
    disablePast () {
      this.render(this.year, this.month, this.currentValue)
    },
    disableFuture () {
      this.render(this.year, this.month, this.currentValue)
    }
  },
  methods: {
    replaceText (day, formatDay) {
      return this._replaceTextList[formatDay] || day
    },
    convertDate (date) {
      return date === 'TODAY' ? this.today : date
    },
    render (year, month) {
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
    prev () {
      if (this.month === 0) {
        this.month = 11
        this.year = this.year - 1
      } else {
        this.month = this.month - 1
      }
      this.render(this.year, this.month)
      this.currentValue = [this.year, zero(this.month + 1)].join('-')
    },
    next () {
      if (this.month === 11) {
        this.month = 0
        this.year = this.year + 1
      } else {
        this.month = this.month + 1
      }
      this.render(this.year, this.month)
      this.currentValue = [this.year, zero(this.month + 1)].join('-')      
    },
    go (year, month) {
      this.render(year, month)
      this.currentValue = [this.year, zero(this.month + 1)].join('-')      
    },
  }
}
</script>
 
<style  scoped>

.calendar-year > span, .calendar-month > span {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  padding: 8px;
  width: 24px;
  height: 24px;
}

.calendar-year > span.calendar-header-right-arrow, .calendar-month > span.calendar-header-right-arrow {
  left: auto;
  right: 0;
}
.vux-prev-icon, .vux-next-icon {
  position: absolute;
  left: 0;
  top: 15px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid  #04BE02;
  border-radius: 0;
  border-top: none;
  border-right: none;
  transform: rotate(45deg);
  margin-left: 15px;
  line-height: 40px;
}
.vux-next-icon {
  transform: rotate(-135deg);
  left: auto;
  top: 14px;
  right: 15px;
}

.calendar-year, .calendar-month {
  position: relative;
}
.calendar-header {
  line-height: 40px;
  font-size: 1.2em;
  overflow: hidden;
}
.calendar-header > div {
  float: left;
  width: 50%;
  text-align: center;
  overflow: hidden;
}
.calendar-header span:last-of-type {
  float: right;
  vertical-align: bottom;
}

.calendar-title {
  padding: 0 6%;
  color: #333;
}


.inline-calendar {
  width: 100%;
  background: #fff;
  border-radius: 2px;
  transition: all .5s ease;
}

</style>
