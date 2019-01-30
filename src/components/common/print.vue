<template>
    <!-- 打印 -->
    <div>
        <p :align="btnAlign" style="padding-bottom:16px;">
            <el-button type="info" size="small" @click="printContent">打印</el-button>
        </p>
        <div class="printContent" id="printContent">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      // 打印按钮位置 left,center,right
      btnAlign: {
        type: String,
        default: 'right'
      },
      // 打印之后返回的数据集
      operailityData: {
        default: () => {}
      },
    },
    methods: {
      // 打印
      printContent () {
        let printContent = document.getElementById('printContent')
        let printContentBox = document.getElementById('printContentBox')
        if (!printContentBox) {
          printContentBox = document.createElement('div')
          printContentBox.setAttribute('id', 'printContentBox')
        }
        printContentBox.innerHTML = printContent.innerHTML
        document.body.appendChild(printContentBox)
        if (this.getExplorer() == 'IE') {
          this.pageSetupUull()
        }
        window.print()
        this.$emit('print', this.operailityData)
//        setTimeout(() => printContentBox.innerHTML = '', 300)
      },
      /**
       * 对IE设置打印预览
       */
      pageSetupUull () {
        var hkey_root, hkey_path, hkey_key
        hkey_root = 'HKEY_CURRENT_USER'
        hkey_path = '\\Software\\Microsoft\\Internet Explorer\\PageSetup\\'
        try {
          var RegWsh = new ActiveXObject('WScript.Shell')
          hkey_key = 'header'
          RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, '')
          hkey_key = 'footer'
          RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, '')
        } catch (e) {}
      },
      // 获取浏览器类型
      getExplorer () {
        var explorer = window.navigator.userAgent
        //ie
        if (explorer.indexOf('MSIE') >= 0) {
          return 'IE'
        }
        //firefox
        else if (explorer.indexOf('Firefox') >= 0) {
          return 'Firefox'
        }
        //Chrome
        else if (explorer.indexOf('Chrome') >= 0) {
          return 'Chrome'
        }
        //Opera
        else if (explorer.indexOf('Opera') >= 0) {
          return 'Opera'
        }
        //Safari
        else if (explorer.indexOf('Safari') >= 0) {
          return 'Safari'
        }
      }
    }
  }

</script>

<style media="print">
    /* 打印 */
    /*@page  {*/
    /*size: auto;  !* auto is the initial value *!*/
    /*margin: 0mm; !* this affects the margin in the printer settings *!*/
    /*}*/
    #printContentBox {
        display: none;
    }

    @media print {
        body {
            height: auto;
        }

        #app,
        .el-message {
            visibility: hidden;
            display: none;
        }
        .display, .printTitle {
            display: none;
        }

        #printContentBox {
            /* width: 1000px; */
            display: block;
            margin: 0px 20px;
            z-index: -9999;
            width: 100%;
            position: absolute;
            top:0;
            /*margin-top: -1000px;*/

        }

        .printNoBorder {
            border: none !important;
        }

        /* 下一页 */
        .printPageNext {
            page-break-after: always;
        }

        @page {
            size: auto;
            /* 边距 */
            /*margin: 2mm 10mm;*/
            margin: 10mm 0mm;
        }

        /* 表格重置 */
        table {
            border: 1px solid #dfe6ec;
            border-collapse: collapse;
            cellspacing: 0;
            cellpadding: 0;
        }

        table td, th {
            border: 1px solid #dfe6ec !important;
        }

        table th {
            border-bottom: none !important;
        }

        .el-table {
            border: none;
            background-color: transparent;
            overflow: visible;
        }

        .el-table table th.gutter {
            display: none;
        }

        .el-table__body-wrapper {
            width: 100%;
        }

        .el-table__header[style] {
            width: 100% !important;
        }

        .el-table__body[style] {
            width: 100% !important;
        }

        .el-tooltip[style] {
            width: auto !important;
        }

        .el-table__empty-block[style] {
            width: 100% !important;
        }

        .el-table__body, .el-table__footer, .el-table__header {
            table-layout: auto;
        }

        .el-table__body-wrapper {
            margin-top: -1px;
        }

        .el-table__empty-block {
            border: 1px solid #dfe6ec;
            border-top: none;
            margin-top: -1px;
        }

        .el-table::after, .el-table::before {
            background-color: transparent;
        }

        /* 交费单 */
        .printBPMain .printBPItem {
            margin-top: 150px;
        }

        .printBPMain .printBPItem:nth-child(2n) {
            margin-top: 350px;
            page-break-after: always;
        }
    }

</style>
