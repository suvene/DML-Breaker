/*
 * Copyright 2009 Cosmos Inc. All right reserved.
 * http://www.cos-mos.co.jp/
 */

Ext.BLANK_IMAGE_URL = 'ext/resources/images/default/s.gif';

Ext.onReady(function() {
  var inTextarea = {
    id:'inTextarea',
    xtype:'textarea',
    emptyText : config.ui.inputEmptyText,
    style: 'font-family: \"Courier New\",Courier,monospace;font-weight:normal;',
    border: 'none'
  };

  var outTextarea = {
    id:'outTextarea',
    xtype:'textarea',
    style: 'font-family: \"Courier New\",Courier,monospace;font-weight:normal;',
    border: 'none'
  };
  var outRichText = {
    id:'outRichText',
    xtype:'box',
    autoScroll: true,
    style: 'font-family: \"Courier New\",Courier,monospace;font-weight:normal;',
    html: ''
  };

  // パネルを作成
  var inputPanel = new Ext.Panel({
    title : 'DML Breaker(suVene) -  1.0.1',
    collapsible: true,
    height: 200,
    layout:'fit',
    items: [inTextarea] ,
    buttons: [
      {
        id:'btnCnv',
        text: config.ui.btnConv
      },{
        id:'btnReset',
        text: config.ui.btnReset
      }],
      region: 'north'
    });

  var outPanel = new Ext.Panel({
    title : '',
    layout:'fit',
    items: [
      {
        xtype:'tabpanel',
        id: 'outTab',
        deferredRender: true,
        activeTab: 0,
        items:[
          {
            title:'Plain Text',
            layout:'fit',
            items: outTextarea
          },{
            title:'Rich Text',
            layout:'fit',
            preventBodyReset: true,
            style: 'background-color:yellow;font-size:11px;',
            listeners: {activate: handleActivate},
            items: {
              xtype:'panel',
              //layout:'fit',
              autoScroll: true,
              items: outRichText
            }
          }]
      }],

    region: 'center'
  });

  new Ext.Viewport({
    layout:'border',
    defaults: {
      split: true
    },
    items:[
      inputPanel,
      outPanel,
      {
        xtype:'panel',
        layout:'fit',
        split: false,
        border: false,
        bodyBorder:false,
        preventBodyReset:true,
        region: 'south',
        style: 'padding:5px;color:#15428b;font:bold 11px tahoma,arial,verdana,sans-serif;',
        html: ''

      }
    ]
  });

  Ext.get("btnCnv").on("click", function() {

    input = Ext.getCmp("inTextarea").getValue();

    if (input.trim() == "") {
      Ext.MessageBox.alert('', config.msg.emptyInput);
    } else {
      if (validate(Ext.getCmp("inTextarea").getValue())) {
        Ext.getCmp("outTab").setActiveTab(0);
        var result = convertMain(Ext.getCmp("inTextarea").getValue());
        Ext.getCmp("outTextarea").setValue(result);
      } else {
        Ext.MessageBox.alert('', config.msg.noSupportDML);
      }
    }
  });

  Ext.get("btnReset").on("click", function() {
    Ext.getCmp("outTab").setActiveTab(0);
    Ext.getCmp("inTextarea").setValue('');
    Ext.getCmp("outTextarea").setValue('');
    Ext.getDom("outRichText").innerHTML = '';
  });

  function handleActivate(tab) {
    if (tab.title == 'Rich Text') {
      if (Ext.getCmp("outTextarea").getValue() != '') {
        Ext.getDom("outRichText").innerHTML = convUpperCaseKeywordAndRichText(Ext.getCmp("outTextarea").getValue());
      } else {
        Ext.getDom("outRichText").innerHTML = '';
      }
    }
  }
});

