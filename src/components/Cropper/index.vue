<template>
  <div :id="id" class="modal-dialog modal-lg">
    <div class="avatar-upload">
      <label for="avatarInput" class="el-button el-button--primary">选择图片</label>
      <input id="avatarInput" ref="imageFile" type="file" class="avatar-input" style="visibility: hidden" name="file" accept="image/*" @change="change">
    </div>
    <div class="avatar-wrapper">
      <img id="image" ref="cropperImage" :src="url" alt="Picture">
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    uid: {
      type: Number,
      default: 0
    },
    defaultUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cropper: null,
      url: this.defaultUrl,
      imgCropperData: {
        accept: 'image/jpeg, image/png, image/jpg'
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      this.init()
    })
  },
  methods: {
    init: function() {
      this.cropper = new Cropper(this.$refs.cropperImage, {
        aspectRatio: 1,
        viewMode: 1,
        zoomOnWheel: false, // 是否允许通过鼠标滚轮来缩放图片
        background: true, // 是否在容器上显示网格背景
        rotatable: true, // 是否允许旋转图片
        ready: function() {

        }
      })
      this.cropper.replace(this.defaultUrl)
    },
    getObjectURL: function(file) {
      var url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    change: function(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      const type = files[0].type // 文件的类型，判断是否是图片
      const size = files[0].size // 文件的大小，判断图片的大小
      if (this.imgCropperData.accept.indexOf(type) === -1) {
        this.$message({
          message: '请选择jpg、jpeg、png格式图片文件',
          type: 'warning'
        })
        return false
      }
      if (size > 2097152) {
        this.$message({
          message: '请选择2M以下图片文件',
          type: 'warning'
        })
        return false
      }
      this.url = this.getObjectURL(files[0])
      // 每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url)
      }
      // $('#change').val('')
    },
    getRoundedCanvas(sourceCanvas) {
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')
      var width = sourceCanvas.width
      var height = sourceCanvas.height
      canvas.width = width
      canvas.height = height
      context.imageSmoothingEnabled = true
      context.drawImage(sourceCanvas, 0, 0, width, height)
      context.globalCompositeOperation = 'destination-in'
      context.beginPath()
      context.arc(
        width / 2,
        height / 2,
        Math.min(width, height) / 2,
        0,
        2 * Math.PI,
        true
      )
      context.fill()
      return canvas
    },
    // 裁剪提交
    submit: function() {
      // var croppedCanvas = null
      var roundedCanvas = null
      // Crop
      roundedCanvas = this.cropper.getCroppedCanvas()
      if (roundedCanvas === null) {
        return
      }
      // Round
      // roundedCanvas = this.getRoundedCanvas(croppedCanvas) // 绘制成圆型
      // 上传图片
      var formData = new FormData()
      const file = this.dataURLtoFile(roundedCanvas.toDataURL(), '')
      this.url = this.getObjectURL(file)
      if (this.cropper) {
        this.cropper.replace(this.url)
      }
      formData.append('file', file)
      this.$store.dispatch('user/updateAvatar', { uid: this.uid, formData: formData })
        .then(() => {
          this.$message({
            message: '头像修改成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch((e) => {
          this.$message({
            message: '修改失败，请稍后重试',
            type: 'warning',
            duration: 2000
          })
        })
    },
    dataURLtoFile: function(dataurl, filename) { // 将base64转换为文件
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, {
        type: mime
      })
    }
  }
}
</script>

