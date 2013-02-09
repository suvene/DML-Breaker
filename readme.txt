[作品名]
　DML Breaker
　(Data Manipulation Language Breaker)

[ライセンス]
　GNU General Public License v3(GPLv3)

[バージョン]
　2.02

[派生元著作権]
　株式会社コスモス


[動作確認済み環境]
　Max OS X(10.6.8)

[OS、配布ファイル以外に必要なソフト]
　Webブラウザ(以下のブラウザで動作確認済)
　　・Internet Exproler 6/7/8
　　・Firefox 3.5
　　・Google Chrome 4
　　・Safari 4
　　・Opera 10

[DML Breaker uses the following libraries]
　Ext JS Library 3.0.3 licensed under GPLv3 License
　licensing@extjs.com
　http://www.extjs.com/license
 
[作品紹介]
　SQL文のうち、DML(SELECT/INSERT/UPDATE/DELETE)を解析し、
　人が見やすいDMLに変換するツールです。設計書等に転記する場合にご利用ください。
　なお、DMLの構文解析機能は実装されておりませんのでご了承ください。

[導入手順]
　① インストールは、ダウンロードファイル(DMLBreakerX.X.zip)を任意のディレクトリに解凍することで終了します。

[基本使用手順]
　① DMLBreaker.html をダブルクリックします。
　② 上段側のテキスト入力エリアにDMLを入力します。
　③ 画面中央の「変換」ボタンを押下します。
　④ 下段側のテキスト入力エリアに、変換後のDMLが出力されます。
　⑤ 変換後のDMLを選択し、他の設計書等のドキュメントに「貼り付け」を行います。

[主な特徴]
　- DML(SELECT/INSERT/UPDATE/DELETE)をサポートします。
　- ３７種類のSQLキーワードの大文字変換をサポートします。
　- ローカル環境で動作が完結します。
　- クリップボードを経由した、DMLテキストの入出力に対応します(IE限定機能)
　- セミコロン「;」で、複数のDMLを区切ることにより、一括して変換することができます。
　- 実装はJavaScript+HTMLで行っています。

[DML変換エンジンの仕様]
  - SQL構文はOracle社のDatabaseに対応するDMLを基本とします。
　- 字下げ（インデント）は、4文字の半角スペースで行います。
　- 関数は大文字変換しません。
　- 列を列挙する際に利用するカンマ(,)は、行の後方に出力します。
　　サブクエリも対応します。
　- WHERE句の左条件カラムにインデントを揃えます。
　- 整形仕様は次の通りです。
　　<SELECT>
        SELECT構文：(副問い合わせ)
　　　　　改行キーワード：SELECT, FROM句, WHERE句, GROUP BY句, ORDER BY句, HAVING句, UNION ALL

　　　　　(変換前)
　　　　　　SELECT CustomerID, CompanyName FROM Customers WHERE CustomerID = '00001' AND CustomerName LIKE '山田%' 

　　　　　(変換後)
        　　SELECT
        　　    CustomerID,
        　　    CompanyName
        　　FROM
        　　    Customers
        　　WHERE
        　　        CustomerID = '00001'
        　　    AND CustomerName LIKE '山田%'

    <INSERT>
        INSERT構文１：
　　　　　(変換前)
            INSERT INTO Customers (CustomerID, CompanyName) VALUES ('10001' , 'COSMOS')

　　　　　(変換後)
        　　INSERT INTO Customers (
        　　    CustomerID,
        　　    CompanyName
        　　)
        　　VALUES (
         　　   '10001' ,
        　　    'COSMOS'
        　　)


        INSERT構文２：
　　　　　(変換前)
            INSERT INTO OrgCustomers SELECT CustomerID, CompanyName FROM Customers WHERE CustomerID = '00001'

　　　　　(変換後)
        　　INSERT INTO OrgCustomers
        　　SELECT
         　　   CustomerID,
         　　   CompanyName
        　　FROM
        　　   Customers
        　　WHERE
        　　        CustomerID = '00001'

    <UPDATE>
        UPDATE構文１：
　　　　　(変換前)
            UPDATE Customers SET CompanyName = 'COSMOS', RepName = '松本' WHERE CustomerID = '101000'

　　　　　(変換後)
            UPDATE Customers SET
                CompanyName = 'COSMOS',
                RepName = '松本'
            WHERE
                    CustomerID = '101000'


        UPDATE構文２：
　　　　　(変換前)
            UPDATE Customers SET CompanyName = (SELECT CompanyName FROM OrgCustomers WHERE CustomerID = '101000')

　　　　　(変換後)
            UPDATE Customers SET
                CompanyName = (
                    SELECT
                        CompanyName
                    FROM
                        OrgCustomers
                    WHERE
                            CustomerID = '101000'
                )


        UPDATE構文３：
　　　　　(変換前)
            UPDATE Customers SET (CustomerID, CompanyName) = (SELECT CustomerID , CompanyName FROM OrgCustomers WHERE CustomerID = '101000'

　　　　　(変換後)
            UPDATE Customers SET
                (CustomerID, CompanyName) = (
                    SELECT
                        CustomerID ,
                        CompanyName
                    FROM
                        OrgCustomers
                    WHERE
                            CustomerID = '101000'


    <DELETE>
        DELETE構文１：
　　　　　(変換前)
            DELETE FROM Customers WHERE CustomerID = '101000'

　　　　　(変換後)
            DELETE FROM Customers
            WHERE
                    CustomerID = '101000'

        DELETE構文２：
　　　　　(変換前)
            DELETE FROM Customers WHERE CompanyName = (SELECT CompanyName FROM OrgCustomers WHERE CustomerID = '101000')

　　　　　(変換後)
            DELETE FROM Customers
            WHERE
                    CompanyName = (
                    SELECT
                        CompanyName
                    FROM
                        OrgCustomers
                    WHERE
                            CustomerID = '101000'
                )



　- 大文字変換キーワード37種は以下の通りです。
    ALL,AND,ANY,AS,ASC,BETWEEN,CROSS,DELETE,DESC,DISTINCT,EXISTS,FROM,FULL,GROUP BY,HAVING,IN,INNER
    INSERT INTO,IS,JOIN,LEFT,LIKE,NOT,ON,OR,ORDER BY,OUTER,RIGHT,SELECT,SET,SOME,UNION,UNION ALL
    UPDATE,USING,VALUES,WHERE

[改訂履歴]
2013.02.10 v2.02 bugfix
2009.12.28 v2.01 一括整形機能によるRich Textの表示改善など
2009.12.20 v2.00 バージョン２公開
2009.11.24 v1.01 IE以外のブラウザで余分な行が出力される問題に対応
2009.10.31 v1.00 バージョン１公開
2009.08.15 v0.10 初期バージョン公開
