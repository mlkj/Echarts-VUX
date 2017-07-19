<template>
  <div>
    <tab :line-width="2" v-model="index">
      <tab-item :selected="tags === item" v-for="item in taglist" :key="item.id" @click="tags = item">{{item}}</tab-item>
    </tab>
    <div v-if="index === 0" class="vux-1px-t">
      <swipeout class="vux-1px-tb">
      <swipeout-item  transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">删除</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">收藏</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
        JavaScript is the best language
        </div>
      </swipeout-item>
      </swipeout>
    </div>
    <div v-if="index === 1">
      <x-table :cell-bordered="false" style="background-color:#fff;">
        <tbody>
          <tr v-for="item in news">
            <td>
              <router-link :to="{ name: '详情页', params: { id: item.id }}">{{ item.title }}</router-link>
            </td>
          </tr>
        </tbody>
        <infinite-loading :on-infinite="fetchData" ref="initLoading">
          <span slot="no-more">
            没有更多数据
          </span>
        </infinite-loading>
      </x-table>
    </div>
    <div v-if="index === 2">
      <div class="hacker-news-header">
        <a target="_blank" href="http://www.ycombinator.com/">
          <img src="https://news.ycombinator.com/y18.gif">
        </a>
        <select v-model="tag" @change="changeFilter()">
          <option value="story">Story</option>
          <option value="poll">Poll</option>
          <option value="show_hn">Show hn</option>
          <option value="ask_hn">Ask hn</option>
          <option value="front_page">Front page</option>
        </select>
      </div>
      <div class="list-con">
        <div class="list" v-for="(item, key) in list" :key="key">
          <span class="num" v-text="key + 1"></span>
          <p>
            <a :href="item.url" v-text="item.title"></a>
          </p>
          <p>
            <small>
              <span v-text="item.points"></span>
              points by
              <a target="_blank" :href="'https://news.ycombinator.com/user?id=' + item.author" v-text="item.author"></a>
  
              <a target="_blank" :href="'https://news.ycombinator.com/item?id=' + item.objectID" v-text="item.num_comments + ' comments'"></a>
            </small>
          </p>
        </div>
        <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
          <span slot="no-more">
            没有更多数据
          </span>
        </infinite-loading>
        <!--<question-list></question-list>-->
      </div>
    </div>
  </div>
</template>

<style scope>
.list {
  overflow: hidden;
  margin: 20px 0;
}

.list>span {
  float: left;
  margin-right: 5px;
}
.demo-content {
  padding: 10px 10px;
}
</style>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton,XTable, Tab, TabItem, InlineCalendar } from 'vux'
import InfiniteLoading from 'vue-infinite-loading'

const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

const list = () => ['资讯', '问答', '博客']

export default {

  components: {
    Swipeout, SwipeoutItem, SwipeoutButton,Tab, InfiniteLoading, TabItem, XTable
  },
  data() {
    return {
      range: true,
      date: ['2016-10-16', '2017-01-02'],
      news: [],
      tag: 'story',
      list: [],
      tags: '资讯',
      taglist: list(),
      index: 0,
    }
  },
  methods: {
    changevalue(val) {
      console.log(val)
    },
    fetchData() {
      this.$http.get('https://cnodejs.org/api/v1/topics?mdrender=false&tab=all').then((response) => {
        let res = response.data
        if (res.success) {
          this.news = this.news.concat(res.data);
          this.$refs.initLoading.$emit('$InfiniteLoading:loaded');
          if (this.news.length / 20 === 2) {
            this.$refs.initLoading.$emit('$InfiniteLoading:complete');
          }
        } else {
          this.$refs.initLoading.$emit('$InfiniteLoading:complete');
        }
      });
    },
    onInfinite() {
      this.$http.get(api, {
        params: {
          tags: this.tag,
          page: this.list.length / 20 + 1,
        },
      }).then((res) => {
        if (res.data.hits.length) {
          this.list = this.list.concat(res.data.hits);
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          if (this.list.length / 20 === 3) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        } else {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        }
      });
    },
    changeFilter() {
      this.list = [];
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      });
    },
  }
}
</script>