<style lang='scss'>
  .avatar-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .cropper-container {
    direction: ltr;
    font-size: 0;
    line-height: 0;
    position: relative;
    -ms-touch-action: none;
    touch-action: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .cropper-container img { /* Avoid margin top issue (Occur only when margin-top <= -height) */
    display: block;
    height: 100%;
    image-orientation: 0deg;
    max-height: none !important;
    max-width: none !important;
    min-height: 0 !important;
    min-width: 0 !important;
    width: 100%;
  }

  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .cropper-wrap-box,
  .cropper-canvas {
    overflow: hidden;
  }

  .cropper-drag-box {
    background-color: #fff;
    opacity: 0;
  }

  .cropper-modal {
    background-color: #000;
    opacity: .5;
  }

  .cropper-view-box {
    display: block;
    height: 100%;
    outline-color: rgba(51, 153, 255, 0.75);
    outline: 1px solid #39f;
    overflow: hidden;
    width: 100%;
  }

  .cropper-dashed {
    border: 0 dashed #eee;
    display: block;
    opacity: .5;
    position: absolute;
  }

  .cropper-dashed.dashed-h {
    border-bottom-width: 1px;
    border-top-width: 1px;
    height: 33.33333%;
    left: 0;
    top: 33.33333%;
    width: 100%;
  }

  .cropper-dashed.dashed-v {
    border-left-width: 1px;
    border-right-width: 1px;
    height: 100%;
    left: 33.33333%;
    top: 0;
    width: 33.33333%;
  }

  .cropper-center {
    display: block;
    height: 0;
    left: 50%;
    opacity: .75;
    position: absolute;
    top: 50%;
    width: 0;
  }

  .cropper-center:before,
  .cropper-center:after {
    background-color: #eee;
    content: ' ';
    display: block;
    position: absolute;
  }

  .cropper-center:before {
    height: 1px;
    left: -3px;
    top: 0;
    width: 7px;
  }

  .cropper-center:after {
    height: 7px;
    left: 0;
    top: -3px;
    width: 1px;
  }

  .cropper-face,
  .cropper-line,
  .cropper-point {
    display: block;
    height: 100%;
    opacity: .1;
    position: absolute;
    width: 100%;
  }

  .cropper-face {
    background-color: #fff;
    left: 0;
    top: 0;
  }

  .cropper-line {
    background-color: #39f;
  }

  .cropper-line.line-e {
    cursor: e-resize;
    right: -3px;
    top: 0;
    width: 5px;
  }

  .cropper-line.line-n {
    cursor: n-resize;
    height: 5px;
    left: 0;
    top: -3px;
  }

  .cropper-line.line-w {
    cursor: w-resize;
    left: -3px;
    top: 0;
    width: 5px;
  }

  .cropper-line.line-s {
    bottom: -3px;
    cursor: s-resize;
    height: 5px;
    left: 0;
  }

  .cropper-point {
    background-color: #39f;
    height: 5px;
    opacity: .75;
    width: 5px;
  }

  .cropper-point.point-e {
    cursor: e-resize;
    margin-top: -3px;
    right: -3px;
    top: 50%;
  }

  .cropper-point.point-n {
    cursor: n-resize;
    left: 50%;
    margin-left: -3px;
    top: -3px;
  }

  .cropper-point.point-w {
    cursor: w-resize;
    left: -3px;
    margin-top: -3px;
    top: 50%;
  }

  .cropper-point.point-s {
    bottom: -3px;
    cursor: s-resize;
    left: 50%;
    margin-left: -3px;
  }

  .cropper-point.point-ne {
    cursor: ne-resize;
    right: -3px;
    top: -3px;
  }

  .cropper-point.point-nw {
    cursor: nw-resize;
    left: -3px;
    top: -3px;
  }

  .cropper-point.point-sw {
    bottom: -3px;
    cursor: sw-resize;
    left: -3px;
  }

  .cropper-point.point-se {
    bottom: -3px;
    cursor: se-resize;
    height: 20px;
    opacity: 1;
    right: -3px;
    width: 20px;
  }

  @media (min-width: 768px) {
    .cropper-point.point-se {
      height: 15px;
      width: 15px;
    }
  }

  @media (min-width: 992px) {
    .cropper-point.point-se {
      height: 10px;
      width: 10px;
    }
  }

  @media (min-width: 1200px) {
    .cropper-point.point-se {
      height: 5px;
      opacity: .75;
      width: 5px;
    }
  }

  .cropper-point.point-se:before {
    background-color: #39f;
    bottom: -50%;
    content: ' ';
    display: block;
    height: 200%;
    opacity: 0;
    position: absolute;
    right: -50%;
    width: 200%;
  }

  .cropper-invisible {
    opacity: 0;
  }

  .cropper-bg {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }

  .cropper-hide {
    display: block;
    height: 0;
    position: absolute;
    width: 0;
  }

  .cropper-hidden {
    display: none !important;
  }

  .cropper-move {
    cursor: move;
  }

  .cropper-crop {
    cursor: crosshair;
  }

  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }

  .avatar-view {
    display: block;
    margin: 15% auto 5%;
    height: 220px;
    width: 220px;
    border: 3px solid #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
    cursor: pointer;
    overflow: hidden;
  }

  .avatar-view img {
    width: 100%;
  }

  .avatar-body {
    padding-right: 15px;
    padding-left: 15px;
  }

  .avatar-upload {
    overflow: hidden;
  }

  .avatar-upload label {
    display: block;
    float: left;
    clear: left;
    width: 100px;
  }

  .avatar-upload input {
    display: block;
    margin-left: 110px;
  }

  .avatar-alert {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .avatar-wrapper {
    height: 364px;
    width: 100%;
    margin-top: 15px;
    box-shadow: inset 0 0 5px rgba(0,0,0,.25);
    background-color: #fcfcfc;
    overflow: hidden;
  }

  .avatar-wrapper img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }

  .avatar-preview {
    float: left;
    margin-top: 15px;
    margin-right: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
  }

  .avatar-preview:hover {
    border-color: #ccf;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
  }

  .avatar-preview img {
    width: 100%;
  }

  .avatar-preview-round{
    border-radius: 50%;
  }
  .preview-lg {
    height: 184px;
    width: 184px;
    margin-top: 15px;
  }

  .preview-md {
    height: 100px;
    width: 100px;
  }

  .preview-sm {
    height: 50px;
    width: 50px;
  }

  @media (min-width: 992px) {
    .avatar-preview {
      float: none;
    }
  }

  .avatar-btns {
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .avatar-btns .btn-group {
    margin-right: 5px;
  }
</style>
