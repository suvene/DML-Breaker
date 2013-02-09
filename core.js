/* 
 * Copyright 2009 Cosmos Inc. All right reserved.
 * http://www.cos-mos.co.jp/
 */

// SQL整形メイン処理
function convertMain(targetSql) {

	// 整形後SQL
	newSql = "";
	// 作業SQL
	wkSql = "";
	// SQL配列
	sqlArray = new Array();
	// 作業変数
	wk = "";
	// 一時領域
	add = "";
	// 開始位置
	startNo = 0;
	// 終了位置
	endNo = 0;
	// タブ文字
	tab = "";
	// 括弧の未完回数
	parenthesis = 0;
	// ON句の登場回数
	onCount = 0;
	// BETWEEN句の発生フラグ(true:発生、false:未発生)
	betweenFlg = false;
	// UNION句の発生フラグ(true:発生、false:未発生)
	unionFlg = false;
  // inline view などで select が発生したときの parenthsis の値
  cntMatchParens = [];

	if ( targetSql == null ) {

		return;
	}

	// タブ、改行文字、復帰文字を削除
	targetSql = targetSql.replace( /\t|\n|\r/gi, " " );
	// SQLを分割して配列に格納
	sqlArray = targetSql.replace( /;/gi, ";><" ).split( "><" );

	// SQLの先頭がアルファベットになるまで先頭文字を削る
	for ( var i = 0; i < sqlArray.length; i++ ) {

		for ( var j = 0; j < sqlArray[ i ].length; j++ ) {

			if ( sqlArray[ i ].substring( j ).match( /^[a-z]/i ) != null ) {

				sqlArray[ i ] = sqlArray[ i ].substring( j );

				break;
			}
		}
	}

	// 複数行に崩す処理を行う
	convertBreak();

	// 余分な半角スペースを削除
	while ( true ) {

		wk = newSql;
		newSql = newSql.replace( /  /g, " " );
		newSql = newSql.replace( / \r\n/g, "\r\n" );
		newSql = newSql.replace( /\t /g, "\t" );

		if ( wk == newSql ) {

			break;
		}
	}

	newSql = newSql.replace( /\t/g, "    " ).replace( /@/g, " " );

	// SQLキーワードの大文字化
	var convSql = convUpperCaseKeyword(newSql);
	return convSql;
}

// 複数行に崩す
function convertBreak() {

	for ( var i = 0; i < sqlArray.length; i++ ) {

		if ( sqlArray[ i ].match( /^[a-z]/i ) == null ) {

			continue;
		}

		wkSql = sqlArray[ i ];
		wk = wkSql;
		startNo = 0;
		add = "";

		if ( wkSql.match( /^select /i ) != null ) {
			// SELECT

			while ( true ) {

				newSql += convertSelect();

				if ( unionFlg == false ) {

					startNo = 0;

					break;
				}

				startNo = endNo + 1;
				add = "";
				tab = "";
				parenthesis = 0;
				onCount = 0;
			}
		} else if ( wkSql.match( /^insert /i ) != null ) {
			// INSERT

			newSql += convertInsert();
			startNo = 0;
		} else if ( wkSql.match( /^update /i ) != null ) {
			// UPDATE

			newSql += convertUpdate();
			startNo = 0;
		} else if ( wkSql.match( /^delete /i ) != null ) {
			// DELETE

			newSql += convertDelete();
			startNo = 0;

		} else {
			
			newSql = "";
			return;
		}

		if ( newSql.match( /\r\n$/ ) == null ) {

			newSql += "\r\n";
		}
	}
}

