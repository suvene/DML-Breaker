/* 
 * Copyright 2009 Cosmos Inc. All right reserved.
 * http://www.cos-mos.co.jp/
 */

var config={};
var brzlang;

brzlang = getBrowserLanguage();
if (brzlang == "ja") {
	config = {
		ui: {
			inputEmptyText : 'ここに整形前のDML(SQL)を入力し[整形]ボタンを押下してください',
			btnConv: '整形',
			btnReset: 'リセット'
		},
		msg: {
			emptyInput: '整形前のDML(SQL)が未入力です',
			noSupportDML: '入力されたSQLはサポートしていません<br />SELECT/INSERT/UPDATE/DELETE文にのみ対応しています'
		}
	}
} else {
	config = {
		ui: {
			inputEmptyText : 'Please input DML(SQL) here and push the Format button.',
			btnConv: 'Format',
			btnReset: 'Reset'
		},
		msg: {
			emptyInput: 'DML(SQL) is a uninput.',
			noSupportDML: 'Input DML is not supported.'
		}
	}
}

function getBrowserLanguage() {
	var lang = "ja";

	if (document.all) {
		// IE
		lang = navigator.browserLanguage;
	} else if (document.layers) {
		// N4
		lang = navigator.language ;
	} else {
		//N6,Moz用
		lang = navigator.language.substr(0,2);
	}
	return lang;
}

