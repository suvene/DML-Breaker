[��i��]
�@DML Breaker
�@(Data Manipulation Language Breaker)

[���C�Z���X]
�@GNU General Public License v3(GPLv3)

[�o�[�W����]
�@2.02

[�h�������쌠]
�@������ЃR�X���X


[����m�F�ς݊�]
�@Max OS X(10.6.8)

[OS�A�z�z�t�@�C���ȊO�ɕK�v�ȃ\�t�g]
�@Web�u���E�U(�ȉ��̃u���E�U�œ���m�F��)
�@�@�EInternet Exproler 6/7/8
�@�@�EFirefox 3.5
�@�@�EGoogle Chrome 4
�@�@�ESafari 4
�@�@�EOpera 10

[DML Breaker uses the following libraries]
�@Ext JS Library 3.0.3 licensed under GPLv3 License
�@licensing@extjs.com
�@http://www.extjs.com/license
 
[��i�Љ�]
�@SQL���̂����ADML(SELECT/INSERT/UPDATE/DELETE)����͂��A
�@�l�����₷��DML�ɕϊ�����c�[���ł��B�݌v�����ɓ]�L����ꍇ�ɂ����p���������B
�@�Ȃ��ADML�̍\����͋@�\�͎�������Ă���܂���̂ł��������������B

[�����菇]
�@�@ �C���X�g�[���́A�_�E�����[�h�t�@�C��(DMLBreakerX.X.zip)��C�ӂ̃f�B���N�g���ɉ𓀂��邱�ƂŏI�����܂��B

[��{�g�p�菇]
�@�@ DMLBreaker.html ���_�u���N���b�N���܂��B
�@�A ��i���̃e�L�X�g���̓G���A��DML����͂��܂��B
�@�B ��ʒ����́u�ϊ��v�{�^�����������܂��B
�@�C ���i���̃e�L�X�g���̓G���A�ɁA�ϊ����DML���o�͂���܂��B
�@�D �ϊ����DML��I�����A���̐݌v�����̃h�L�������g�Ɂu�\��t���v���s���܂��B

[��ȓ���]
�@- DML(SELECT/INSERT/UPDATE/DELETE)���T�|�[�g���܂��B
�@- �R�V��ނ�SQL�L�[���[�h�̑啶���ϊ����T�|�[�g���܂��B
�@- ���[�J�����œ��삪�������܂��B
�@- �N���b�v�{�[�h���o�R�����ADML�e�L�X�g�̓��o�͂ɑΉ����܂�(IE����@�\)
�@- �Z�~�R�����u;�v�ŁA������DML����؂邱�Ƃɂ��A�ꊇ���ĕϊ����邱�Ƃ��ł��܂��B
�@- ������JavaScript+HTML�ōs���Ă��܂��B

[DML�ϊ��G���W���̎d�l]
  - SQL�\����Oracle�Ђ�Database�ɑΉ�����DML����{�Ƃ��܂��B
�@- �������i�C���f���g�j�́A4�����̔��p�X�y�[�X�ōs���܂��B
�@- �֐��͑啶���ϊ����܂���B
�@- ���񋓂���ۂɗ��p����J���}(,)�́A�s�̌���ɏo�͂��܂��B
�@�@�T�u�N�G�����Ή����܂��B
�@- WHERE��̍������J�����ɃC���f���g�𑵂��܂��B
�@- ���`�d�l�͎��̒ʂ�ł��B
�@�@<SELECT>
        SELECT�\���F(���₢���킹)
�@�@�@�@�@���s�L�[���[�h�FSELECT, FROM��, WHERE��, GROUP BY��, ORDER BY��, HAVING��, UNION ALL

�@�@�@�@�@(�ϊ��O)
�@�@�@�@�@�@SELECT CustomerID, CompanyName FROM Customers WHERE CustomerID = '00001' AND CustomerName LIKE '�R�c%' 

�@�@�@�@�@(�ϊ���)
        �@�@SELECT
        �@�@    CustomerID,
        �@�@    CompanyName
        �@�@FROM
        �@�@    Customers
        �@�@WHERE
        �@�@        CustomerID = '00001'
        �@�@    AND CustomerName LIKE '�R�c%'

    <INSERT>
        INSERT�\���P�F
�@�@�@�@�@(�ϊ��O)
            INSERT INTO Customers (CustomerID, CompanyName) VALUES ('10001' , 'COSMOS')

�@�@�@�@�@(�ϊ���)
        �@�@INSERT INTO Customers (
        �@�@    CustomerID,
        �@�@    CompanyName
        �@�@)
        �@�@VALUES (
         �@�@   '10001' ,
        �@�@    'COSMOS'
        �@�@)


        INSERT�\���Q�F
�@�@�@�@�@(�ϊ��O)
            INSERT INTO OrgCustomers SELECT CustomerID, CompanyName FROM Customers WHERE CustomerID = '00001'

�@�@�@�@�@(�ϊ���)
        �@�@INSERT INTO OrgCustomers
        �@�@SELECT
         �@�@   CustomerID,
         �@�@   CompanyName
        �@�@FROM
        �@�@   Customers
        �@�@WHERE
        �@�@        CustomerID = '00001'

    <UPDATE>
        UPDATE�\���P�F
�@�@�@�@�@(�ϊ��O)
            UPDATE Customers SET CompanyName = 'COSMOS', RepName = '���{' WHERE CustomerID = '101000'

�@�@�@�@�@(�ϊ���)
            UPDATE Customers SET
                CompanyName = 'COSMOS',
                RepName = '���{'
            WHERE
                    CustomerID = '101000'


        UPDATE�\���Q�F
�@�@�@�@�@(�ϊ��O)
            UPDATE Customers SET CompanyName = (SELECT CompanyName FROM OrgCustomers WHERE CustomerID = '101000')

�@�@�@�@�@(�ϊ���)
            UPDATE Customers SET
                CompanyName = (
                    SELECT
                        CompanyName
                    FROM
                        OrgCustomers
                    WHERE
                            CustomerID = '101000'
                )


        UPDATE�\���R�F
�@�@�@�@�@(�ϊ��O)
            UPDATE Customers SET (CustomerID, CompanyName) = (SELECT CustomerID , CompanyName FROM OrgCustomers WHERE CustomerID = '101000'

�@�@�@�@�@(�ϊ���)
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
        DELETE�\���P�F
�@�@�@�@�@(�ϊ��O)
            DELETE FROM Customers WHERE CustomerID = '101000'

�@�@�@�@�@(�ϊ���)
            DELETE FROM Customers
            WHERE
                    CustomerID = '101000'

        DELETE�\���Q�F
�@�@�@�@�@(�ϊ��O)
            DELETE FROM Customers WHERE CompanyName = (SELECT CompanyName FROM OrgCustomers WHERE CustomerID = '101000')

�@�@�@�@�@(�ϊ���)
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



�@- �啶���ϊ��L�[���[�h37��͈ȉ��̒ʂ�ł��B
    ALL,AND,ANY,AS,ASC,BETWEEN,CROSS,DELETE,DESC,DISTINCT,EXISTS,FROM,FULL,GROUP BY,HAVING,IN,INNER
    INSERT INTO,IS,JOIN,LEFT,LIKE,NOT,ON,OR,ORDER BY,OUTER,RIGHT,SELECT,SET,SOME,UNION,UNION ALL
    UPDATE,USING,VALUES,WHERE

[��������]
2013.02.10 v2.02 bugfix
2009.12.28 v2.01 �ꊇ���`�@�\�ɂ��Rich Text�̕\�����P�Ȃ�
2009.12.20 v2.00 �o�[�W�����Q���J
2009.11.24 v1.01 IE�ȊO�̃u���E�U�ŗ]���ȍs���o�͂������ɑΉ�
2009.10.31 v1.00 �o�[�W�����P���J
2009.08.15 v0.10 �����o�[�W�������J