// SELECTの整形処理
function convertSelect() {

	// 整形後のSQL
	var convertSql = "";

	add = "";
	unionFlg = false;

	if ( wkSql.substring( startNo ).match( /^select distinct /i ) != null ) {

		convertSql = wkSql.substring( startNo, startNo + 15 ) + "\r\n\t" + tab;
		startNo += 16;

	} else if ( wkSql.substring( startNo ).match( /^select /i ) != null ) {

		convertSql = wkSql.substring( startNo, startNo + 6 ) + "\r\n\t" + tab;
		startNo += 7;

	} else {

		convertSql = "\t";
	}

	for ( var i = startNo; i < wkSql.length; i++ ) {

		wk = wkSql.charAt( i );
		endNo = i;

		if ( wk == ")" ) {

			parenthesis--;

			if (parenthesis == cntMatchParens[cntMatchParens.length - 1] - 1) {
        wk = "\r\n" + tab + wk;
        tab = tab.replace(/(.)*\t\t/, '$1');
        cntMatchParens.pop();
      } else if ( parenthesis < 0 ) {

				convertSql += add;
				add = "\r\n" + tab;
				add = add.replace( "\t", "" );
				i = wkSql.length;
			}
		}

		add += wk;

		if (wk == ",") {

      if (cntMatchParens.length == 0 || parenthesis == cntMatchParens[cntMatchParens.length - 1]) {
			  convertSql += add;
        add = "\r\n\t" + tab;
      } else {
        add += ' ';
      }

		} else if ( wk == "(" ) {

			parenthesis++;

		} else if ( add.match( / and /i ) != null ) {

			convertSql += add.substring( 0, add.length - 4 );

			if ( betweenFlg == true ) {

				betweenFlg = false;

			} else {

				convertSql += "\r\n\t" + tab;
			}

			convertSql += add.slice( -4 );
			add = "";

		} else if ( add.match( / or /i ) != null ) {

			convertSql += add.substring( 0, add.length - 3 ) + "\r\n\t" + tab + add.slice( -3 ) + "@";
			add = "";

		} else if ( add.match( / from /i ) != null ) {

			convertSql += add.substring( 0, add.length - 5 ) + "\r\n" + tab + add.slice( -5 );
			add = "\r\n\t" + tab;

		} else if ( add.match( / where /i ) != null ) {

			convertSql += add.substring( 0, add.length - 6 ) + "\r\n" + tab + add.slice( -6 );
			add = "\r\n\t\t" + tab;

		} else if ( add.match( / inner join | right join /i ) != null ) {

			convertSql += add.substring( 0, add.length - 11 ) + "\r\n" + tab +  add.slice( -11 );
			add = "\r\n\t" + tab;

		} else if ( add.match( / left join /i ) != null ) {

			convertSql += add.substring( 0, add.length - 10 ) + "\r\n" + tab +  add.slice( -10 );
			add = "\r\n\t" + tab;

		} else if ( add.match( / right outer join /i ) != null ) {

			convertSql += add.substring( 0, add.length - 17 ) + "\r\n" + tab +  add.slice( -17 );
			add = "\r\n\t" + tab;

		} else if ( add.match( / left outer join /i ) != null ) {

			convertSql += add.substring( 0, add.length - 16 ) + "\r\n" + tab +  add.slice( -16 );
			add = "\r\n\t" + tab;

		} else if ( add.match( / on /i ) != null ) {

			convertSql += add.substring( 0, add.length - 3 ) + "\r\n" + tab +  add.slice( -3 );
			add = "\r\n\t\t" + tab;
			onCount = 1;

		//} else if ( add.match( /(^[\(])select /i ) != null ) {
		} else if ( add.match( /select /i ) != null ) {

      if (add.match(/\(/)) {
        cntMatchParens.push(parenthesis);
      }
			startNo = i - 6;
      if (!cntMatchParens.length) parenthesis = 0;
			onCount = 0;
			tab = tab.concat( "\t\t" );
			convertSql += add.substring( 0, add.length - 7 ) + "\r\n" + tab;
			add = "";

			while ( true ) {

				convertSql += convertSelect();

				if ( unionFlg == false ) {

					break;
				}

				startNo = endNo + 1;
        if (!cntMatchParens.length) parenthesis = 0;
				onCount = 0;
				add = "";
			}

			i = endNo;
      if (!cntMatchParens) parenthesis = 0;
			tab = tab.replace( "\t\t", "" );

		} else if ( add.match( / group by | order by /i ) != null ) {

			convertSql += add.substring( 0, add.length - 9 ) + "\r\n" + tab + add.slice( -9 );
			add = "\r\n\t" + tab;

		} else if ( add.match( / having /i ) != null ) {

			convertSql += add.substring( 0, add.length - 7 ) + "\r\n" + tab + add.slice( -7 );
			add = "\r\n\t" + tab;

		} else if ( add.match( / union all /i ) != null ) {

			convertSql += add.substring( 0, add.length - 10 ) + "\r\n" + tab + add.slice( -10 );
			add = "\r\n" + tab;

			i = wkSql.length;
			unionFlg = true;

		} else if ( add.match( / between /i ) != null ) {

			betweenFlg = true;
		}
	}

	convertSql += add;
	add = "";

	return convertSql;
}

// INSERTの整形処理
function convertInsert() {

	// 整形後のSQL
	var convertSql = "";

	for ( var i = startNo; i < wkSql.length; i++ ) {

		wk = wkSql.charAt( i );

		if ( wk == ")" ) {

			parenthesis++;
			add += "\r\n" + tab;
		}

		add += wk;

		if ( wk == "," ) {

			add += "\r\n\t" + tab;

		} else if ( wk == "(" ) {

			parenthesis--;
			add += "\r\n\t" + tab;

		} else if ( add.match( / values/i ) != null ) {

			convertSql += add.substring( 0, add.length - 6 ) + "\r\n" + add.slice( -6 );
			add = "";

		} else if ( add.match( /select /i ) != null ) {

			startNo = i - 6;
			onCount = 0;
			convertSql += add.substring( 0, add.length - 7 );

			if ( parenthesis == 0 ) {

				convertSql += "\r\n" + tab;
			}

			parenthesis = 0;

			convertSql += convertSelect();
			
			i = endNo;
			parenthesis = 0;
		}
	}

	convertSql += add;
	add = "";

	return convertSql;
}

// UPDATEの整形処理
function convertUpdate() {

	// 整形後のSQL
	var convertSql = "";

	add = "";

	endNo = wkSql.length;

	for ( var i = startNo; i < wkSql.length; i++ ) {

		wk = wkSql.charAt( i );

		if ( wk == ")" ) {
			parenthesis--;

			if ( parenthesis < 0 ) {

				convertSql += add;
				add = "\r\n" + tab;
				add = add.replace( "\t", "" );
				endNo = i;
				i = wkSql.length;
			}
		}

		add += wk;

		if ( wk == "," && parenthesis == 0 ) {

			convertSql += add;
			add = "\r\n\t" + tab;

		} else if ( wk == "(" ) {

			parenthesis++;


		} else if ( add.match( / set /i ) != null ) {
			convertSql += add.substring( 0, add.length - 4 ) + add.slice( -4 );
			add = "\r\n\t";

		} else if ( add.match( / and /i ) != null ) {

			convertSql += add.substring( 0, add.length - 4 );

			if ( betweenFlg == true ) {

				betweenFlg = false;

			} else {

				convertSql += "\r\n\t" + tab;
			}

			convertSql += add.slice( -4 );
			add = "";

		} else if ( add.match( / or /i ) != null ) {

			convertSql += add.substring( 0, add.length - 3 ) + "\r\n\t" + tab + add.slice( -3 ) + "@";
			add = "";

		} else if ( add.match( / where /i ) != null ) {

			convertSql += add.substring( 0, add.length - 6 ) + "\r\n" + tab + add.slice( -6 );
			add = "\r\n\t\t" + tab;

		} else if ( add.match( /select /i ) != null ) {

			startNo = i - 6;
			parenthesis = 0;
			onCount = 0;
			tab = tab.concat( "\t\t" );
			convertSql += add.substring( 0, add.length - 7 ) + "\r\n" + tab;
			add = "";

			convertSql += convertSelect();

			startNo = endNo + 1;
			parenthesis = 0;
			onCount = 0;
			add = "";

			i = endNo;
			parenthesis = 0;
			tab = tab.replace( "\t\t", "" );

		} else if ( add.match( / between /i ) != null ) {

			betweenFlg = true;
		}
	}

	convertSql += add;
	add = "";

	return convertSql;
}

// DELETEの整形処理
function convertDelete() {

	// 整形後のSQL
	var convertSql = "";

	add = "";

	endNo = wkSql.length;

	for ( var i = startNo; i < wkSql.length; i++ ) {

		wk = wkSql.charAt( i );

		if ( wk == ")" ) {

			parenthesis--;

			if ( parenthesis < 0 ) {

				convertSql += add;
				add = "\r\n" + tab;
				add = add.replace( "\t", "" );
				endNo = i;
				i = wkSql.length;
			}
		}

		add += wk;

		if ( wk == "," && parenthesis == 0 ) {

			convertSql += add;
			add = "\r\n\t" + tab;

		} else if ( wk == "(" ) {

			parenthesis++;

		} else if ( add.match( / and /i ) != null ) {

			convertSql += add.substring( 0, add.length - 4 );

			if ( betweenFlg == true ) {

				betweenFlg = false;

			} else {

				convertSql += "\r\n\t" + tab;
			}

			convertSql += add.slice( -4 );
			add = "";

		} else if ( add.match( / or /i ) != null ) {

			convertSql += add.substring( 0, add.length - 3 ) + "\r\n\t" + tab + add.slice( -3 ) + "@";
			add = "";

		} else if ( add.match( / where /i ) != null ) {

			convertSql += add.substring( 0, add.length - 6 ) + "\r\n" + tab + add.slice( -6 );
			add = "\r\n\t\t" + tab;

		} else if ( add.match( /select /i ) != null ) {

			startNo = i - 6;
			parenthesis = 0;
			onCount = 0;
			tab = tab.concat( "\t\t" );
			convertSql += add.substring( 0, add.length - 7 ) + "\r\n" + tab;
			add = "";

			convertSql += convertSelect();

			startNo = endNo + 1;
			parenthesis = 0;
			onCount = 0;
			add = "";

			i = endNo;
			parenthesis = 0;
			tab = tab.replace( "\t\t", "" );

		} else if ( add.match( / between /i ) != null ) {

			betweenFlg = true;
		}
	}

	convertSql += add;
	add = "";

	return convertSql;
}

// キーワードの大文字置換
function convUpperCaseKeyword(targetSql) {

	var keywordAry = keyword;
	var newSql = targetSql;
	var keywordCnt = keywordAry.length;
	for(var i = 0; i < keywordCnt; i++) {

		key = keywordAry[i];

		regKey = "\\b" + keywordAry[i] + "\\b";

		regExp = new RegExp(regKey, "igm");
		newSql = newSql.replace(regExp, key);

	}
	return newSql;
}

// キーワードの大文字置換とリッチテキストビューのHTML生成
function convUpperCaseKeywordAndRichText(targetSql) {
	
	var css = "<style type=\"text/css\">"
			+ "div#outRichText hr { border: 0; border-bottom: solid 1px #999; margin: 0; padding: 0; }"
			+ "div#outRichText ol { list-style-type: decimal-leading-zero; margin: 0 0 0 5.0em; padding: 0; border-left: 3px solid #9BFCA0; }"
			+ "div#outRichText ol li { padding: 1px 1px 1px 5px; }"
			+ "div#outRichText ol li.odd { background-color: #FFF; }"
			+ "div#outRichText ol li.even { background-color: #EEE; }"
			+ "div#outRichText ol li span.highlight { color:#003D84; font-weight:bold; }"
			+ "div#outRichText ol li span.string { color:#ED007F; font-weight:bold; }"
			+ "div#outRichText ol li span.oracle { color:#00582A; font-weight:bold; }"
			+ "</style>";
	
	var sqlAry = targetSql.split(";");
	var richText = "";
	
	for (var i = 0; i < sqlAry.length; i++) {
		if (sqlAry[i].trim() != "") {
			var sql = sqlAry[i].trim() + ";";
			var line = sql.split("\n");
			var work = "";
			var className;
			if (line) {
				for (var j = 0; j < line.length; j++) {
					if (line[j].trim() != "") {
						className = (j%2) ? "even" : "odd";
						line[j] = line[j].replace(/\s\s/g, "&nbsp;&nbsp;");
						work += "<li class=\"" + className + "\">" + line[j] + "</li>";
					}
				}
			}
			richText += "<ol>" + work + "</ol><hr />";
		}
	}
	
	var keywordAry = keyword;
	for(var i = 0; i < keywordAry.length; i++) {
		key = keywordAry[i];
		regExp = new RegExp("\\b" + key + "\\b", "igm");
		richText = richText.replace(regExp, "<span class=\"highlight\">" +  key + "</span>");
	}
	
	var oracleAry = oracle;
	for(var i = 0; i < oracleAry.length; i++) {
		key = oracleAry[i];
		regExp = new RegExp("\\b" + key + "\\b", "igm");
		richText = richText.replace(regExp, "<span class=\"oracle\">" +  key + "</span>");
	}

	richText = richText.replace(/('.*?')/g, "<span class=\"string\">$1</span>");
	
	return  richText + css;
}

function validate(value) {
	result = false;
	
	if (
		(value.match( /^\s*select/i ) != null ) ||
		(value.match( /^\s*insert/i ) != null ) ||
		(value.match( /^\s*update/i ) != null ) ||
		(value.match( /^\s*delete/i ) != null )) {
		result = true;
	}
	
	return result;
}

