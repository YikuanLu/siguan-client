<template>
  <div class="tinymce-editor">
    <client-only placeholder="Loading...">
      <Editor
        v-model="myValue"
        :init="init"
        :disabled="disabled"
        @onClick="onClick">
      </Editor>
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue'
import zhCN from '@/static/tinymce/langs/zh_CN'
let Editor, tinymce
if (process.client) {
  Editor = Vue.extend(require('@tinymce/tinymce-vue').default)
  tinymce = require('tinymce/tinymce')
  tinymce.addI18n('zh_CN', zhCN)
  require('tinymce/themes/silver/theme')
  require('tinymce/plugins/image')
  require('tinymce/plugins/media')
  require('tinymce/plugins/table')
  require('tinymce/plugins/lists')
  require('tinymce/plugins/wordcount')
  require('tinymce/plugins/colorpicker')
  require('tinymce/plugins/fullscreen')
  require('tinymce/plugins/contextmenu')
  require('tinymce/plugins/textcolor')
}

export default {
  components: {
    Editor
  },
  props: {
    val: {
      type: String,
      default: ''
    },
    triggerChange: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: () => ['lists', 'image', 'media', 'table', 'wordcount', 'fullscreen']
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat | fullscreen'
    }
  },
  data () {
    return {
      // 初始化配置
      init: {
        language: 'zh_CN',
        relative_urls: true,
        document_base_url: '/',
        skin: 'oxide',
        skin_url: 'tinymce/skins/ui/oxide',
        content_css: 'tinymce/skins/content/default/content.min.css',
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        statusbar: false,
        images_upload_handler: (blobInfo, success) => {
          const img = `data:image/jpeg;base64${blobInfo.base64()}`
          success(img)
        }
      },
      myValue: this.val
    }
  },
  watch: {
    val (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      if (this.triggerChange) {
        // console.log(1)
        this.$emit('change', newValue)
      } else {
        // console.log(2)
        this.$emit('input', newValue)
      }
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear () {
      this.myValue = ''
    }
  }
}

</script>
