<template id="template_pagination">
    <section class="pages-wrap">
        <ul class="pagination clearfix">
            <li :class="{'disabled': pageInfo.current == 1}"><a href="javascript:;" @click="clickCurrent(1)"> 首页 </a></li>
            <li v-if=" pageInfo.current != 1" :class="{'disabled': pageInfo.current == 1}"><a href="javascript:;" @click="clickCurrent(pageInfo.current - 1)"> 上一页 </a></li>
            <li v-for="(p,key) in setList" :key="key" :class="{'active': pageInfo.current == p.val}" >
                <a href="javascript:;" v-if="pageInfo.current == p.val" :style="{backgroundColor:pageInfo.skin , borderColor:pageInfo.skin}" @click="clickCurrent(p.val)"> {{ p.text }} </a>
                <a href="javascript:;" v-else  @click="clickCurrent(p.val)"> {{ p.text }} </a>
            </li>
            <li v-if="setList.length>1" :class="{'disabled': pageInfo.current == pageInfo.page}"><a href="javascript:;" @click="clickCurrent(pageInfo.current + 1)"> 下一页</a></li>
            <li :class="{'disabled': pageInfo.current == pageInfo.page}"><a href="javascript:;" @click="clickCurrent(soPage)"> 尾页 </a></li>
        </ul>
    </section>
</template>
<script>
export default {
    props:['pageInfo','soPage'],
    computed: {
        setList:function(){
            let len = this.soPage , temp = [], list = [], count = Math.floor(this.pageInfo.pagegroup / 2) ,center = this.pageInfo.current;
            if( len <= this.pageInfo.pagegroup ){
                while(len--){ temp.push({text:this.soPage-len,val:this.soPage-len});}
                return temp;
            }
            while(len--){ temp.push(this.soPage - len);}
            let idx = temp.indexOf(center);
             (idx < count) && ( center = center + count - idx);
             (this.pageInfo.current > this.soPage - count) && ( center = this.soPage - count);
             temp = temp.splice(center - count -1, this.pageInfo.pagegroup);
                do {
                    let t = temp.shift();
                    list.push({
                        text: t,
                        val: t
                    });
                }while(temp.length);
                if( this.soPage > this.pageInfo.pagegroup ){
                    (this.pageInfo.current > count + 1) && list.unshift({ text:'...',val: list[0].val - 1 });
                    (this.pageInfo.current < this.soPage - count) && list.push({ text:'...',val: list[list.length - 1].val + 1 });
                }
                return list;
            }
        },
        methods: {
            clickCurrent: function(idx) {
                if( this.pageInfo.current != idx && idx > 0 && idx < this.soPage + 1) {
                    this.pageInfo.current = idx;
                    this.$emit('change',this.pageInfo.current);
                }
            }
        }
    }
</script>
<style scoped>
    .pages-wrap {
        text-align: center;
    }
    .pagination {
        padding-left: 0;
        margin-top:5px;
        border-radius: 4px;
    }
    .pagination>li {
        display: inline;
    }
    .pagination>.active>a, .pagination>.active>a:hover, .pagination>.active>span,  .pagination>.active>span:hover {
        z-index: 3;
        color: #fff;
        cursor: default;
        background-color: #86715c;
        border-color: #86715c;
    }
    .pagination>.disabled>a, .pagination>.disabled>a:hover, .pagination>.disabled>span, .pagination>.disabled>span:hover {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
        border-color: #ddd;
    }
    .pagination>li>a:hover,.pagination>li>span:hover {
        z-index: 2;
        color: rgba(0,0,0,0.6);
        background-color: #eee;
        border-color: #ddd;
    }
    .pagination>li>a, .pagination>li>span {
        position: relative;
        float: left;
        padding: 2px 10px;
        margin-left: -1px;
        line-height: 1.42857143;
        color:#880000;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
    }
</style>